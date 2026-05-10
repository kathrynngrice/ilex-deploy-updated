// Shared site chrome: nav, footer, type-variant tweak panel.
// Renders into [data-nav], [data-footer], [data-tweaks] mount points.

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
          <a class="brand" href="index.html"><img src="../assets/logo/ilex-garden-wordmark.svg" alt="Ilex Garden"></a>
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
            <img src="../assets/logo/ilex-garden-wordmark.svg" alt="Ilex Garden" style="height: 32px; margin-bottom: var(--space-4);">
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
              <li><a href="mailto:hello@ilexgarden.example">hello@ilexgarden.example</a></li>
            </ul>
          </div>
        </div>
        <div class="colophon">Made slowly, with attention.</div>
      </footer>
    `;
  }

  // Type variant persistence + simple tweaks panel
  function applyVariant(v) {
    document.documentElement.setAttribute('data-type-variant', v);
    try { localStorage.setItem('ilex.type-variant', v); } catch (e) {}
  }

  function renderTweaks() {
    const saved = (function(){ try { return localStorage.getItem('ilex.type-variant'); } catch(e){ return null; } })() || 'default';
    applyVariant(saved);

    const variants = [
      { id: 'default', label: 'Default — semibold humanist' },
      { id: 'editorial', label: 'Editorial — light italic display' },
      { id: 'confident', label: 'Confident — bolder, tighter' },
      { id: 'quiet', label: 'Quiet — regular weight, smaller' },
    ];

    const panel = document.createElement('div');
    panel.id = 'ilex-tweaks';
    panel.style.cssText = `
      position: fixed; right: 16px; bottom: 16px; z-index: 100;
      background: var(--surface-card); border: 1px solid var(--line-soft);
      border-radius: var(--r-lg); box-shadow: var(--shadow-rest);
      padding: 16px; width: 280px; display: none;
      font-family: var(--font-sans);
    `;
    panel.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 12px;">
        <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500; color: var(--fg-3);">Tweaks</strong>
        <button id="ilex-tweaks-close" style="background:none; border:0; cursor:pointer; color: var(--fg-3); font-size: 18px; line-height: 1;">×</button>
      </div>
      <div style="font-size: 12px; color: var(--fg-3); margin-bottom: 8px;">Type treatment</div>
      <div id="ilex-tweaks-radio" style="display:flex; flex-direction:column; gap: 6px;">
        ${variants.map(v => `
          <label style="display:flex; align-items:center; gap: 8px; padding: 8px 10px; border: 1px solid var(--line-soft); border-radius: var(--r-sm); cursor: pointer; font-size: 13px;">
            <input type="radio" name="type-variant" value="${v.id}" ${v.id === saved ? 'checked' : ''} style="accent-color: var(--accent-primary);">
            <span>${v.label}</span>
          </label>
        `).join('')}
      </div>
    `;
    document.body.appendChild(panel);

    panel.querySelectorAll('input[name=type-variant]').forEach(r => {
      r.addEventListener('change', e => applyVariant(e.target.value));
    });
    panel.querySelector('#ilex-tweaks-close').addEventListener('click', () => {
      panel.style.display = 'none';
      window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    });

    window.addEventListener('message', (e) => {
      if (!e.data || !e.data.type) return;
      if (e.data.type === '__activate_edit_mode') panel.style.display = 'block';
      if (e.data.type === '__deactivate_edit_mode') panel.style.display = 'none';
    });
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderFooter();
    renderTweaks();
  });
})();
