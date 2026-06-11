const siteHeaderTemplate = `
  <header class="site-header">
    <div class="header-inner">
      <a class="brand mobile-brand" href="/"><img src="/assets/img/logo.webp" alt="Seasons Weddings"></a>
      <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="primary-nav">Menu</button>
      <div class="desktop-header-nav" data-primary-nav aria-label="Primary navigation">
        <nav class="primary-nav primary-nav-left" aria-label="Primary navigation left">
          <a href="/">Home</a>
          <a href="/catering-only/">Catering</a>
          <a href="/full-wedding-package/">Wedding Packages</a>
          <a href="/venue/">Venue</a>
          <a href="/menus/">Menus</a>
        </nav>
        <a class="brand desktop-brand" href="/"><img src="/assets/img/logo.webp" alt="Seasons Weddings"></a>
        <div class="header-actions">
          <nav class="primary-nav primary-nav-right" aria-label="Primary navigation right">
          <a href="/tastings/">Tastings</a>
          <a href="/planning-support/">Planning</a>
          <a href="/gallery/">Gallery</a>
          <a href="/contact/">Contact</a>
          <a class="nav-brochure" href="/assets/docs/season-quayside-weddings-brochure.pdf" download>Download brochure</a>
          </nav>
        </div>
      </div>
      <nav class="primary-nav mobile-primary-nav" id="primary-nav" data-primary-nav aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/catering-only/">Catering</a>
        <a href="/full-wedding-package/">Wedding Packages</a>
        <a href="/venue/">Venue</a>
        <a href="/menus/">Menus</a>
        <a href="/tastings/">Tastings</a>
        <a href="/planning-support/">Planning</a>
        <a href="/gallery/">Gallery</a>
        <a href="/contact/">Contact</a>
        <a class="nav-brochure" href="/assets/docs/season-quayside-weddings-brochure.pdf" download>Download brochure</a>
      </nav>
    </div>
  </header>
`;

const saveDateTemplate = `
  <section class="wire-section save-date-band" aria-labelledby="save-date-title">
    <div class="section-inner save-date-grid">
      <div class="stack">
        <p class="save-date-kicker">Limited dates available</p>
        <h2 id="save-date-title">Save the <em>date</em></h2>
        <p class="lede">Flexible options for every wedding. Share your ideal date and the team can check availability before you start planning the details.</p>
      </div>
      <form class="form-shell save-date-form" action="/contact/" method="get">
        <div class="compact-form-grid">
          <div class="field"><label for="save-name">Name</label><input id="save-name" name="name" autocomplete="name"></div>
          <div class="field"><label for="save-phone">Phone</label><input id="save-phone" name="phone" autocomplete="tel"></div>
          <div class="field"><label for="save-date">Wedding date</label><input id="save-date" name="date" type="date"></div>
          <div class="field"><button class="button" type="submit">Check my date</button></div>
        </div>
        <p class="form-note">No pressure, just a quick date check with the Seasons team.</p>
      </form>
    </div>
  </section>
`;

