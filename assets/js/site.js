const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-primary-nav]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");

document.querySelectorAll("[data-primary-nav] a").forEach((link) => {
  const linkPath = new URL(link.href).pathname;

  if (linkPath === currentPath) {
    link.setAttribute("aria-current", "page");
  }
});
