const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("#primary-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "Close" : "Menu";
  });
}

const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");

document.querySelectorAll("[data-primary-nav] a").forEach((link) => {
  if (link.classList.contains("brand") || link.classList.contains("nav-brochure")) return;

  const linkPath = new URL(link.href).pathname;

  if (linkPath === currentPath) {
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll("[data-review-carousel]").forEach((carousel) => {
  const track = carousel.querySelector("[data-review-track]");
  const dots = Array.from(carousel.querySelectorAll("[data-review-dot]"));

  if (!track || dots.length === 0) return;

  const setActiveDot = (index) => {
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
    carousel.classList.toggle("is-at-end", index === dots.length - 1);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const targetCard = track.children[index];
      const maxScroll = track.scrollWidth - track.clientWidth;
      const targetScroll = targetCard ? targetCard.offsetLeft - track.offsetLeft : 0;

      track.scrollTo({
        left: Math.min(targetScroll, maxScroll),
        behavior: "smooth"
      });
      setActiveDot(index);
    });
  });

  track.addEventListener("scroll", () => {
    const cards = Array.from(track.children);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const isAtEnd = track.scrollLeft >= maxScroll - 2;
    const index = isAtEnd ? cards.length - 1 : cards.reduce((closestIndex, card, cardIndex) => {
      const currentDistance = Math.abs((card.offsetLeft - track.offsetLeft) - track.scrollLeft);
      const closestDistance = Math.abs((cards[closestIndex].offsetLeft - track.offsetLeft) - track.scrollLeft);

      return currentDistance < closestDistance ? cardIndex : closestIndex;
    }, 0);

    setActiveDot(index);
  }, { passive: true });
});

const galleryItems = Array.from(document.querySelectorAll(".full-gallery-item"));

if (galleryItems.length > 0) {
  const lightbox = document.createElement("div");
  const lightboxImage = document.createElement("img");
  const closeButton = document.createElement("button");
  let activeTrigger = null;

  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Full size gallery image");

  closeButton.type = "button";
  closeButton.className = "button button-light gallery-lightbox-close";
  closeButton.textContent = "Close";

  lightbox.append(closeButton, lightboxImage);
  document.body.appendChild(lightbox);

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");

    if (activeTrigger) {
      activeTrigger.focus();
      activeTrigger = null;
    }
  };

  const openLightbox = (item) => {
    const image = item.querySelector("img");

    if (!image) return;

    activeTrigger = item;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "";
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  galleryItems.forEach((item) => {
    const image = item.querySelector("img");

    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", image?.alt ? `Open full size image: ${image.alt}` : "Open full size gallery image");

    item.addEventListener("click", () => openLightbox(item));
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      openLightbox(item);
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

const enquiryForms = Array.from(document.querySelectorAll("[data-enquiry-form]"));

if (enquiryForms.length > 0) {
  let formConfig = { turnstileSiteKey: "", formEnabled: true };
  let turnstileLoadPromise = null;

  const setFormStatus = (form, message, type = "neutral") => {
    const status = form.querySelector("[data-form-status]");
    if (!status) return;

    status.hidden = false;
    status.textContent = message;
    status.dataset.status = type;
  };

  const populateFormMeta = (form) => {
    const sourcePage = form.querySelector('[data-enquiry-meta="source_page"]');
    const pageTitle = form.querySelector('[data-enquiry-meta="page_title"]');
    const pagePath = form.querySelector('[data-enquiry-meta="page_path"]');
    const pageUrl = form.querySelector('[data-enquiry-meta="page_url"]');

    if (sourcePage && sourcePage.value === "shared") {
      sourcePage.value = document.body.className || currentPath || "site";
    }

    if (pageTitle) pageTitle.value = document.title;
    if (pagePath) pagePath.value = window.location.pathname;
    if (pageUrl) pageUrl.value = window.location.href;
  };

  const isUsableSiteKey = (siteKey) => siteKey && !siteKey.toLowerCase().startsWith("replace");

  const loadTurnstile = () => {
    if (window.turnstile) {
      return Promise.resolve(window.turnstile);
    }

    if (turnstileLoadPromise) {
      return turnstileLoadPromise;
    }

    turnstileLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return turnstileLoadPromise;
  };

  const renderTurnstileWidgets = async () => {
    if (!isUsableSiteKey(formConfig.turnstileSiteKey)) return;

    try {
      const turnstile = await loadTurnstile();

      document.querySelectorAll(".cf-turnstile").forEach((node) => {
        if (node.dataset.widgetId || !turnstile) return;

        node.dataset.widgetId = turnstile.render(node, {
          sitekey: formConfig.turnstileSiteKey
        });
      });
    } catch (error) {
      enquiryForms.forEach((form) => {
        setFormStatus(form, "The security check could not load. Please refresh the page before sending.", "error");
      });
    }
  };

  const initialiseForms = async () => {
    enquiryForms.forEach(populateFormMeta);

    try {
      const response = await fetch("/api/form-config", { headers: { "accept": "application/json" } });
      if (response.ok) {
        formConfig = await response.json();
      }
    } catch (error) {
      formConfig = { turnstileSiteKey: "", formEnabled: true };
    }

    await renderTurnstileWidgets();
  };

  enquiryForms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      populateFormMeta(form);

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton?.textContent;

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      setFormStatus(form, "Sending your enquiry...", "neutral");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form)
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.ok === false) {
          throw new Error(result.message || "The enquiry could not be sent.");
        }

        window.location.href = result.redirect || "/thank-you/";
      } catch (error) {
        setFormStatus(form, error.message || "The online form is not available just now. Please call or email Seasons directly.", "error");

        const turnstileNode = form.querySelector(".cf-turnstile");
        if (window.turnstile && turnstileNode?.dataset.widgetId) {
          window.turnstile.reset(turnstileNode.dataset.widgetId);
        }

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
  });

  initialiseForms();
}