const bookingFormTemplate = `
  <section class="wire-section booking-form-section" aria-labelledby="booking-form-title">
    <div class="section-inner booking-form-layout">
      <div class="stack">
        <p class="eyebrow">Wedding enquiry</p>
        <h2 id="booking-form-title">Tell us about your wedding.</h2>
        <p class="lede">Share the essentials first, then add any extra details you already know. The team can guide you towards the right next step.</p>
      </div>
      <form class="form-shell" action="#" method="post">
        <div class="form-grid">
          <div class="field"><label for="booking-type">Type of enquiry <span>Essential</span></label><select id="booking-type" name="enquiry-type"><option value="">Select an option</option><option>Catering</option><option>Wedding Packages</option><option>Venue viewing</option><option>Tasting</option><option>Menus</option><option>Not sure yet</option></select></div>
          <div class="field"><label for="booking-date">Wedding date <span>If known</span></label><input id="booking-date" name="wedding-date" type="date"></div>
          <div class="field"><label for="booking-name">Name <span>Essential</span></label><input id="booking-name" name="name" autocomplete="name"></div>
          <div class="field"><label for="booking-email">Email <span>Essential</span></label><input id="booking-email" name="email" type="email" autocomplete="email"></div>
          <div class="field"><label for="booking-phone">Phone <span>Essential</span></label><input id="booking-phone" name="phone" autocomplete="tel"></div>
          <div class="field"><label for="booking-venue-status">Venue status <span>Optional</span></label><select id="booking-venue-status" name="venue-status"><option value="">Select an option</option><option>Venue booked</option><option>Still looking</option><option>Interested in Season Quayside</option></select></div>
          <div class="field"><label for="booking-venue">Venue / location <span>Optional</span></label><input id="booking-venue" name="venue-location"></div>
          <div class="field"><label for="booking-guests">Guest numbers <span>Optional</span></label><input id="booking-guests" name="guest-numbers" placeholder="Day and evening guests"></div>
          <div class="field"><label for="booking-menu">Menu interest <span>Optional</span></label><input id="booking-menu" name="menu-interest" placeholder="Plated, sharing, grazing, street food..."></div>
          <div class="field"><label for="booking-tasting">Tasting interest <span>Optional</span></label><select id="booking-tasting" name="tasting-interest"><option value="">Select an option</option><option>Yes</option><option>No</option><option>Tell me more</option></select></div>
          <div class="field full"><label for="booking-message">Tell us about your day <span>Optional</span></label><textarea id="booking-message" name="message"></textarea></div>
          <div class="field full"><button class="button" type="submit">Send wedding enquiry</button></div>
        </div>
      </form>
    </div>
  </section>
`;

const photoStripTemplate = `
  <section class="gallery-section compact-gallery" aria-label="Wedding photography">
    <div class="gallery-grid">
      <div class="gallery-item tall">
        <img src="/assets/img/optimized/wedding-confetti.webp" alt="Wedding at Season Quayside" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="/assets/img/optimized/venue-table-setting.webp" alt="Wedding reception table details" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="/assets/img/optimized/food-grazing-table.webp" alt="Wedding food by Seasons" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="/assets/img/optimized/venue-dining-room.webp" alt="Season Quayside wedding venue" loading="lazy">
      </div>
      <div class="gallery-item tall">
        <img src="/assets/img/optimized/wedding-quayside-couple.webp" alt="Bride at Leith wedding venue" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="/assets/img/optimized/food-dessert-pour.webp" alt="Wedding dessert by Seasons" loading="lazy">
      </div>
    </div>
  </section>
`;

const foodStripTemplate = `
  <section class="gallery-section compact-gallery" aria-label="Wedding catering photography">
    <div class="gallery-grid">
      <div class="gallery-item tall">
        <img src="/assets/img/optimized/food-plated-dish.webp" alt="Plated wedding food" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="/assets/img/optimized/food-dessert-pour.webp" alt="Wedding dessert" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="/assets/img/optimized/food-grazing-table.webp" alt="Wedding grazing food by Seasons" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="/assets/img/optimized/food-table-service.webp" alt="Wedding table service" loading="lazy">
      </div>
      <div class="gallery-item tall">
        <img src="/assets/img/optimized/food-cocktail-dessert.webp" alt="Wedding drinks and dessert" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="/assets/img/optimized/food-sharing-plate.webp" alt="Sharing plate for wedding catering" loading="lazy">
      </div>
    </div>
  </section>
`;

const createTickerTemplate = (items) => `
  <div class="ticker" aria-hidden="true">
    <div class="ticker-inner">
      ${[...items, ...items].map((item) => `<span class="ticker-item"><span class="ticker-dot"></span>${item}</span>`).join("")}
    </div>
  </div>
`;

const venueTickerTemplate = createTickerTemplate([
  "Private Wedding Venue",
  "Glass Conservatory Ceremonies",
  "Dining for 100",
  "Leith, Edinburgh",
  "Fully Licensed Bar",
  "Exclusive Hire",
  "Food & Drinks Together",
  "A Day That Feels Yours"
]);

