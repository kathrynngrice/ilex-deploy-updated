// Shared site chrome: nav and footer.
// Renders into [data-nav] and [data-footer] mount points.

(function () {
  const NAV_ITEMS = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'services.html', label: 'Services' },
    { href: 'testimonials.html', label: 'Testimonials' },
  ];

  function currentPage() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return path;
  }

  function renderNav() {
    const mount = document.querySelector('[data-nav]');
    if (!mount) return;
    const here = currentPage();
    mount.innerHTML = `
      <nav class="site-nav">
        <div class="inner">
          <a class="brand" href="index.html"><img src="assets/logo/ilex-garden-wordmark.svg" alt="Ilex Garden"></a>
          <ul>
            ${NAV_ITEMS.map(i => `<li><a href="${i.href}" class="${i.href === here ? 'active' : ''}">${i.label}</a></li>`).join('')}
            <li><a href="services.html#book" class="btn btn-primary" style="padding:8px 16px;">Begin a session →</a></li>
          </ul>
        </div>
      </nav>
    `;
  }

  function renderFooter() {
    const mount = document.querySelector('[data-footer]');
    if (!mount) return;
    mount.innerHTML = `
      <footer class="site-footer">
        <div class="inner">
          <div>
            <img src="assets/logo/ilex-garden-wordmark.svg" alt="Ilex Garden" style="height: 32px; margin-bottom: var(--space-4);">
            <p class="small" style="max-width: 36ch; color: var(--fg-3);">Leadership development guided by curiosity, courage, and care for a better world.</p>
          </div>
          <div>
            <h4>Site</h4>
            <ul>
              ${NAV_ITEMS.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('')}
            </ul>
          </div>
          <div>
            <h4>Begin</h4>
            <ul>
              <li><a href="services.html#book">Discovery call</a></li>
              <li><a href="mailto:YOUR-EMAIL@gmail.com">YOUR-EMAIL@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div class="colophon">Made slowly, with attention.</div>
      </footer>
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderFooter();
  });
})();
