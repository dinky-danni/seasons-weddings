import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../public/", import.meta.url));
const htmlFiles = [];
const errors = [];

const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (extname(entry) === ".html") {
      htmlFiles.push(fullPath);
    }
  }
};

const normalisePublicPath = (href, fromFile) => {
  if (!href || href.startsWith("#")) return null;
  if (/^(https?:|mailto:|tel:|sms:)/i.test(href)) return null;

  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean.startsWith("javascript:")) return null;

  if (clean.startsWith("/")) {
    return clean;
  }

  const fromDir = posix.dirname(`/${relative(root, fromFile).replaceAll("\\", "/")}`);
  return posix.normalize(posix.join(fromDir, clean));
};

const targetExists = (publicPath) => {
  if (publicPath === "/") return existsSync(join(root, "index.html"));

  const withoutSlash = publicPath.replace(/^\/+/, "");
  const direct = join(root, withoutSlash);

  if (existsSync(direct)) return true;
  if (publicPath.endsWith("/")) return existsSync(join(root, withoutSlash, "index.html"));

  return existsSync(join(root, withoutSlash, "index.html"));
};

walk(root);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = relative(root, file);

  for (const match of html.matchAll(/\b(?:href|src|action)=["']([^"']+)["']/g)) {
    const publicPath = normalisePublicPath(match[1], file);
    if (publicPath && !targetExists(publicPath) && !publicPath.startsWith("/api/")) {
      errors.push(`${rel}: missing ${match[1]}`);
    }
  }

  if (!/<title>[^<]+<\/title>/.test(html)) {
    errors.push(`${rel}: missing title`);
  }

  if (!/<meta name="description" content="[^"]+"/.test(html) && !rel.includes("responsive-preview")) {
    errors.push(`${rel}: missing meta description`);
  }
}

for (const required of ["_headers", "_redirects", "robots.txt", "sitemap.xml", "404.html"]) {
  if (!existsSync(join(root, required))) {
    errors.push(`missing public/${required}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files. No missing internal links or assets found.`);
