const siteHeaderTemplate = `
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/"><img src="/assets/img/logo.webp" alt="Seasons Weddings"><span>Catering & venue packages</span></a>
      <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="primary-nav">Menu</button>
      <nav class="primary-nav" id="primary-nav" data-primary-nav aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/catering-only/">Catering</a>
        <a href="/full-wedding-package/">Wedding Packages</a>
        <a href="/menus/">Menus</a>
        <a href="/tastings/">Tastings</a>
        <a href="/planning-support/">Planning</a>
        <a href="/gallery/">Gallery</a>
        <a href="/contact/">Contact</a>
      </nav>
    </div>
  </header>
`;

const saveDateTemplate = `
  <section class="wire-section save-date-band" aria-labelledby="save-date-title">
    <div class="section-inner save-date-grid">
      <div class="stack">
        <h2 id="save-date-title">Save the date</h2>
        <p class="lede">Flexible options for every wedding.</p>
      </div>
      <form class="form-shell save-date-form" action="/contact/" method="get">
        <div class="compact-form-grid">
          <div class="field"><label for="save-name">Name</label><input id="save-name" name="name" autocomplete="name"></div>
          <div class="field"><label for="save-phone">Phone</label><input id="save-phone" name="phone" autocomplete="tel"></div>
          <div class="field"><label for="save-date">Wedding date</label><input id="save-date" name="date" type="date"></div>
          <div class="field"><button class="button" type="submit">Check my date</button></div>
        </div>
      </form>
    </div>
  </section>
`;

const bookingFormTemplate = `
  <section class="wire-section booking-form-section" aria-labelledby="booking-form-title">
    <div class="section-inner booking-form-layout">
      <div class="stack">
        <p class="eyebrow">Wedding enquiry</p>
        <h2 id="booking-form-title">Tell us what you are planning.</h2>
        <p class="lede">Share the date, the venue, the guest numbers and the kind of celebration you are dreaming about. The team can then guide you towards the right next step.</p>
      </div>
      <form class="form-shell" action="#" method="post">
        <div class="form-grid">
          <div class="field"><label for="booking-type">Type of enquiry</label><select id="booking-type" name="enquiry-type"><option value="">Select an option</option><option>Catering</option><option>Wedding Packages</option><option>Venue viewing</option><option>Tasting</option><option>Menus</option><option>Not sure yet</option></select></div>
          <div class="field"><label for="booking-date">Wedding date</label><input id="booking-date" name="wedding-date" type="date"></div>
          <div class="field"><label for="booking-name">Name</label><input id="booking-name" name="name" autocomplete="name"></div>
          <div class="field"><label for="booking-email">Email</label><input id="booking-email" name="email" type="email" autocomplete="email"></div>
          <div class="field"><label for="booking-phone">Phone</label><input id="booking-phone" name="phone" autocomplete="tel"></div>
          <div class="field"><label for="booking-venue-status">Venue status</label><select id="booking-venue-status" name="venue-status"><option value="">Select an option</option><option>Venue booked</option><option>Still looking</option><option>Interested in Season Quayside</option></select></div>
          <div class="field"><label for="booking-venue">Venue / location</label><input id="booking-venue" name="venue-location"></div>
          <div class="field"><label for="booking-guests">Guest numbers</label><input id="booking-guests" name="guest-numbers" placeholder="Day and evening guests"></div>
          <div class="field"><label for="booking-menu">Menu interest</label><input id="booking-menu" name="menu-interest" placeholder="Plated, sharing, grazing, street food..."></div>
          <div class="field"><label for="booking-tasting">Tasting interest</label><select id="booking-tasting" name="tasting-interest"><option value="">Select an option</option><option>Yes</option><option>No</option><option>Tell me more</option></select></div>
          <div class="field full"><label for="booking-message">Tell us about your day</label><textarea id="booking-message" name="message"></textarea></div>
          <div class="field full"><button class="button" type="submit">Send wedding enquiry</button></div>
        </div>
      </form>
    </div>
  </section>
`;

const siteFooterTemplate = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <section class="footer-column">
          <img class="footer-logo-img" src="/assets/img/logo-white.webp" alt="Seasons Weddings">
          <p>Wedding catering across Scotland and venue packages at Season Quayside in Leith, Edinburgh.</p>
          <p><a href="/contact/">Check your date</a></p>
        </section>
        <section class="footer-column">
          <h3>Wedding Routes</h3>
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

  document.querySelectorAll("[data-site-footer]").forEach((node) => {
    node.outerHTML = siteFooterTemplate;
  });
};

renderSharedComponents();
