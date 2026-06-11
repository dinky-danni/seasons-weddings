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
  if (link.classList.contains("brand") || link.classList.contains("header-brochure")) return;

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