const cookieConsent = (() => {
  const storageKey = "seasons_optional_cookies";
  let fallbackChoice = null;

  const getChoice = () => {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return fallbackChoice;
    }
  };

  const setChoice = (choice) => {
    fallbackChoice = choice;

    try {
      window.localStorage.setItem(storageKey, choice);
    } catch (error) {
      fallbackChoice = choice;
    }
  };

  const acceptedOptional = () => getChoice() === "accepted";

  const applyEmbeds = () => {
    document.querySelectorAll("[data-cookie-embed]").forEach((embed) => {
      const iframe = embed.querySelector("iframe[data-cookie-src]");
      const placeholder = embed.querySelector(".cookie-embed-placeholder");

      if (!iframe) return;

      if (acceptedOptional()) {
        iframe.src = iframe.dataset.cookieSrc;
        if (placeholder) placeholder.hidden = true;
      } else if (placeholder) {
        placeholder.hidden = false;
      }
    });
  };

  const createPanel = () => {
    const panel = document.createElement("section");
    panel.className = "cookie-panel";
    panel.setAttribute("aria-label", "Cookie settings");
    panel.hidden = true;
    panel.innerHTML = `
      <div class="cookie-panel-inner">
        <div class="stack">
          <p class="eyebrow">Cookie settings</p>
          <h2>Optional cookies</h2>
          <p>We use essential cookies to keep the website working. Optional cookies allow third-party embeds, such as Google Maps, to load.</p>
          <p><a href="/cookie-policy/">Cookie Policy</a> · <a href="/privacy-policy/">Privacy Policy</a></p>
        </div>
        <div class="cookie-actions">
          <button class="button" type="button" data-cookie-accept>Accept optional cookies</button>
          <button class="button secondary" type="button" data-cookie-reject>Reject optional cookies</button>
        </div>
      </div>
    `;

    const settings = document.createElement("button");
    settings.className = "cookie-settings-button";
    settings.type = "button";
    settings.textContent = "Cookie settings";
    settings.hidden = true;

    document.body.append(panel, settings);

    const showPanel = () => {
      panel.hidden = false;
      settings.hidden = true;
    };

    const hidePanel = () => {
      panel.hidden = true;
      settings.hidden = false;
    };

    panel.querySelector("[data-cookie-accept]").addEventListener("click", () => {
      setChoice("accepted");
      applyEmbeds();
      hidePanel();
    });

    panel.querySelector("[data-cookie-reject]").addEventListener("click", () => {
      setChoice("rejected");
      applyEmbeds();
      hidePanel();
    });

    settings.addEventListener("click", showPanel);
    document.querySelectorAll("[data-cookie-open]").forEach((button) => {
      button.addEventListener("click", showPanel);
    });

    if (getChoice()) {
      settings.hidden = false;
    } else {
      showPanel();
    }
  };

  createPanel();
  applyEmbeds();
})();