const menuTickerTemplate = createTickerTemplate([
  "Seasonal Menus",
  "Beautifully Plated",
  "Sharing Feasts",
  "Canapes & Fizz",
  "Relaxed Evening Food",
  "Food Your Guests Remember",
  "Menus Made for Your Day",
  "Thoughtful Wedding Dining"
]);

const packageTickerTemplate = createTickerTemplate([
  "Venue & Catering Together",
  "Exclusive Hire",
  "Ceremonies up to 50 Guests",
  "Dining for 100",
  "Fully Licensed Bar",
  "Seasonal Wedding Menus",
  "Private Viewings",
  "Planning Support"
]);

const siteFooterTemplate = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <section class="footer-column">
          <div class="footer-brand-lockup">
            <img class="footer-logo-img" src="/assets/img/logo-white.webp" alt="Seasons Weddings">
            <div class="footer-brand-copy">
              <p>Wedding catering across Scotland and venue packages at Season Quayside in Leith, Edinburgh.</p>
              <p><a class="footer-cta" href="/contact/">Check your date</a></p>
            </div>
          </div>
        </section>
        <section class="footer-column">
          <h3>Wedding Services</h3>
          <ul class="footer-links">
            <li><a href="/catering-only/">Catering</a></li>
            <li><a href="/full-wedding-package/">Wedding Packages</a></li>
            <li><a href="/packages/">Packages & Pricing</a></li>
            <li><a href="/venues/">Venues</a></li>
          </ul>
        </section>
        <section class="footer-column">
          <h3>Planning</h3>
          <ul class="footer-links">
            <li><a href="/menus/">Menus</a></li>
            <li><a href="/tastings/">Tastings</a></li>
            <li><a href="/planning-support/">Planning Support</a></li>
            <li><a href="/gallery/">Gallery</a></li>
          </ul>
        </section>
        <section class="footer-column">
          <h3>Contact</h3>
          <p>72 Commercial St, Leith, Edinburgh EH6 6LX</p>
          <p><a href="tel:+441316037990">01316 037 990</a></p>
          <p><a href="mailto:info@seasonquayside.co.uk">info@seasonquayside.co.uk</a></p>
        </section>
      </div>
      <div class="footer-bottom">
        <p class="footer-small">© Seasons Weddings. Wedding catering and venue packages by Seasons.</p>
        <p class="footer-small"><a href="/privacy-policy/">Privacy Policy</a> · <a href="/cookie-policy/">Cookie Policy</a> · <a href="/terms-and-conditions/">Terms & Conditions</a></p>
      </div>
    </div>
  </footer>
`;

const renderSharedComponents = () => {
  document.querySelectorAll("[data-site-header]").forEach((node) => {
    node.outerHTML = siteHeaderTemplate;
  });

  document.querySelectorAll("[data-save-date-form]").forEach((node) => {
    node.outerHTML = saveDateTemplate;
  });

  document.querySelectorAll("[data-booking-form]").forEach((node) => {
    node.outerHTML = bookingFormTemplate;
  });

  document.querySelectorAll("[data-photo-strip]").forEach((node) => {
    node.outerHTML = photoStripTemplate;
  });

  document.querySelectorAll("[data-food-strip]").forEach((node) => {
    node.outerHTML = foodStripTemplate;
  });

  document.querySelectorAll("[data-venue-ticker]").forEach((node) => {
    node.outerHTML = venueTickerTemplate;
  });

  document.querySelectorAll("[data-menu-ticker]").forEach((node) => {
    node.outerHTML = menuTickerTemplate;
  });

  document.querySelectorAll("[data-package-ticker]").forEach((node) => {
    node.outerHTML = packageTickerTemplate;
  });

  document.querySelectorAll("[data-site-footer]").forEach((node) => {
    node.outerHTML = siteFooterTemplate;
  });
};

renderSharedComponents();
