const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=UTF-8",
    "cache-control": "no-store",
    "x-robots-tag": "noindex"
  }
});

const escapeHtml = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const normaliseFieldName = (name) => name.replace(/-/g, "_");

const parseRequest = async (request) => {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const data = await request.json();
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [normaliseFieldName(key), value]));
  }

  const formData = await request.formData();
  return Object.fromEntries([...formData.entries()].map(([key, value]) => [normaliseFieldName(key), value]));
};

const requiredFieldsFor = (formType) => {
  if (formType === "date_check") {
    return ["name", "phone"];
  }

  return ["enquiry_type", "name", "email", "phone", "consent"];
};

const validateRequiredFields = (fields) => {
  const missing = requiredFieldsFor(fields.form_type).filter((name) => !String(fields[name] || "").trim());

  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fields.email))) {
    missing.push("valid_email");
  }

  return [...new Set(missing)];
};

const validateTurnstile = async ({ token, secret, request }) => {
  if (!secret || !token) {
    return false;
  }

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);

  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) {
    body.append("remoteip", ip);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return result.success === true;
};

const buildEmailHtml = (fields, siteName) => {
  const labels = {
    form_type: "Form type",
    enquiry_type: "Type of enquiry",
    name: "Name",
    email: "Email",
    phone: "Phone",
    wedding_date: "Wedding date",
    venue_status: "Venue status",
    venue_location: "Venue / location",
    guest_numbers: "Guest numbers",
    menu_interest: "Menu interest",
    tasting_interest: "Tasting interest",
    message: "Message",
    source_section: "Source section",
    page_title: "Page title",
    page_url: "Page URL"
  };

  const rows = Object.entries(labels)
    .filter(([key]) => fields[key])
    .map(([key, label]) => `<tr><th align="left" valign="top" style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(label)}</th><td valign="top" style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(fields[key])}</td></tr>`)
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#1c1814;line-height:1.5;">
      <h1 style="font-size:22px;">New enquiry from ${escapeHtml(siteName)}</h1>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:720px;">${rows}</table>
    </div>
  `;
};

const buildEmailText = (fields, siteName) => {
  const lines = [
    `New enquiry from ${siteName}`,
    "",
    `Form type: ${fields.form_type || ""}`,
    `Type of enquiry: ${fields.enquiry_type || ""}`,
    `Name: ${fields.name || ""}`,
    `Email: ${fields.email || ""}`,
    `Phone: ${fields.phone || ""}`,
    `Wedding date: ${fields.wedding_date || ""}`,
    `Venue status: ${fields.venue_status || ""}`,
    `Venue / location: ${fields.venue_location || ""}`,
    `Guest numbers: ${fields.guest_numbers || ""}`,
    `Menu interest: ${fields.menu_interest || ""}`,
    `Tasting interest: ${fields.tasting_interest || ""}`,
    `Message: ${fields.message || ""}`,
    "",
    `Source: ${fields.page_url || fields.page_path || ""}`
  ];

  return lines.join("\n");
};

export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
  }

  try {
    const fields = await parseRequest(request);

    if (String(fields.website || "").trim()) {
      return jsonResponse({ ok: true });
    }

    const missing = validateRequiredFields(fields);
    if (missing.length > 0) {
      return jsonResponse({ ok: false, message: "Please check the required fields and try again.", missing }, 400);
    }

    const hasTurnstile = await validateTurnstile({
      token: fields["cf_turnstile_response"],
      secret: env.TURNSTILE_SECRET_KEY,
      request
    });

    if (!hasTurnstile) {
      return jsonResponse({ ok: false, message: "The security check failed. Please refresh the page and try again." }, 400);
    }

    if (!env.BREVO_API_KEY || !env.BREVO_FROM_EMAIL) {
      return jsonResponse({ ok: false, message: "The enquiry form is not available yet. Please contact Seasons directly." }, 503);
    }

    const siteName = env.ENQUIRY_SITE_NAME || "Seasons Weddings";
    const notificationTo = env.ENQUIRY_NOTIFICATION_TO || "hub@encapsulate.group";
    const replyToMode = env.ENQUIRY_REPLY_TO_MODE || "submitter";
    const subjectName = fields.name ? ` from ${fields.name}` : "";
    const replyTo = replyToMode === "submitter" && fields.email
      ? { email: String(fields.email), name: String(fields.name || "") }
      : undefined;

    const payload = {
      sender: { email: env.BREVO_FROM_EMAIL, name: siteName },
      to: [{ email: notificationTo }],
      subject: `${siteName} enquiry${subjectName}`,
      htmlContent: buildEmailHtml(fields, siteName),
      textContent: buildEmailText(fields, siteName),
      ...(replyTo ? { replyTo } : {})
    };

    const brevoResponse = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!brevoResponse.ok) {
      return jsonResponse({ ok: false, message: "We could not send the enquiry just now. Please try again or contact Seasons directly." }, 502);
    }

    return jsonResponse({ ok: true, redirect: "/thank-you/" });
  } catch (error) {
    return jsonResponse({ ok: false, message: "Something went wrong. Please try again or contact Seasons directly." }, 500);
  }
}
