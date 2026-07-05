/**
 * ZEUS SENSI AI — script.js
 * Modern, modular JavaScript to power index.html and FF_SENSITIVITY.html
 *
 * Features:
 *  - Join Official Channel flow (WhatsApp / Telegram)
 *  - Access key verification (2007) with animated error & success
 *  - Large searchable device database (brands + many models + base specs)
 *  - Live search suggestions with keyboard support
 *  - AI Sensitivity generator (device-aware values + progress animation)
 *  - AI Analysis generation
 *  - Copy / Share / Download results (canvas-based screenshot)
 *  - Toast notification system (premium look & animations)
 *  - Persist state in localStorage (joined, access granted, last device, last result)
 *  - Live counters & simulated realtime activity
 *
 * Notes:
 *  - Works with the provided HTML structure from index.html and FF_SENSITIVITY.html
 *  - Avoids global namespace pollution via an IIFE
 *  - Designed for progressive enhancement (graceful no-feature fallbacks)
 */

/* ==========================================================================
   CONFIG & CONSTANTS
   ========================================================================== */
(() => {
  'use strict';

  /* --------- Local Storage Keys --------- */
  const LS = {
    JOINED_CHANNEL: 'zeus_joined_channel_v1',
    ACCESS_GRANTED: 'zeus_access_granted_v1',
    LAST_DEVICE: 'zeus_last_device_v1',
    LAST_RESULT: 'zeus_last_result_v1',
    TOTAL_GENERATED: 'zeus_total_generated_v1'
  };

  /* --------- App constants --------- */
  const REQUIRED_KEY = (document.body && document.body.dataset && document.body.dataset.requiredAccessKey) ? String(document.body.dataset.requiredAccessKey) : '2007';
  const WA_CHANNEL = 'https://whatsapp.com/channel/0029VbCsw0SGE56rCTPaXd06';
  const OWNER_WHATSAPP = 'https://wa.me/09066760078';
  const DEFAULT_BASE_GENERATED = 2000000; // fallback base counter

  /* ==========================================================================
     UTILITY HELPERS
     ========================================================================== */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const create = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('data-')) el.setAttribute(k, v);
      else el.setAttribute(k, v);
    }
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (!c) return;
      if (typeof c === 'string') el.appendChild(document.createTextNode(c));
      else el.appendChild(c);
    });
    return el;
  };

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const formatNumber = (n) => {
    if (typeof n !== 'number') return String(n);
    return n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' :
           n >= 1e3 ? (n / 1e3).toFixed(0) + 'K' : String(n);
  };

  /* Animated number incrementer */
  function animateNumber(el, from, to, ms = 900, formatter = formatNumber) {
    if (!el) return;
    const start = performance.now();
    const diff = to - from;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const val = Math.round(from + diff * eased);
      el.textContent = formatter(val);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ===========================
     Local Storage helpers
     =========================== */
  const lsGet = (k, fallback = null) => {
    try {
      const v = localStorage.getItem(k);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) { return fallback; }
  };

  const lsSet = (k, v) => {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ }
  };

  /* ==========================================================================
     TOAST / NOTIFICATIONS (premium)
     ========================================================================== */

  const toastContainer = (() => {
    let container = $('#zeus-toast-container');
    if (!container) {
      container = create('div', { id: 'zeus-toast-container', class: 'zeus-toast-container' });
      Object.assign(container.style, {
        position: 'fixed',
        right: '18px',
        top: '84px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none'
      });
      document.body.appendChild(container);
    }
    return container;
  })();

  function showToast({ title = '', message = '', type = 'info', duration = 3500 } = {}) {
    const colors = {
      info: '#ffffff',
      success: '#00e676',
      error: '#ff6a00',
      warn: '#ffd700'
    };
    const icon = type === 'success' ? '✓' : type === 'error' ? '!' : 'ℹ';
    const toast = create('div', { class: 'zeus-toast' });
    Object.assign(toast.style, {
      minWidth: '260px',
      maxWidth: '380px',
      padding: '12px 14px',
      borderRadius: '12px',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
      border: '1px solid rgba(255,255,255,0.03)',
      color: colors[type] || colors.info,
      boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
      pointerEvents: 'auto',
      transform: 'translateY(-6px)',
      opacity: '0',
      transition: 'all 320ms cubic-bezier(.2,.9,.2,1)'
    });

    toast.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="
          width:36px;height:36px;border-radius:10px;
          display:grid;place-items:center;font-weight:800;
          background:linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border:1px solid rgba(255,255,255,0.03);
        ">${icon}</div>
        <div style="flex:1">
          <div style="font-weight:800;color:var(--white);">${title}</div>
          <div style="color:var(--muted);font-size:0.95rem;margin-top:4px;">${message}</div>
        </div>
      </div>
    `;
    toastContainer.appendChild(toast);

    // show
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    // auto remove
    let removed = false;
    const remove = () => {
      if (removed) return;
      removed = true;
      toast.style.transform = 'translateY(-6px)';
      toast.style.opacity = '0';
      setTimeout(() => { toast.remove(); }, 320);
    };

    setTimeout(remove, duration);
    return { remove };
  }

  /* ==========================================================================
     DEVICE DATABASE
     ========================================================================== */

  /**
   * devicesDB structure:
   * {
   *   brandName: [
   *     { model: 'Galaxy S21', ramGB: 8, refreshRate: 120, android: '11', dpi: 420 },
   *     ...
   *   ],
   *   ...
   * }
   *
   * We include many popular models across brands.
   */

  const devicesDB = (() => {
    // Helper to add many models concisely
    const mk = (brand, list) => list.map(m => Object.assign({ brand }, m));

    const samsung = mk('Samsung', [
      { model: 'Galaxy S23 Ultra', ramGB: 12, refreshRate: 120, android: '13', dpi: 480 },
      { model: 'Galaxy S23', ramGB: 8, refreshRate: 120, android: '13', dpi: 440 },
      { model: 'Galaxy S22', ramGB: 8, refreshRate: 120, android: '12', dpi: 440 },
      { model: 'Galaxy S21', ramGB: 8, refreshRate: 120, android: '11', dpi: 420 },
      { model: 'Galaxy A54', ramGB: 8, refreshRate: 120, android: '13', dpi: 411 },
      { model: 'Galaxy A14', ramGB: 4, refreshRate: 90, android: '13', dpi: 408 }
    ]);

    const tecno = mk('Tecno', [
      { model: 'Phantom X2', ramGB: 8, refreshRate: 120, android: '13', dpi: 410 },
      { model: 'Camon 19', ramGB: 8, refreshRate: 90, android: '12', dpi: 400 },
      { model: 'Spark 10 Pro', ramGB: 6, refreshRate: 90, android: '12', dpi: 395 }
    ]);

    const infinix = mk('Infinix', [
      { model: 'Zero 5G', ramGB: 8, refreshRate: 120, android: '12', dpi: 410 },
      { model: 'Note 12', ramGB: 6, refreshRate: 90, android: '12', dpi: 408 },
      { model: 'Hot 11', ramGB: 4, refreshRate: 60, android: '11', dpi: 390 }
    ]);

    const redmi = mk('Redmi', [
      { model: 'Note 12 Pro', ramGB: 8, refreshRate: 120, android: '13', dpi: 460 },
      { model: 'Note 11', ramGB: 6, refreshRate: 90, android: '12', dpi: 409 },
      { model: '9A', ramGB: 2, refreshRate: 60, android: '10', dpi: 295 }
    ]);

    const xiaomi = mk('Xiaomi', [
      { model: '12T Pro', ramGB: 12, refreshRate: 144, android: '13', dpi: 520 },
      { model: 'Mi 11', ramGB: 8, refreshRate: 120, android: '12', dpi: 480 }
    ]);

    const oppo = mk('Oppo', [
      { model: 'Reno8', ramGB: 8, refreshRate: 90, android: '12', dpi: 416 },
      { model: 'Find X5', ramGB: 12, refreshRate: 120, android: '12', dpi: 525 }
    ]);

    const vivo = mk('Vivo', [
      { model: 'X80', ramGB: 12, refreshRate: 120, android: '13', dpi: 446 },
      { model: 'Y55', ramGB: 6, refreshRate: 90, android: '12', dpi: 410 }
    ]);

    const huawei = mk('Huawei', [
      { model: 'P50 Pro', ramGB: 8, refreshRate: 120, android: '11', dpi: 450 },
      { model: 'Nova 9', ramGB: 8, refreshRate: 90, android: '11', dpi: 412 }
    ]);

    const oneplus = mk('OnePlus', [
      { model: '11', ramGB: 16, refreshRate: 120, android: '13', dpi: 525 },
      { model: 'Nord 2', ramGB: 8, refreshRate: 90, android: '12', dpi: 410 }
    ]);

    const pixel = mk('Google Pixel', [
      { model: '7 Pro', ramGB: 12, refreshRate: 120, android: '13', dpi: 512 },
      { model: '6a', ramGB: 6, refreshRate: 60, android: '13', dpi: 432 }
    ]);

    const motorola = mk('Motorola', [
      { model: 'Edge 30', ramGB: 8, refreshRate: 144, android: '12', dpi: 430 },
      { model: 'Moto G Power', ramGB: 4, refreshRate: 60, android: '12', dpi: 395 }
    ]);

    const realme = mk('Realme', [
      { model: 'GT Neo 3', ramGB: 12, refreshRate: 150, android: '13', dpi: 430 },
      { model: '8 Pro', ramGB: 8, refreshRate: 60, android: '11', dpi: 395 }
    ]);

    const nokia = mk('Nokia', [
      { model: 'G50', ramGB: 4, refreshRate: 90, android: '11', dpi: 400 },
      { model: '2.4', ramGB: 3, refreshRate: 60, android: '10', dpi: 320 }
    ]);

    const iphone = mk('iPhone', [
      { model: '14 Pro Max', ramGB: 6, refreshRate: 120, ios: '16', dpi: 458 },
      { model: '13', ramGB: 4, refreshRate: 60, ios: '15', dpi: 460 },
      { model: '12 Mini', ramGB: 4, refreshRate: 60, ios: '14', dpi: 476 }
    ]);

    // Flatten into single list for search convenience
    const all = [
      ...samsung, ...tecno, ...infinix, ...redmi, ...xiaomi,
      ...oppo, ...vivo, ...huawei, ...oneplus, ...pixel,
      ...motorola, ...realme, ...nokia, ...iphone
    ];

    return {
      byBrand: {
        Samsung: samsung, Tecno: tecno, Infinix: infinix, Redmi: redmi, Xiaomi: xiaomi,
        Oppo: oppo, Vivo: vivo, Huawei: huawei, 'OnePlus': oneplus, 'Google Pixel': pixel,
        Motorola: motorola, Realme: realme, Nokia: nokia, iPhone: iphone
      },
      all
    };
  })();

  /* ==========================================================================
     SEARCH / SUGGESTION UI COMPONENT
     - creates an overlay suggestions panel when user interacts with phone fields
     - supports keyboard navigation and touch/click selection
     ========================================================================== */

  function createDeviceSelector() {
    // Build DOM structure once (lazy inject)
    if ($('#zeus-device-selector')) return $('#zeus-device-selector');

    const overlay = create('div', { id: 'zeus-device-selector', class: 'zeus-device-selector' });
    Object.assign(overlay.style, {
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'min(920px, 92vw)',
      maxHeight: '78vh',
      overflow: 'hidden',
      zIndex: 99998,
      borderRadius: '14px',
      padding: '12px',
      background: 'linear-gradient(180deg, rgba(10,10,10,0.8), rgba(8,8,8,0.92))',
      border: '1px solid rgba(255,255,255,0.03)',
      boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
      backdropFilter: 'blur(10px)',
      display: 'none',
      flexDirection: 'column',
      gap: '10px'
    });

    const header = create('div', { class: 'ds-header', html: `<strong style="color:var(--accent-gold)">Select your device</strong>` });
    Object.assign(header.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center' });

    const closeBtn = create('button', { class: 'btn btn--ghost', text: 'Close' });
    closeBtn.style.marginLeft = '12px';
    closeBtn.addEventListener('click', () => { overlay.style.display = 'none'; });

    header.appendChild(closeBtn);

    const searchWrap = create('div', { class: 'ds-search' });
    Object.assign(searchWrap.style, { display: 'flex', gap: '8px', alignItems: 'center' });

    const searchInput = create('input', { class: 'input', placeholder: 'Search brand or model (e.g. Galaxy S23, iPhone 14)', id: 'zeus-device-search' });
    searchInput.style.flex = '1';

    const brandFilter = create('select', { class: 'select', id: 'zeus-brand-filter' });
    const optAll = create('option', { value: '', text: 'All Brands' });
    brandFilter.appendChild(optAll);
    Object.keys(devicesDB.byBrand).forEach(b => {
      const o = create('option', { value: b, text: b });
      brandFilter.appendChild(o);
    });
    brandFilter.style.width = '220px';

    searchWrap.appendChild(searchInput);
    searchWrap.appendChild(brandFilter);

    const list = create('div', { id: 'zeus-device-list' });
    Object.assign(list.style, {
      overflowY: 'auto',
      flex: '1',
      padding: '6px',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.02)'
    });

    // suggestion item generator
    function renderResults(results, highlight = '') {
      list.innerHTML = '';
      if (!results.length) {
        list.appendChild(create('div', { text: 'No devices found', class: 'small-muted' }));
        return;
      }
      results.forEach((d, i) => {
        const item = create('div', { class: 'ds-item' });
        Object.assign(item.style, {
          padding: '10px',
          borderRadius: '10px',
          marginBottom: '6px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.02)'
        });

        // avatar (brand initial)
        const avatar = create('div', { class: 'ds-avatar', text: d.brand[0] });
        Object.assign(avatar.style, {
          width: '44px', height: '44px', borderRadius: '8px',
          display: 'grid', placeItems: 'center',
          background: 'linear-gradient(135deg, rgba(255,106,0,0.08), rgba(255,215,0,0.03))',
          fontWeight: 900
        });

        const body = create('div', { class: 'ds-body' });
        const title = create('div', { class: 'ds-title', html: `<strong style="color:var(--white)">${escapeHtml(d.model)}</strong>` });
        const subtitle = create('div', { class: 'ds-sub', text: `${d.brand} • ${d.ramGB}GB • ${d.refreshRate}Hz • Android ${d.android || d.ios}` });
        subtitle.style.color = 'var(--muted)';

        body.appendChild(title);
        body.appendChild(subtitle);

        // append
        item.appendChild(avatar);
        item.appendChild(body);

        // click handler
        item.addEventListener('click', () => {
          overlay.style.display = 'none';
          applySelectedDevice(d);
        });

        list.appendChild(item);
      });
    }

    // initial results
    renderResults(devicesDB.all.slice(0, 32));

    // keyboard navigation (up/down/enter)
    let focusIndex = -1;
    function updateFocus(idx) {
      const items = Array.from(list.querySelectorAll('.ds-item'));
      items.forEach((it, i) => {
        it.style.outline = i === idx ? '2px solid rgba(255,106,0,0.18)' : 'none';
        it.style.transform = i === idx ? 'translateY(-3px)' : '';
      });
      focusIndex = idx;
    }

    // search logic
    function performSearch() {
      const q = (searchInput.value || '').trim().toLowerCase();
      const brand = brandFilter.value || '';
      let results = devicesDB.all;
      if (brand) results = devicesDB.byBrand[brand] || [];
      if (q) {
        const parts = q.split(/\s+/).filter(Boolean);
        results = results.filter(d => {
          const hay = (d.brand + ' ' + d.model).toLowerCase();
          return parts.every(p => hay.includes(p));
        });
      }
      renderResults(results.slice(0, 200));
      updateFocus(-1);
    }

    searchInput.addEventListener('input', () => performSearch());
    brandFilter.addEventListener('change', () => performSearch());

    // global keydown for arrows / enter when overlay visible
    document.addEventListener('keydown', (ev) => {
      if (overlay.style.display === 'none') return;
      const items = Array.from(list.querySelectorAll('.ds-item'));
      if (!items.length) return;
      if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        updateFocus(clamp(focusIndex + 1, 0, items.length - 1));
        items[focusIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        updateFocus(clamp(focusIndex - 1, 0, items.length - 1));
        items[focusIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else if (ev.key === 'Enter') {
        if (focusIndex >= 0 && items[focusIndex]) {
          items[focusIndex].click();
        }
      } else if (ev.key === 'Escape') {
        overlay.style.display = 'none';
      }
    });

    // append header, search, list to overlay
    overlay.appendChild(header);
    overlay.appendChild(searchWrap);
    overlay.appendChild(list);

    // attach to body
    document.body.appendChild(overlay);

    // return accessor
    return {
      overlay,
      searchInput,
      brandFilter,
      open(query = '', preferredBrand = '') {
        overlay.style.display = 'flex';
        searchInput.value = query;
        if (preferredBrand) brandFilter.value = preferredBrand;
        else brandFilter.value = '';
        performSearch();
        searchInput.focus();
      },
      close() { overlay.style.display = 'none'; }
    };
  }

  /* ==========================================================================
     DEVICE APPLICATION (writes chosen device to the page and localStorage)
     ========================================================================== */

  function applySelectedDevice(device) {
    // device is an object { brand, model, ramGB, refreshRate, android/ios, dpi }
    try {
      const brandEl = $('#phone-brand');
      const modelEl = $('#phone-model');
      const ramEl = $('#phone-ram');
      const refreshEl = $('#phone-refresh');
      const andEl = $('#phone-android');

      if (brandEl) brandEl.textContent = device.brand;
      if (modelEl) modelEl.textContent = device.model;
      if (ramEl) ramEl.textContent = device.ramGB ? `${device.ramGB} GB` : '—';
      if (refreshEl) refreshEl.textContent = device.refreshRate ? `${device.refreshRate} Hz` : '—';
      if (andEl) andEl.textContent = device.android || device.ios || '—';

      // store last device
      lsSet(LS.LAST_DEVICE, device);

      showToast({ title: 'Device Selected', message: `${device.brand} ${device.model} saved`, type: 'success', duration: 2600 });
    } catch (err) {
      console.error('applySelectedDevice:', err);
    }
  }

  /* Utility: escape html for safety when injecting innerHTML */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"'`=\/]/g, s => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;' }[s]));
  }

  /* ==========================================================================
     ACCESS KEY MODAL & VERIFICATION
     ========================================================================== */

  function ensureAccessKeyUI() {
    // Build modal only when needed
    if ($('#zeus-access-modal')) return $('#zeus-access-modal');

    const modal = create('div', { id: 'zeus-access-modal' });
    Object.assign(modal.style, {
      position: 'fixed', inset: 0, zIndex: 99997, display: 'none',
      alignItems: 'center', justifyContent: 'center', background: 'rgba(3,3,3,0.65)'
    });

    const inner = create('div', { class: 'access-inner' });
    Object.assign(inner.style, {
      width: 'min(520px, 92vw)', background: 'linear-gradient(180deg, rgba(10,10,10,0.9), rgba(6,6,6,0.96))',
      padding: '18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)',
      boxShadow: '0 36px 120px rgba(0,0,0,0.8)'
    });

    inner.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <div>
          <h3 style="margin:0;color:var(--accent-gold)">Access Required</h3>
          <div style="color:var(--muted);margin-top:6px">Enter the access key to unlock the AI generator.</div>
        </div>
        <div style="font-weight:900;color:var(--accent-orange);">Protected</div>
      </div>
    `;

    const form = create('div', { class: 'access-form' });
    Object.assign(form.style, { display: 'flex', gap: '8px', alignItems: 'center' });

    const input = create('input', { class: 'input', placeholder: 'Enter Access Key', id: 'zeus-access-input' });
    Object.assign(input.style, { flex: '1' });

    const btn = create('button', { class: 'btn btn--primary', text: 'Unlock' });
    btn.addEventListener('click', async () => {
      const val = (input.value || '').trim();
      if (!val) {
        animateAccessError('Please enter the access key.');
        return;
      }
      if (val === REQUIRED_KEY) {
        lsSet(LS.ACCESS_GRANTED, true);
        showToast({ title: 'Access Granted', message: 'You may now generate sensitivities', type: 'success' });
        closeModal();
        enableGenerator();
      } else {
        animateAccessError('Invalid access key. Please check and try again.');
      }
    });

    const help = create('div', { class: 'access-help', html: `<small style="color:var(--muted)">Need help? Join the official channel for instructions.</small>` });

    form.appendChild(input);
    form.appendChild(btn);
    inner.appendChild(form);
    inner.appendChild(help);

    // error area
    const err = create('div', { id: 'zeus-access-error' });
    Object.assign(err.style, { color: 'var(--danger)', marginTop: '10px', minHeight: '22px', fontWeight: 700 });

    inner.appendChild(err);

    // keyboard: Enter triggers verify
    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        btn.click();
      }
    });

    // helpers
    function animateAccessError(message) {
      err.textContent = message;
      err.style.opacity = '0';
      err.style.transform = 'translateY(-6px)';
      err.style.transition = 'all 260ms cubic-bezier(.2,.9,.2,1)';
      requestAnimationFrame(() => {
        err.style.opacity = '1';
        err.style.transform = 'translateY(0)';
      });
      // subtle shake animation
      inner.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(0)' }
      ], { duration: 420, iterations: 1 });
      showToast({ title: 'Access Denied', message, type: 'error' });
    }

    function openModal() {
      modal.style.display = 'flex';
      input.value = '';
      setTimeout(() => input.focus(), 120);
    }
    function closeModal() {
      modal.style.display = 'none';
    }

    // close on background click
    modal.addEventListener('click', (ev) => {
      if (ev.target === modal) closeModal();
    });

    modal.appendChild(inner);
    modal.appendChild(create('div', { html: '' })); // spacer
    document.body.appendChild(modal);

    return { modal, open: openModal, close: closeModal, animateAccessError };
  }

  /* ==========================================================================
     JOIN CHANNEL LOGIC
     - binds to any element that should open the channel (hero-channel, channel-link, hero nav)
     ========================================================================== */

  function initJoinChannel() {
    const selectors = ['#hero-channel', '#channel-link', '#footer-whatsapp', '#whatsapp-support'];
    selectors.forEach(sel => {
      const el = $(sel);
      if (!el) return;
      el.addEventListener('click', (ev) => {
        ev.preventDefault();
        window.open(WA_CHANNEL, '_blank', 'noopener');
        lsSet(LS.JOINED_CHANNEL, true);
        showToast({ title: 'Joined Channel', message: '✅ Joined Successfully', type: 'success' });
        markJoinedState();
      });
    });

    // already joined?
    if (lsGet(LS.JOINED_CHANNEL)) markJoinedState();
  }

  function markJoinedState() {
    // change any "Join Official Channel" buttons to show joined
    const joinEls = $$('#hero-channel, #channel-link, #footer-whatsapp, #whatsapp-support');
    joinEls.forEach(el => {
      el.classList.add('is-joined');
      // update text if anchor/button
      if (el.tagName.toLowerCase() === 'a' || el.tagName.toLowerCase() === 'button') {
        el.textContent = '✅ Joined';
      }
    });
  }

  /* ==========================================================================
     ACCESS / GENERATOR ENABLEMENT
     ========================================================================== */

  function enableGenerator() {
    const btnGen = $('#btn-generate');
    if (!btnGen) return;
    btnGen.removeAttribute('disabled');
    btnGen.classList.remove('btn--ghost'); // visual cue
    btnGen.classList.add('btn--primary');

    // if last result exists, restore values
    const last = lsGet(LS.LAST_RESULT);
    if (last) {
      restoreLastResult(last);
    }
  }

  function disableGenerator() {
    const btnGen = $('#btn-generate');
    if (!btnGen) return;
    btnGen.setAttribute('disabled', 'true');
    btnGen.classList.remove('btn--primary');
    btnGen.classList.add('btn--ghost');
  }

  /* ==========================================================================
     GENERATOR CORE — produce sensitivities and performance metrics
     ========================================================================== */

  /**
   * Given a device (object), produce a sensitivity result object with:
   *  - general, redDot, scope2x, scope4x, sniper, freeLook (numbers)
   *  - dpiRecommendation, hudRecommendation, graphicsRecommendation, aimStyle
   *  - performance scores: accuracy, headshot, recoil, stability, reaction (0-100)
   *
   * The algorithm uses device specs (ram, refreshRate, dpi) to bias values.
   */
  function computeSensitivityForDevice(device = {}) {
    // base ranges
    const baseGeneral = 200;
    const baseModifiers = {
      ram: clamp(((device.ramGB || 4) - 3) * 0.06, 0, 0.5),       // more RAM -> slightly higher base sensitivity stability
      refresh: clamp(((device.refreshRate || 60) - 60) / 120, 0, 1), // higher refresh -> better tiny adjustments
      dpi: clamp(((device.dpi || 400) - 320) / 300, 0, 1)
    };

    // core generation
    const general = Math.round(baseGeneral * (1 + baseModifiers.ram * 0.6 + baseModifiers.refresh * 0.9 + (Math.random() - 0.45) * 0.08));
    const redDot = Math.round(general * (0.9 + baseModifiers.refresh * 0.06 - Math.random() * 0.06));
    const scope2x = Math.round(general * (0.64 + baseModifiers.dpi * 0.06 - Math.random() * 0.05));
    const scope4x = Math.round(general * (0.46 + baseModifiers.dpi * 0.05 - Math.random() * 0.06));
    const sniper = Math.round(general * (0.18 + baseModifiers.refresh * 0.03 - Math.random() * 0.04));
    const freeLook = Math.round(general * (1.22 + baseModifiers.ram * 0.05 + Math.random() * 0.06));

    // DPI recommendation heuristics
    let dpiRecommendation = 'Default';
    if (device.dpi) {
      if (device.dpi >= 480) dpiRecommendation = 'Set DPI to 320–360 for steadier aim';
      else if (device.dpi >= 420) dpiRecommendation = 'Set DPI to 360–400';
      else dpiRecommendation = 'Use default DPI';
    }

    // HUD recommendation
    const hudRecommendation = pick([
      'Compact HUD, left-handed layout',
      'Balanced HUD with enlarged crosshair',
      'Minimal HUD, center quickbar'
    ]);

    // Graphics recommendation
    let graphics = 'Smooth';
    if (device.ramGB >= 8 && device.refreshRate >= 120) graphics = 'Ultra Smooth';
    else if (device.ramGB <= 3) graphics = 'Balanced (Low)';

    // aim style
    const aimStyle = pick(['Tracking', 'Flick', 'Hybrid']);

    // Performance scoring influenced by specs
    const perfBase = clamp((device.ramGB || 4) * 6 + clamp((device.refreshRate || 60) / 6, 0, 40), 30, 90);
    const accuracy = clamp(Math.round(perfBase + Math.random() * 10 - 4), 32, 98);
    const headshot = clamp(Math.round(accuracy - (Math.random() * 8)), 24, 98);
    const recoil = clamp(Math.round(perfBase + (baseModifiers.refresh * 6) + (Math.random() * 8 - 3)), 20, 98);
    const stability = clamp(Math.round(perfBase + baseModifiers.ram * 8 + (Math.random() * 8 - 3)), 26, 99);
    const reaction = clamp(Math.round(60 + baseModifiers.refresh * 14 + (Math.random() * 12 - 4)), 24, 99);

    // Compose results
    return {
      generatedAt: new Date().toISOString(),
      general, redDot, scope2x, scope4x, sniper, freeLook,
      dpiRecommendation, hudRecommendation, graphicsRecommendation: graphics, aimStyle,
      performance: { accuracy, headshot, recoil, stability, reaction }
    };
  }

  /* ==========================================================================
     UI: AI Loading overlay + progress simulation
     ========================================================================== */

  function createAILoading() {
    if ($('#zeus-ai-loading')) return $('#zeus-ai-loading');

    const overlay = create('div', { id: 'zeus-ai-loading' });
    Object.assign(overlay.style, {
      position: 'fixed', inset: 0, zIndex: 99996, display: 'none',
      alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(3,3,3,0.6), rgba(3,3,3,0.8))'
    });

    const card = create('div', { class: 'card shimmer' });
    Object.assign(card.style, {
      width: 'min(760px, 92vw)',
      padding: '24px',
      display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center'
    });

    card.innerHTML = `
      <div style="font-weight:900;color:var(--accent-gold);font-size:1.05rem">ZEUS AI — Generating Sensitivity</div>
      <div style="color:var(--muted)">Analyzing device profile and gameplay heuristics...</div>
    `;

    // progress bar visual
    const progWrap = create('div', {});
    Object.assign(progWrap.style, { width: '100%', display: 'grid', gap: '8px' });

    const progressLine = create('div', { class: 'progress', id: 'zeus-ai-progress' });
    Object.assign(progressLine.style, { height: '14px', borderRadius: '999px' });
    const progressFill = create('div', { class: 'progress__fill', id: 'zeus-ai-progress-fill' });
    progressLine.appendChild(progressFill);

    // small animated bars to show "thinking"
    const bars = create('div', {});
    Object.assign(bars.style, { display: 'flex', gap: '8px', alignItems: 'flex-end', height: '44px' });
    for (let i = 0; i < 6; i++) {
      const b = create('div', { class: 'ai-bar' });
      Object.assign(b.style, {
        width: `${8}px`,
        height: `${randInt(8, 30)}px`,
        background: 'linear-gradient(180deg,var(--accent-orange),var(--accent-gold))',
        borderRadius: '6px',
        transformOrigin: 'bottom center',
        animation: `aiPulse ${0.9 + i * 0.08}s ease-in-out ${i * 0.05}s infinite`
      });
      bars.appendChild(b);
    }

    progWrap.appendChild(progressLine);
    progWrap.appendChild(bars);

    card.appendChild(progWrap);

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    return { overlay, progressFill };
  }

  /* ==========================================================================
     RENDER / UI UPDATE FUNCTIONS
     - write results into sensi cards and performance bars
     ========================================================================== */

  function renderResultToUI(result) {
    if (!result) return;

    // write to result cards
    const mappings = [
      ['sensi-general-value', result.general],
      ['sensi-red-dot-value', result.redDot],
      ['sensi-2x-value', result.scope2x],
      ['sensi-4x-value', result.scope4x],
      ['sensi-sniper-value', result.sniper],
      ['sensi-free-look-value', result.freeLook]
    ];
    mappings.forEach(([id, val]) => {
      const el = $('#' + id);
      if (el) el.textContent = val;
    });

    // AI Analysis write
    const analysis = $('#ai-analysis-text');
    if (analysis) {
      analysis.textContent = generateAIAnalysis(result);
    }

    // performance bars (animate)
    const perf = result.performance || {};
    const perfMap = [
      ['accuracy-bar', 'accuracy-value', perf.accuracy || 0],
      ['headshot-bar', 'headshot-value', perf.headshot || 0],
      ['recoil-bar', 'recoil-value', perf.recoil || 0],
      ['stability-bar', 'stability-value', perf.stability || 0],
      ['reaction-bar', 'reaction-value', perf.reaction || 0]
    ];
    perfMap.forEach(([barId, labelId, value]) => {
      const bar = $('#' + barId);
      const label = $('#' + labelId);
      if (label) label.textContent = value + '%';
      if (bar) {
        // animate width
        bar.style.width = '0%';
        bar.setAttribute('aria-valuenow', 0);
        setTimeout(() => {
          bar.style.transition = 'width 1000ms cubic-bezier(.2,.9,.2,1)';
          bar.style.width = value + '%';
          bar.setAttribute('aria-valuenow', value);
        }, 60);
      }
    });

    // DPI / HUD / Graphics / Aim style placements
    const perfCard = $('#performance-score') || document.createElement('div');
    // add details under AI Analysis or results card
    const infoEl = $('#ai-extra-info') || create('div', { id: 'ai-extra-info' });
    infoEl.style.color = 'var(--muted)';
    infoEl.style.marginTop = '12px';
    infoEl.innerHTML = `
      <div><strong>DPI:</strong> ${escapeHtml(result.dpiRecommendation || 'Default')}</div>
      <div><strong>HUD:</strong> ${escapeHtml(result.hudRecommendation || '-')}</div>
      <div><strong>Graphics:</strong> ${escapeHtml(result.graphicsRecommendation || '-')}</div>
      <div><strong>Aim Style:</strong> ${escapeHtml(result.aimStyle || '-')}</div>
    `;
    const aiAnalysisCard = $('#ai-analysis');
    if (aiAnalysisCard) {
      // append or replace
      if (!$('#ai-extra-info')) aiAnalysisCard.querySelector('.card__body').appendChild(infoEl);
    }

    // success badge animation
    const successBadge = $('#success-badge');
    if (successBadge) {
      successBadge.animate([
        { transform: 'scale(0.95)', opacity: 0.6 },
        { transform: 'scale(1.02)', opacity: 1 },
        { transform: 'scale(1)', opacity: 1 }
      ], { duration: 600, easing: 'cubic-bezier(.2,.9,.2,1)' });
    }
  }

  function generateAIAnalysis(result) {
    // produce human-friendly analysis based on the numbers
    const reasons = [];
    reasons.push(`ZEUS AI balanced sensitivity to suit your device's memory and refresh rate.`);
    if (result.performance && result.performance.stability > 70) reasons.push('High stability score suggests tighter horizontal sensitivity for consistent tracking.');
    if (result.performance && result.performance.recoil > 65) reasons.push('Recoil control is prioritized to reduce vertical drift on rapid fire.');
    if (result.dpiRecommendation && result.dpiRecommendation.indexOf('DPI') >= 0) reasons.push(`DPI recommendation: ${result.dpiRecommendation}.`);
    reasons.push('These settings aim to maximize accuracy while keeping aim feel responsive for fast engagements.');
    return reasons.join(' ');
  }

  /* ==========================================================================
     COPY / SHARE / DOWNLOAD FEATURES
     ========================================================================== */

  function assembleSettingsText(device, result) {
    const now = new Date().toLocaleString();
    const deviceInfo = device ? `${device.brand} ${device.model} • ${device.ramGB || '—'}GB • ${device.refreshRate || '—'}Hz` : 'Unknown Device';
    return [
      `ZEUS SENSI AI — Generated ${now}`,
      `Device: ${deviceInfo}`,
      `--- Sensitivity ---`,
      `General: ${result.general}`,
      `Red Dot: ${result.redDot}`,
      `2X Scope: ${result.scope2x}`,
      `4X Scope: ${result.scope4x}`,
      `Sniper: ${result.sniper}`,
      `Free Look: ${result.freeLook}`,
      `--- Recommendations ---`,
      `DPI: ${result.dpiRecommendation}`,
      `HUD: ${result.hudRecommendation}`,
      `Graphics: ${result.graphicsRecommendation}`,
      `Aim Style: ${result.aimStyle}`,
      `--- Performance ---`,
      `Accuracy: ${result.performance.accuracy}%`,
      `Headshot: ${result.performance.headshot}%`,
      `Recoil Control: ${result.performance.recoil}%`,
      `Aim Stability: ${result.performance.stability}%`,
      `Reaction Speed: ${result.performance.reaction}%`,
      `Generated by: ZEUS SENSI AI`
    ].join('\n');
  }

  async function copySettingsToClipboard(device, result) {
    const text = assembleSettingsText(device, result);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast({ title: 'Copied', message: 'Sensitivity settings copied to clipboard', type: 'success' });
      } else {
        // fallback
        const ta = create('textarea', { text });
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showToast({ title: 'Copied', message: 'Sensitivity settings copied to clipboard', type: 'success' });
      }
    } catch (err) {
      showToast({ title: 'Copy Failed', message: 'Unable to copy to clipboard', type: 'error' });
    }
  }

  async function shareResults(device, result) {
    const summary = assembleSettingsText(device, result);
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ZEUS SENSI AI — Your Sensitivity',
          text: `${device ? device.brand + ' ' + device.model : 'Device'} — Sensitivity generated by ZEUS SENSI AI`,
          url: window.location.href
        });
        showToast({ title: 'Shared', message: 'Results shared via native share', type: 'success' });
      } catch (err) {
        showToast({ title: 'Share Cancelled', message: 'Share action was cancelled', type: 'warn' });
      }
    } else {
      // fallback: copy to clipboard
      await copySettingsToClipboard(device, result);
    }
  }

  function downloadResultImage(device, result) {
    // Draw a simple screenshot-like image on canvas using results
    const w = 1000;
    const h = 700;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // background
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(8,8,8,1)');
    grad.addColorStop(1, 'rgba(18,10,6,1)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // header
    ctx.fillStyle = 'rgba(255,215,0,0.06)';
    ctx.fillRect(36, 28, w - 72, 96);

    ctx.font = '700 28px "Orbitron", Arial';
    ctx.fillStyle = '#ffd700';
    ctx.fillText('ZEUS SENSI AI', 56, 60);

    ctx.font = '600 16px "Inter", Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(`Device: ${device ? device.brand + ' ' + device.model : 'Unknown'}`, 56, 92);

    // draw sensitivity boxes
    const leftX = 56;
    const topY = 150;
    const boxW = 420;
    const boxH = 88;
    const gap = 22;

    const items = [
      ['General', result.general],
      ['Red Dot', result.redDot],
      ['2X Scope', result.scope2x],
      ['4X Scope', result.scope4x],
      ['Sniper Scope', result.sniper],
      ['Free Look', result.freeLook]
    ];

    ctx.font = '700 20px "Inter", Arial';
    items.forEach((it, idx) => {
      const x = leftX + (idx % 2) * (boxW + 28);
      const y = topY + Math.floor(idx / 2) * (boxH + gap);
      // card background
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      roundRect(ctx, x, y, boxW, boxH, 12, true, false);
      // title
      ctx.fillStyle = '#ffd48a';
      ctx.font = '700 14px "Inter", Arial';
      ctx.fillText(it[0], x + 16, y + 28);
      // value
      ctx.fillStyle = '#fff';
      ctx.font = '800 36px "Inter", Arial';
      ctx.fillText(String(it[1]), x + 16, y + 62);
    });

    // small footer summary
    ctx.font = '600 16px "Inter", Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('DPI: ' + result.dpiRecommendation, 56, h - 92);
    ctx.fillText('HUD: ' + result.hudRecommendation, 300, h - 92);
    ctx.fillText('Graphics: ' + result.graphicsRecommendation, 56, h - 62);
    ctx.fillText('Aim Style: ' + result.aimStyle, 300, h - 62);

    // signature
    ctx.fillStyle = '#ffd700';
    ctx.font = '700 14px "Inter", Arial';
    ctx.fillText('Generated by ZEUS SENSI AI', w - 320, h - 36);

    canvas.toBlob((blob) => {
      if (!blob) return showToast({ title: 'Download Failed', message: 'Could not create image', type: 'error' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zeus-sensi-${(device && device.model) ? device.model.replace(/\s+/g, '_').toLowerCase() : 'result'}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast({ title: 'Download', message: 'Screenshot downloaded', type: 'success' });
    }, 'image/png');

    // helper: rounded rect
    function roundRect(ctx, x, y, w, h, r, fill, stroke) {
      if (r === undefined) r = 5;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
    }
  }

  /* ==========================================================================
     RESTORE LAST STATE
     ========================================================================== */

  function restoreLastDeviceAndResult() {
    const lastDevice = lsGet(LS.LAST_DEVICE);
    if (lastDevice) applySelectedDevice(lastDevice);

    const lastRes = lsGet(LS.LAST_RESULT);
    if (lastRes) {
      renderResultToUI(lastRes);
    }
  }

  function restoreLastResult(last) {
    if (!last) return;
    // show small animation to indicate restored
    renderResultToUI(last);
    showToast({ title: 'Restored', message: 'Restored last generated sensitivity', type: 'info' });
  }

  /* ==========================================================================
     SIMULATED LIVE FEATURES
     - update counters on index page and show online users
     ========================================================================== */

  function initLiveCounters() {
    // total generated
    let total = lsGet(LS.TOTAL_GENERATED, DEFAULT_BASE_GENERATED);
    const totalEl = $('#stat-generated .stat__number') || $('#stat-generated .stat__number') || $('#stat-generated strong') || $('#stat-generated .stat__number');

    // If index uses simple structure .stat__number inside li#stat-generated
    const statGenerated = $('#stat-generated .stat__number') || $('#stat-generated strong') || $('#stat-generated .stat__number') || $('#stat-generated');

    // users online simulation
    const usersEl = $('#stat-users .stat__number') || $('#stat-users strong');

    // latest generations list container (create if absent)
    let liveWrap = $('#zeus-live-wrap');
    if (!liveWrap) {
      liveWrap = create('div', { id: 'zeus-live-wrap' });
      if ($('#main')) $('#main').appendChild(liveWrap);
      Object.assign(liveWrap.style, { position: 'fixed', left: '14px', bottom: '14px', zIndex: 99992 });
    }

    // update loop
    setInterval(() => {
      // bump total randomly when user "generates"
      const inc = randInt(2, 12);
      total += inc;
      lsSet(LS.TOTAL_GENERATED, total);

      // animate count element if present
      const sg = $('#stat-generated .stat__number') || $('#stat-generated .stat__number') || $('#stat-generated strong') || $('#stat-generated');
      if (sg) {
        animateNumber(sg, Math.max(0, total - inc), total, 900);
      }

      // users online random
      const users = randInt(120, 4200);
      const su = $('#stat-users .stat__number') || $('#stat-users strong');
      if (su) su.textContent = formatNumber(users) + '+';

      // optionally display a toast of "latest generation" occasionally
      if (Math.random() > 0.85) {
        showToast({ title: 'Generation Completed', message: `${formatNumber(randInt(80000, 999999))} players used ZEUS AI`, type: 'info', duration: 2200 });
      }
    }, 4500);
  }

  /* ==========================================================================
     HOOKS & BINDINGS (init UI logic)
     ========================================================================== */

  function initDeviceSelectorBindings() {
    const selector = createDeviceSelector();

    // when clicking the phone brand or model dd elements on the sensitivity page, open selector
    const phoneBrandEl = $('#phone-brand');
    const phoneModelEl = $('#phone-model');

    if (phoneBrandEl) {
      phoneBrandEl.style.cursor = 'pointer';
      phoneBrandEl.title = 'Click to change device';
      phoneBrandEl.addEventListener('click', () => {
        selector.open('', phoneBrandEl.textContent || '');
      });
    }
    if (phoneModelEl) {
      phoneModelEl.style.cursor = 'pointer';
      phoneModelEl.title = 'Click to choose model';
      phoneModelEl.addEventListener('click', () => {
        selector.open(phoneModelEl.textContent || '', phoneBrandEl ? phoneBrandEl.textContent : '');
      });
    }

    // also add a "select device" button near actions if exists
    const actionArea = $('#action-buttons .card__body');
    if (actionArea) {
      const btn = create('button', { class: 'btn btn--secondary', text: 'Select Device' });
      btn.addEventListener('click', () => selector.open());
      actionArea.appendChild(btn);
    }
  }

  /* ==========================================================================
     GENERATE FLOW (with loading UI)
     ========================================================================== */

  async function runGenerationFlow() {
    // check access
    if (!lsGet(LS.ACCESS_GRANTED)) {
      const accessModal = ensureAccessKeyUI();
      accessModal.open();
      return;
    }

    const loader = createAILoading();
    loader.overlay.style.display = 'flex';
    const fillEl = loader.progressFill;

    // determine device context
    const device = lsGet(LS.LAST_DEVICE) || inferDeviceFromDOM();

    // simulate staged progress with updates
    const steps = [
      { name: 'Analyzing device profile', pct: randInt(6, 14), delay: 700 },
      { name: 'Evaluating RAM & CPU characteristics', pct: randInt(8, 18), delay: 900 },
      { name: 'Calibrating for refresh rate & DPI', pct: randInt(8, 18), delay: 1100 },
      { name: 'Applying headshot optimization model', pct: randInt(10, 18), delay: 1000 },
      { name: 'Finalizing sensitivity parameters', pct: randInt(10, 20), delay: 1000 }
    ];

    // progressive fill
    let currentPct = 4;
    fillEl.style.width = currentPct + '%';

    for (const s of steps) {
      // update small text (not present visually but leave room)
      await sleep(s.delay);
      currentPct = clamp(currentPct + s.pct + randInt(-3, 4), 0, 92);
      fillEl.style.width = currentPct + '%';
    }

    // finalizing step
    await sleep(600);
    fillEl.style.width = '100%';

    // compute results
    await sleep(520);
    const result = computeSensitivityForDevice(device);
    // persist
    lsSet(LS.LAST_RESULT, result);

    // increment global generated counter
    const total = lsGet(LS.TOTAL_GENERATED, DEFAULT_BASE_GENERATED) + randInt(3, 14);
    lsSet(LS.TOTAL_GENERATED, total);

    // write to UI
    renderResultToUI(result);

    // hide loader elegantly
    setTimeout(() => {
      loader.overlay.style.display = 'none';
    }, 400);

    showToast({ title: 'Generated', message: 'Your AI sensitivity is ready', type: 'success' });

    return result;
  }

  function inferDeviceFromDOM() {
    // attempt to read the dd elements
    const brand = $('#phone-brand') ? $('#phone-brand').textContent.trim() : '';
    const model = $('#phone-model') ? $('#phone-model').textContent.trim() : '';
    if (!brand || !model) return null;
    // attempt to find exact model in DB
    const found = devicesDB.all.find(d => d.brand.toLowerCase() === brand.toLowerCase() && d.model.toLowerCase() === model.toLowerCase());
    return found || { brand, model, ramGB: 4, refreshRate: 60, android: 'Unknown', dpi: 400 };
  }

  /* ==========================================================================
     BIND UI BUTTONS
     ========================================================================== */

  function bindButtons() {
    // Generate button
    const btnGen = $('#btn-generate');
    if (btnGen) {
      btnGen.addEventListener('click', async (ev) => {
        ev.preventDefault();
        btnGen.setAttribute('disabled', 'true');
        btnGen.classList.add('is-loading');
        try {
          await runGenerationFlow();
        } catch (err) {
          console.error(err);
          showToast({ title: 'Error', message: 'Generation failed', type: 'error' });
        } finally {
          btnGen.removeAttribute('disabled');
          btnGen.classList.remove('is-loading');
        }
      });
    }

    // Copy
    const btnCopy = $('#btn-copy');
    if (btnCopy) {
      btnCopy.addEventListener('click', async () => {
        const device = lsGet(LS.LAST_DEVICE);
        const result = lsGet(LS.LAST_RESULT);
        if (!result) return showToast({ title: 'Nothing to copy', message: 'Generate first', type: 'warn' });
        await copySettingsToClipboard(device, result);
      });
    }

    // Download
    const btnDownload = $('#btn-download');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        const device = lsGet(LS.LAST_DEVICE);
        const result = lsGet(LS.LAST_RESULT);
        if (!result) return showToast({ title: 'Nothing to download', message: 'Generate first', type: 'warn' });
        downloadResultImage(device, result);
      });
    }

    // Share (re-use a class or create a handler if present)
    const btnShare = $('.btn--share');
    if (btnShare) {
      btnShare.addEventListener('click', async () => {
        const device = lsGet(LS.LAST_DEVICE);
        const result = lsGet(LS.LAST_RESULT);
        if (!result) return showToast({ title: 'Nothing to share', message: 'Generate first', type: 'warn' });
        await shareResults(device, result);
      });
    }

    // Start Now links - ensure they navigate to FF_SENSITIVITY.html as requested
    const startLinks = $$('#hero-start, #start-now-nav, .btn--glow');
    startLinks.forEach(el => {
      el && el.addEventListener('click', (ev) => {
        // if element is an anchor that already points to FF_SENSITIVITY.html, allow default behavior
        // otherwise navigate programmatically
        const href = el.getAttribute && el.getAttribute('href');
        if (href && href.includes('FF_SENSITIVITY.html')) return;
        ev.preventDefault();
        window.location.href = 'FF_SENSITIVITY.html';
      });
    });

    // Join Official Channel - initJoinChannel handles most links; also badge on index change
    initJoinChannel();
  }

  /* ==========================================================================
     PAGE INIT
     ========================================================================== */

  function initPage() {
    // Live counters & simulated activity for index
    try {
      initLiveCounters();
    } catch (err) { console.warn('live counters init failed', err); }

    // Setup device selector bindings on generator page (if elements exist)
    initDeviceSelectorBindings();

    // Access key: check LS
    if (lsGet(LS.ACCESS_GRANTED)) {
      enableGenerator();
    } else {
      disableGenerator();
      // if there is a generator button, attach to it a click that triggers modal
      const btn = $('#btn-generate');
      if (btn) {
        btn.addEventListener('click', (ev) => {
          if (lsGet(LS.ACCESS_GRANTED)) return;
          ev.preventDefault();
          const modal = ensureAccessKeyUI();
          modal.open();
        });
      }
    }

    // Restore last device and results
    restoreLastDeviceAndResult();

    // Bind basic buttons
    bindButtons();
  }

  /* ==========================================================================
     QUICK START: initialize when DOM is ready
     ========================================================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
  } else {
    initPage();
  }

  /* ==========================================================================
     EXPORTS (for debugging in console; non-intrusive)
     ========================================================================== */
  window.ZEUS = {
    devicesDB,
    computeSensitivityForDevice,
    runGenerationFlow,
    showToast,
    getLS: lsGet,
    setLS: lsSet
  };

})();
