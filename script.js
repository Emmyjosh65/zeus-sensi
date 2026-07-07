/**
 * ZEUS SENSI AI v6.0 — script.js
 * Vanilla ES6+ | No frameworks | No external dependencies
 * Supports: index.html (landing) & FF SENSITIVITY.html (wizard)
 */

(() => {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════
   * §0  CONSTANTS & DEVICE DATABASE
   * ═══════════════════════════════════════════════════════════════ */

  const LS = {
    HISTORY:   'zss_history',
    FAVORITES: 'zss_favorites',
    SETTINGS:  'zss_settings',
    CURRENT:   'zss_current',
  };

  const PIN = '2007';
  const WA_CHANNEL = 'https://whatsapp.com/channel/0029VbA2vXVJuyAJZ3h6MR1z';
  const WA_SUPPORT = 'https://wa.me/2349125787958';

  /** @type {Array<DeviceSpec>} */
  const DEVICES = [
    { name:'Samsung Galaxy S24 Ultra', brand:'Samsung', ram:12, processor:'Snapdragon 8 Gen 3', refreshRate:120, android:14, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'3088×1440', perf:97 },
    { name:'Samsung Galaxy S24',        brand:'Samsung', ram:8,  processor:'Snapdragon 8 Gen 3', refreshRate:120, android:14, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'2340×1080', perf:93 },
    { name:'Samsung Galaxy S23',        brand:'Samsung', ram:8,  processor:'Snapdragon 8 Gen 2', refreshRate:120, android:13, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'2340×1080', perf:90 },
    { name:'Samsung Galaxy A55',        brand:'Samsung', ram:8,  processor:'Exynos 1480',        refreshRate:120, android:14, recommendedFPS:60, gyro:true,  touchHz:120, resolution:'2340×1080', perf:70 },
    { name:'Samsung Galaxy A34',        brand:'Samsung', ram:6,  processor:'Dimensity 1080',     refreshRate:120, android:13, recommendedFPS:60, gyro:true,  touchHz:120, resolution:'2408×1080', perf:65 },
    { name:'Samsung Galaxy A15',        brand:'Samsung', ram:4,  processor:'Dimensity 6100+',    refreshRate:90,  android:14, recommendedFPS:60, gyro:false, touchHz:90,  resolution:'2340×1080', perf:48 },
    { name:'iPhone 15 Pro Max',         brand:'Apple',   ram:8,  processor:'A17 Pro',            refreshRate:120, android:0,  recommendedFPS:90, gyro:true,  touchHz:240, resolution:'2796×1290', perf:99 },
    { name:'iPhone 15 Pro',             brand:'Apple',   ram:8,  processor:'A17 Pro',            refreshRate:120, android:0,  recommendedFPS:90, gyro:true,  touchHz:240, resolution:'2556×1179', perf:98 },
    { name:'iPhone 15',                 brand:'Apple',   ram:6,  processor:'A16 Bionic',         refreshRate:60,  android:0,  recommendedFPS:60, gyro:true,  touchHz:120, resolution:'2556×1179', perf:88 },
    { name:'iPhone 14 Pro Max',         brand:'Apple',   ram:6,  processor:'A16 Bionic',         refreshRate:120, android:0,  recommendedFPS:90, gyro:true,  touchHz:240, resolution:'2796×1290', perf:95 },
    { name:'iPhone 13 Pro',             brand:'Apple',   ram:6,  processor:'A15 Bionic',         refreshRate:120, android:0,  recommendedFPS:90, gyro:true,  touchHz:120, resolution:'2532×1170', perf:91 },
    { name:'Tecno Camon 20 Pro',        brand:'Tecno',   ram:8,  processor:'Dimensity 8050',     refreshRate:144, android:13, recommendedFPS:90, gyro:true,  touchHz:180, resolution:'2400×1080', perf:72 },
    { name:'Tecno Spark 20 Pro',        brand:'Tecno',   ram:8,  processor:'Helio G99',          refreshRate:120, android:13, recommendedFPS:60, gyro:false, touchHz:120, resolution:'2400×1080', perf:58 },
    { name:'Infinix GT 20 Pro',         brand:'Infinix', ram:12, processor:'Dimensity 8200 Ultimate', refreshRate:144, android:14, recommendedFPS:90, gyro:true, touchHz:240, resolution:'2400×1080', perf:78 },
    { name:'Infinix Note 40 Pro',       brand:'Infinix', ram:8,  processor:'Helio G99 Ultra',    refreshRate:120, android:14, recommendedFPS:60, gyro:true,  touchHz:120, resolution:'2400×1080', perf:62 },
    { name:'Redmi Note 13 Pro',         brand:'Redmi',   ram:12, processor:'Snapdragon 7s Gen 2', refreshRate:120, android:13, recommendedFPS:90, gyro:true, touchHz:240, resolution:'2712×1220', perf:76 },
    { name:'Redmi K70 Pro',             brand:'Redmi',   ram:16, processor:'Snapdragon 8 Gen 3', refreshRate:144, android:14, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'3200×1440', perf:96 },
    { name:'Poco X6 Pro',               brand:'Poco',    ram:12, processor:'Dimensity 8300 Ultra', refreshRate:120, android:14, recommendedFPS:90, gyro:true, touchHz:240, resolution:'2712×1220', perf:82 },
    { name:'Poco F6 Pro',               brand:'Poco',    ram:12, processor:'Snapdragon 8 Gen 2', refreshRate:120, android:14, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'3200×1440', perf:92 },
    { name:'Google Pixel 8 Pro',        brand:'Google',  ram:12, processor:'Google Tensor G3',   refreshRate:120, android:14, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'2992×1344', perf:89 },
    { name:'Realme GT Neo 6',           brand:'Realme',  ram:12, processor:'Snapdragon 8s Gen 3', refreshRate:144, android:14, recommendedFPS:90, gyro:true, touchHz:240, resolution:'2772×1240', perf:88 },
    { name:'Honor 90 Pro',              brand:'Honor',   ram:12, processor:'Snapdragon 8+ Gen 1', refreshRate:120, android:13, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'2664×1200', perf:85 },
    { name:'Huawei Nova 12',            brand:'Huawei',  ram:8,  processor:'Snapdragon 778G',    refreshRate:120, android:12, recommendedFPS:60, gyro:true,  touchHz:120, resolution:'2412×1080', perf:68 },
    { name:'Nothing Phone (2)',         brand:'Nothing', ram:12, processor:'Snapdragon 8+ Gen 1', refreshRate:120, android:13, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'2412×1080', perf:86 },
    { name:'OnePlus 12',                brand:'OnePlus', ram:16, processor:'Snapdragon 8 Gen 3', refreshRate:120, android:14, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'3168×1440', perf:96 },
    { name:'Vivo X100 Pro',             brand:'Vivo',    ram:16, processor:'Dimensity 9300',     refreshRate:120, android:14, recommendedFPS:90, gyro:true,  touchHz:300, resolution:'2800×1260', perf:95 },
    { name:'Oppo Find X7',              brand:'Oppo',    ram:16, processor:'Dimensity 9300',     refreshRate:120, android:14, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'2772×1240', perf:94 },
    { name:'ROG Phone 8 Pro',           brand:'Asus',    ram:24, processor:'Snapdragon 8 Gen 3', refreshRate:165, android:14, recommendedFPS:90, gyro:true,  touchHz:720, resolution:'2400×1080', perf:100 },
    { name:'Nubia Z60 Ultra',           brand:'Nubia',   ram:16, processor:'Snapdragon 8 Gen 3', refreshRate:144, android:14, recommendedFPS:90, gyro:true,  touchHz:240, resolution:'2480×1116', perf:97 },
  ];

  /* ═══════════════════════════════════════════════════════════════
   * §1  UTILITIES
   * ═══════════════════════════════════════════════════════════════ */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /** Seeded deterministic random (mulberry32) */
  function seededRand(seed) {
    let s = seed >>> 0;
    return () => {
      s += 0x6D2B79F5;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** Simple string → numeric seed */
  function strToSeed(str) {
    let h = 0xDEADBEEF;
    for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 0x9e3779b9);
    return h >>> 0;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi); }
  function round1(v) { return Math.round(v * 10) / 10; }
  function rand(lo, hi) { return lo + Math.random() * (hi - lo); }

  function lsGet(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }

  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ═══════════════════════════════════════════════════════════════
   * §2  SETTINGS STORE
   * ═══════════════════════════════════════════════════════════════ */

  let settings = lsGet(LS.SETTINGS, {
    theme: 'dark',
    sound: true,
    mute: false,
    whatsappJoined: false,
    codeUnlocked: false,
  });

  function saveSettings() { lsSet(LS.SETTINGS, settings); }

  /* ═══════════════════════════════════════════════════════════════
   * §3  THEME MANAGER
   * ═══════════════════════════════════════════════════════════════ */

  const ThemeManager = (() => {
    function apply(theme) {
      const root = document.documentElement;
      if (theme === 'system') {
        theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'orange';
      }
      root.setAttribute('data-theme', theme);
      root.className = theme === 'orange' ? 'theme-orange' : 'theme-dark';
    }

    function init() {
      apply(settings.theme);
      const btn = $('#theme-toggle');
      if (btn) btn.addEventListener('click', () => {
        const next = settings.theme === 'dark' ? 'orange' : 'dark';
        settings.theme = next;
        saveSettings();
        apply(next);
        SoundManager.play('click');
      });
      // System auto
      matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (settings.theme === 'system') apply('system');
      });
    }

    function set(theme) { settings.theme = theme; saveSettings(); apply(theme); }

    return { init, apply, set };
  })();

  /* ═══════════════════════════════════════════════════════════════
   * §4  SOUND MANAGER  (Web Audio API synthesis, no files)
   * ═══════════════════════════════════════════════════════════════ */

  const SoundManager = (() => {
    let ctx = null;

    function ensureCtx() {
      if (!ctx) {
        try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
      }
    }

    /**
     * Synthesis helpers
     */
    function beep(freq, type, dur, vol = 0.18, startDelay = 0) {
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = type;
      o.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);
      g.gain.setValueAtTime(0, ctx.currentTime + startDelay);
      g.gain.linearRampToValueAtTime(vol, ctx.currentTime + startDelay + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + dur);
      o.start(ctx.currentTime + startDelay);
      o.stop(ctx.currentTime + startDelay + dur + 0.05);
    }

    const sounds = {
      click:      () => { beep(880, 'sine', 0.07, 0.12); },
      success:    () => { beep(523, 'sine', 0.15, 0.15); beep(659, 'sine', 0.15, 0.15, 0.1); beep(784, 'sine', 0.2, 0.15, 0.2); },
      error:      () => { beep(300, 'sawtooth', 0.12, 0.12); beep(220, 'sawtooth', 0.18, 0.12, 0.15); },
      transition: () => { beep(600, 'sine', 0.12, 0.08); beep(750, 'sine', 0.1, 0.06, 0.08); },
      confetti:   () => {
        [1047, 1319, 1568, 2093].forEach((f, i) => beep(f, 'sine', 0.12, 0.1, i * 0.06));
      },
    };

    function play(name) {
      if (settings.mute) return;
      ensureCtx();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      sounds[name]?.();
    }

    function init() {
      const soundBtn = $('#sound-toggle');
      const muteBtn  = $('#mute-toggle');
      if (soundBtn) soundBtn.addEventListener('click', () => {
        settings.sound = !settings.sound;
        saveSettings();
        soundBtn.classList.toggle('active', settings.sound);
        play('click');
      });
      if (muteBtn) muteBtn.addEventListener('click', () => {
        settings.mute = !settings.mute;
        saveSettings();
        muteBtn.classList.toggle('active', settings.mute);
      });
    }

    return { play, init };
  })();

  /* ═══════════════════════════════════════════════════════════════
   * §5  TOAST SYSTEM
   * ═══════════════════════════════════════════════════════════════ */

  function showToast(message, type = 'info', duration = 2400) {
    const container = $('#toast-container');
    if (!container) return;
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.setAttribute('role', 'alert');
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    t.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span>
                   <span class="toast-msg">${message}</span>`;
    container.appendChild(t);
    requestAnimationFrame(() => t.classList.add('toast-visible'));
    setTimeout(() => {
      t.classList.remove('toast-visible');
      t.addEventListener('transitionend', () => t.remove(), { once: true });
    }, duration);
  }

  /* ═══════════════════════════════════════════════════════════════
   * §6  RIPPLE EFFECT
   * ═══════════════════════════════════════════════════════════════ */

  function addRippleListeners() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.ripple');
      if (!btn || reduced()) return;
      const r = document.createElement('span');
      r.className = 'ripple-wave';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(r);
      r.addEventListener('animationend', () => r.remove(), { once: true });
    });
  }

  /* ═══════════════════════════════════════════════════════════════
   * §7  SENSITIVITY ENGINE
   * ═══════════════════════════════════════════════════════════════ */

  /**
   * Formula explanation:
   *   base   = device.perf (0–100)
   *   Each sensitivity channel gets a style bias multiplier:
   *     Headshot  → Red Dot ×1.15, 2x ×1.10, General ×0.9
   *     Sniper    → 4x ×1.20, Sniper ×1.25, General ×0.85
   *     Rush      → Free Look ×1.20, General ×1.10
   *     Balanced  → all ×1.00
   *     Drag      → Free Look ×1.15, 2x ×1.10
   *   Finger bonus: each finger above 2 adds +1.5 to General & Free Look
   *   Gyro:   if ON, Gyroscope value = clamp(base * 0.85, 50, 95)
   *           if OFF, Gyroscope = 0
   *   Refresh bonus: (refreshRate - 60) / 120 * 5 added to all channels
   *   Seeded noise ±4 per channel for non-repetitiveness
   *   Final clamp: [10, 99]
   */
  function computeSensitivity(device, style, fingers, gyroOn) {
    const rng = seededRand(strToSeed(device.name + style + fingers + Date.now().toString().slice(0, 8)));
    const base = device.perf;
    const rfBonus = ((device.refreshRate - 60) / 120) * 5;

    const biases = {
      Headshot: { general: 0.88, redDot: 1.15, x2: 1.10, x4: 0.95, sniper: 0.85, freeLook: 0.92, gyro: 1.00 },
      Sniper:   { general: 0.82, redDot: 0.90, x2: 0.95, x4: 1.20, sniper: 1.25, freeLook: 0.88, gyro: 1.05 },
      Rush:     { general: 1.10, redDot: 1.00, x2: 0.95, x4: 0.88, sniper: 0.80, freeLook: 1.20, gyro: 0.90 },
      Balanced: { general: 1.00, redDot: 1.00, x2: 1.00, x4: 1.00, sniper: 1.00, freeLook: 1.00, gyro: 1.00 },
      Drag:     { general: 0.95, redDot: 1.05, x2: 1.10, x4: 0.95, sniper: 0.90, freeLook: 1.15, gyro: 1.00 },
    };
    const b = biases[style] || biases.Balanced;
    const fingerBonus = (parseInt(fingers) - 2) * 1.5;
    const noise = () => (rng() - 0.5) * 8;

    const ch = (key, extra = 0) =>
      clamp(Math.round(base * b[key] * 0.82 + rfBonus + extra + noise()), 10, 99);

    const general  = ch('general', fingerBonus);
    const redDot   = ch('redDot');
    const x2       = ch('x2');
    const x4       = ch('x4');
    const sniper   = ch('sniper');
    const freeLook = ch('freeLook', fingerBonus * 0.5);
    const gyro     = gyroOn ? clamp(Math.round(base * b.gyro * 0.82 + rfBonus + noise()), 50, 95) : 0;

    // Derived metrics
    const avgSens = (general + redDot + x2 + x4 + sniper + freeLook) / 6;
    const headshotAccuracy = clamp(Math.round(
      base * 0.6 +
      (style === 'Headshot' ? 18 : style === 'Sniper' ? 10 : 12) +
      rfBonus * 0.5 +
      (rng() - 0.3) * 6
    ), 40, 99);

    const aiRating = clamp(Math.round((base / 100) * 3.5 + (style === 'Balanced' ? 0.5 : 0.3) + rng() * 1.2 + 1) * 10 / 10, 1, 5);

    const fps = device.recommendedFPS;
    const graphics = base >= 90 ? 'Extreme HDR' : base >= 75 ? 'Ultra HD' : 'Smooth';

    return { general, redDot, x2, x4, sniper, freeLook, gyro,
             headshotAccuracy, aiRating, recommendedFPS: fps,
             recommendedGraphics: graphics, performanceScore: device.perf };
  }

  /* ═══════════════════════════════════════════════════════════════
   * §8  CONFETTI ENGINE
   * ═══════════════════════════════════════════════════════════════ */

  const Confetti = (() => {
    const COLORS = ['#FF7A18','#FF9A3C','#FFD700','#FFF','#FFA500','#FFB347','#FFFACD'];
    let canvas, ctx2, particles = [], raf = null, running = false;

    function initCanvas() {
      canvas = $('#confetti-canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'confetti-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
        document.body.appendChild(canvas);
      }
      ctx2 = canvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);
    }

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle(x, y) {
      return {
        x, y,
        vx: rand(-4, 4),
        vy: rand(-8, -2),
        rot: rand(0, Math.PI * 2),
        rotV: rand(-0.15, 0.15),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        w: rand(6, 12),
        h: rand(4, 8),
        alpha: 1,
      };
    }

    function loop() {
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.15;          // gravity
        p.rot += p.rotV;
        p.alpha -= 0.007;
        ctx2.save();
        ctx2.globalAlpha = Math.max(0, p.alpha);
        ctx2.translate(p.x, p.y);
        ctx2.rotate(p.rot);
        ctx2.fillStyle = p.color;
        ctx2.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx2.restore();
      });
      particles = particles.filter(p => p.alpha > 0 && p.y < canvas.height + 20);
      if (particles.length) raf = requestAnimationFrame(loop);
      else { ctx2.clearRect(0, 0, canvas.width, canvas.height); running = false; }
    }

    function fire(count = 120, cx = window.innerWidth / 2, cy = window.innerHeight * 0.4) {
      if (reduced()) return;
      if (!canvas) initCanvas();
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(cx + rand(-60, 60), cy + rand(-20, 20)));
      }
      if (!running) { running = true; raf = requestAnimationFrame(loop); }
      SoundManager.play('confetti');
    }

    function burst(el) {
      if (!el) { fire(); return; }
      const rect = el.getBoundingClientRect();
      fire(150, rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    return { fire, burst, initCanvas };
  })();

  /* ═══════════════════════════════════════════════════════════════
   * §9  PNG EXPORT
   * PNG export approach:
   *   1. Build an SVG string describing the result card layout
   *      (device name, perf ring, sensitivity bars, brand/footer).
   *   2. Encode to a data-URI or Blob URL.
   *   3. Draw onto an offscreen <canvas> at 2× resolution for sharpness.
   *   4. canvas.toDataURL('image/png') → trigger <a download>.
   * ═══════════════════════════════════════════════════════════════ */

  function exportReportToPNG(device, result, style, fingers, gyroOn) {
    const W = 640, H = 820, scale = 2;
    const sens = [
      { label:'General',   val: result.general },
      { label:'Red Dot',   val: result.redDot },
      { label:'2× Scope',  val: result.x2 },
      { label:'4× Scope',  val: result.x4 },
      { label:'Sniper',    val: result.sniper },
      { label:'Free Look', val: result.freeLook },
      { label:'Gyroscope', val: result.gyro },
    ];

    const barMaxW = 280;
    const barsY = 380;
    const barH = 26;
    const barGap = 14;

    let barsHTML = sens.map((s, i) => {
      const bw = Math.round((s.val / 100) * barMaxW);
      const y = barsY + i * (barH + barGap);
      return `
        <text x="50" y="${y + barH - 8}" fill="#ccc" font-size="13" font-family="monospace">${s.label}</text>
        <rect x="160" y="${y}" width="${bw}" height="${barH}" rx="6" fill="#FF7A18" opacity="0.9"/>
        <text x="${165 + bw}" y="${y + barH - 8}" fill="#f5f5f5" font-size="13" font-family="monospace">${s.val}</text>`;
    }).join('');

    const stars = '★'.repeat(Math.round(result.aiRating)) + '☆'.repeat(5 - Math.round(result.aiRating));
    const circumference = 2 * Math.PI * 48;
    const perfOffset = circumference - (result.performanceScore / 100) * circumference;
    const accOffset  = circumference - (result.headshotAccuracy / 100) * circumference;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0d0d0d"/>
          <stop offset="100%" stop-color="#050505"/>
        </linearGradient>
        <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FF7A18"/>
          <stop offset="100%" stop-color="#FF9A3C"/>
        </linearGradient>
      </defs>
      <!-- Background -->
      <rect width="${W}" height="${H}" fill="url(#bg)" rx="0"/>
      <!-- Header -->
      <rect x="0" y="0" width="${W}" height="70" fill="#111" opacity="0.9"/>
      <text x="32" y="44" fill="#FF7A18" font-size="22" font-weight="bold" font-family="sans-serif">ZEUS SENSI AI v6.0</text>
      <text x="${W - 32}" y="44" fill="#888" font-size="13" font-family="sans-serif" text-anchor="end">Generated Report</text>
      <!-- Device -->
      <text x="32" y="108" fill="#f5f5f5" font-size="20" font-weight="bold" font-family="sans-serif">${device.name}</text>
      <text x="32" y="132" fill="#FF9A3C" font-size="13" font-family="monospace">Style: ${style} | Fingers: ${fingers} | Gyro: ${gyroOn ? 'ON' : 'OFF'}</text>
      <!-- Perf ring -->
      <circle cx="110" cy="230" r="48" fill="none" stroke="#222" stroke-width="10"/>
      <circle cx="110" cy="230" r="48" fill="none" stroke="#FF7A18" stroke-width="10"
        stroke-dasharray="${circumference}" stroke-dashoffset="${perfOffset}"
        stroke-linecap="round" transform="rotate(-90 110 230)"/>
      <text x="110" y="225" fill="#f5f5f5" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">${result.performanceScore}</text>
      <text x="110" y="245" fill="#888" font-size="11" text-anchor="middle" font-family="sans-serif">PERF</text>
      <!-- Accuracy ring -->
      <circle cx="270" cy="230" r="48" fill="none" stroke="#222" stroke-width="10"/>
      <circle cx="270" cy="230" r="48" fill="none" stroke="#FF9A3C" stroke-width="10"
        stroke-dasharray="${circumference}" stroke-dashoffset="${accOffset}"
        stroke-linecap="round" transform="rotate(-90 270 230)"/>
      <text x="270" y="225" fill="#f5f5f5" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">${result.headshotAccuracy}%</text>
      <text x="270" y="245" fill="#888" font-size="11" text-anchor="middle" font-family="sans-serif">ACCURACY</text>
      <!-- Stars -->
      <text x="430" y="220" fill="#FFD700" font-size="26" font-family="sans-serif">${stars}</text>
      <text x="432" y="248" fill="#888" font-size="12" font-family="sans-serif">AI Rating</text>
      <!-- Sensitivity bars -->
      <text x="50" y="${barsY - 16}" fill="#FF7A18" font-size="15" font-weight="bold" font-family="sans-serif">Sensitivity Settings</text>
      ${barsHTML}
      <!-- Footer -->
      <rect x="0" y="${H - 54}" width="${W}" height="54" fill="#0a0a0a"/>
      <text x="32" y="${H - 22}" fill="#555" font-size="11" font-family="monospace">FPS: ${result.recommendedFPS} | Graphics: ${result.recommendedGraphics} | zeussensi.app</text>
      <text x="${W - 32}" y="${H - 22}" fill="#FF7A18" font-size="11" font-family="monospace" text-anchor="end">ZEUS SENSI AI</text>
    </svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const img  = new Image();
    img.onload = () => {
      const oc = document.createElement('canvas');
      oc.width  = W * scale;
      oc.height = H * scale;
      const oc2 = oc.getContext('2d');
      oc2.scale(scale, scale);
      oc2.drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.href     = oc.toDataURL('image/png');
      a.download = `zeus-sensi-${device.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click();
      showToast('PNG downloaded!', 'success');
    };
    img.onerror = () => showToast('Export failed', 'error');
    img.src = url;
  }

  /* ═══════════════════════════════════════════════════════════════
   * §10 HISTORY & FAVORITES
   * ═══════════════════════════════════════════════════════════════ */

  const Store = (() => {
    function getHistory()   { return lsGet(LS.HISTORY, []); }
    function getFavs()      { return lsGet(LS.FAVORITES, []); }

    function addToHistory(entry) {
      const h = getHistory();
      h.unshift({ ...entry, id: Date.now(), date: new Date().toLocaleString() });
      if (h.length > 30) h.length = 30;
      lsSet(LS.HISTORY, h);
    }

    function toggleFav(id) {
      const favs = getFavs();
      const h    = getHistory();
      const entry = h.find(x => x.id === id);
      if (!entry) return false;
      const idx = favs.findIndex(x => x.id === id);
      if (idx === -1) { favs.push(entry); lsSet(LS.FAVORITES, favs); return true; }
      favs.splice(idx, 1); lsSet(LS.FAVORITES, favs); return false;
    }

    function isFav(id) { return getFavs().some(x => x.id === id); }
    function clearHistory() { lsSet(LS.HISTORY, []); }
    function clearFavs()    { lsSet(LS.FAVORITES, []); }
    function deleteHistory(id) { lsSet(LS.HISTORY, getHistory().filter(x => x.id !== id)); }
    function deleteFav(id)     { lsSet(LS.FAVORITES, getFavs().filter(x => x.id !== id)); }

    return { getHistory, getFavs, addToHistory, toggleFav, isFav,
             clearHistory, clearFavs, deleteHistory, deleteFav };
  })();

  /* ═══════════════════════════════════════════════════════════════
   * §11  LANDING PAGE MODULES  (index.html only)
   * ═══════════════════════════════════════════════════════════════ */

  function initLanding() {
    initParticles();
    initMouseGlow();
    initScrollReveal();
    addRippleListeners();
    ThemeManager.init();
    SoundManager.init();
    initOfflineDetection();
    initNavCta();
  }

  /* ── Particles ── */
  function initParticles() {
    const canvas = $('#particles');
    if (!canvas || reduced()) return;
    const ctx = canvas.getContext('2d');
    const pts = [];

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 40; i++) pts.push({
      x: rand(0, canvas.width),
      y: rand(0, canvas.height),
      r: rand(1.5, 3.5),
      vx: rand(-0.3, 0.3),
      vy: rand(-0.3, 0.3),
      alpha: rand(0.3, 0.8),
    });

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      // Lines between nearby particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,122,24,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,154,60,${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ── Mouse glow ── */
  function initMouseGlow() {
    const glow = $('#mouse-glow');
    if (!glow || reduced()) return;
    document.addEventListener('mousemove', (e) => {
      glow.style.setProperty('--mx', `${e.clientX}px`);
      glow.style.setProperty('--my', `${e.clientY}px`);
      glow.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    });
  }

  /* ── Scroll reveal ── */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => obs.observe(el));
  }

  /* ── Nav CTA ── */
  function initNavCta() {
    const btn = $('#nav-cta');
    if (btn) btn.addEventListener('click', () => SoundManager.play('click'));
  }

  /* ═══════════════════════════════════════════════════════════════
   * §12  WIZARD PAGE  (FF SENSITIVITY.html)
   * ═══════════════════════════════════════════════════════════════ */

  function initWizard() {
    addRippleListeners();
    ThemeManager.init();
    SoundManager.init();
    Confetti.initCanvas();
    initScrollReveal();
    initOfflineDetection();

    // Wizard state
    const state = {
      step: 0,
      device: null,
      style: null,
      fingers: null,
      gyroOn: null,
      result: null,
      currentId: null,
    };

    const steps = [
      '#whatsapp-step',
      '#code-step',
      '#device-step',
      '#settings-step',
      '#analysis-step',
      '#result-step',
    ];

    /* ── Step transitions ── */
    function showStep(idx) {
      steps.forEach((sel, i) => {
        const el = $(sel);
        if (!el) return;
        if (i === idx) {
          el.style.display = '';
          requestAnimationFrame(() => el.classList.add('step-active'));
        } else {
          el.classList.remove('step-active');
          el.style.display = 'none';
        }
      });
      updateStepIndicators(idx);
    }

    function updateStepIndicators(idx) {
      $$('.step-indicator .step-dot').forEach((dot, i) => {
        dot.classList.toggle('active',   i === idx);
        dot.classList.toggle('complete', i < idx);
      });
    }

    function goTo(idx) {
      if (idx < 0 || idx >= steps.length) return;
      SoundManager.play('transition');
      const prev = $(steps[state.step]);
      if (prev && !reduced()) {
        prev.style.filter = 'blur(8px)';
        prev.style.opacity = '0';
        setTimeout(() => {
          prev.style.filter = '';
          prev.style.opacity = '';
          state.step = idx;
          showStep(idx);
          const next = $(steps[idx]);
          if (next) {
            next.style.filter = 'blur(8px)';
            next.style.opacity = '0';
            requestAnimationFrame(() => {
              next.style.transition = 'filter 0.35s, opacity 0.35s';
              next.style.filter = '';
              next.style.opacity = '';
              setTimeout(() => { next.style.transition = ''; }, 400);
            });
          }
        }, 200);
      } else {
        state.step = idx;
        showStep(idx);
      }
    }

    /* ── §12A  WhatsApp gate ── */
    function initWhatsApp() {
      const joinBtn = $('#join-wa-btn');
      const contBtn = $('#wa-continue-btn');
      if (!joinBtn) return;

      if (settings.whatsappJoined && contBtn) contBtn.classList.remove('hidden');

      joinBtn.addEventListener('click', () => {
        SoundManager.play('click');
        window.open(WA_CHANNEL, '_blank', 'noopener');
        settings.whatsappJoined = true;
        saveSettings();
        if (contBtn) contBtn.classList.remove('hidden');
      });
      if (contBtn) contBtn.addEventListener('click', () => {
        if (!settings.whatsappJoined) { showToast('Please join the channel first.', 'error'); return; }
        goTo(1);
      });
    }

    /* ── §12B  Access code ── */
    function initCodeStep() {
      const inputs = $$('#pin-inputs input');
      const errEl  = $('#code-error');
      const verifyBtn = $('#verify-code-btn');
      if (!inputs.length) return;

      inputs.forEach((inp, idx) => {
        inp.addEventListener('input', (e) => {
          const v = e.target.value.replace(/\D/g, '');
          e.target.value = v.slice(-1);
          if (v && idx < inputs.length - 1) inputs[idx + 1].focus();
        });
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !inp.value && idx > 0) inputs[idx - 1].focus();
        });
        inp.addEventListener('paste', (e) => {
          e.preventDefault();
          const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
          if (text.length === 4) {
            inputs.forEach((i2, j) => { i2.value = text[j] || ''; });
            inputs[3].focus();
          }
        });
      });

      function checkCode() {
        const code = inputs.map(i => i.value).join('');
        if (code.length < 4) { showToast('Enter all 4 digits', 'error'); return; }
        if (code === PIN) {
          inputs.forEach(i => {
            i.style.borderColor = 'var(--success)';
            i.style.boxShadow   = '0 0 8px var(--success)';
          });
          SoundManager.play('success');
          settings.codeUnlocked = true;
          saveSettings();
          if (errEl) errEl.textContent = '';
          setTimeout(() => goTo(2), 400);
        } else {
          SoundManager.play('error');
          if (errEl) errEl.textContent = 'Wrong Access Code';
          const pinBox = $('#pin-inputs');
          if (pinBox) {
            pinBox.classList.add('shake');
            pinBox.addEventListener('animationend', () => pinBox.classList.remove('shake'), { once: true });
          }
          inputs.forEach(i => {
            i.style.borderColor = 'var(--danger)';
            i.style.boxShadow   = '0 0 8px var(--danger)';
            setTimeout(() => { i.style.borderColor = ''; i.style.boxShadow = ''; }, 1000);
          });
        }
      }

      if (verifyBtn) verifyBtn.addEventListener('click', () => { SoundManager.play('click'); checkCode(); });
      inputs.forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') checkCode(); }));
    }

    /* ── §12C  Device search ── */
    function initDeviceSearch() {
      const input    = $('#device-search');
      const sugBox   = $('#device-suggestions');
      const infoBox  = $('#device-info');
      const nextBtn  = $('#device-next-btn');
      if (!input) return;

      let debTimer = null, highlightIdx = -1, matchList = [];

      function fuzzyMatch(query) {
        const q = query.toLowerCase();
        return DEVICES
          .filter(d => d.name.toLowerCase().includes(q) || d.brand.toLowerCase().includes(q))
          .sort((a, b) => {
            const aB = a.brand.toLowerCase().startsWith(q) ? -1 : 0;
            const bB = b.brand.toLowerCase().startsWith(q) ? -1 : 0;
            return aB - bB || a.name.localeCompare(b.name);
          })
          .slice(0, 8);
      }

      function renderSuggestions(list) {
        if (!sugBox) return;
        sugBox.innerHTML = '';
        matchList = list;
        highlightIdx = -1;
        if (!list.length) { sugBox.style.display = 'none'; return; }
        list.forEach((d, i) => {
          const li = document.createElement('li');
          li.className = 'device-suggestion-item';
          li.dataset.idx = i;
          li.innerHTML = `<span class="sug-name">${d.name}</span><span class="sug-meta">${d.processor} · ${d.refreshRate}Hz</span>`;
          li.addEventListener('mousedown', (e) => { e.preventDefault(); selectDevice(i); });
          li.addEventListener('touchstart', (e) => { e.preventDefault(); selectDevice(i); });
          sugBox.appendChild(li);
        });
        sugBox.style.display = 'block';
      }

      function highlight(idx) {
        const items = $$('.device-suggestion-item', sugBox);
        items.forEach(li => li.classList.remove('highlighted'));
        if (idx >= 0 && items[idx]) items[idx].classList.add('highlighted');
        highlightIdx = idx;
      }

      function selectDevice(idx) {
        const dev = matchList[idx];
        if (!dev) return;
        state.device = dev;
        input.value  = dev.name;
        sugBox.style.display = 'none';
        SoundManager.play('click');
        renderDeviceInfo(dev);
      }

      function renderDeviceInfo(dev) {
        if (!infoBox) return;
        infoBox.innerHTML = `
          <div class="device-chip">✓ Selected: ${dev.name}</div>
          <div class="device-specs-grid">
            <span>🔧 ${dev.processor}</span>
            <span>💾 ${dev.ram}GB RAM</span>
            <span>⚡ ${dev.refreshRate}Hz</span>
            <span>📱 Android ${dev.android || 'iOS'}</span>
            <span>🎯 ${dev.touchHz}Hz Touch</span>
            <span>📺 ${dev.resolution}</span>
            <span>🎮 FPS: ${dev.recommendedFPS}</span>
            <span>🔄 Gyro: ${dev.gyro ? 'Yes' : 'No'}</span>
          </div>
          <div class="perf-badge">Performance Score: <strong>${dev.perf}/100</strong></div>`;
        infoBox.style.display = 'block';
      }

      input.addEventListener('input', () => {
        clearTimeout(debTimer);
        debTimer = setTimeout(() => {
          const q = input.value.trim();
          if (q.length < 1) { sugBox.style.display = 'none'; return; }
          renderSuggestions(fuzzyMatch(q));
        }, 80);
      });

      input.addEventListener('keydown', (e) => {
        const items = matchList;
        if (e.key === 'ArrowDown') { e.preventDefault(); highlight(Math.min(highlightIdx + 1, items.length - 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(highlightIdx - 1, 0)); }
        else if (e.key === 'Enter')  { e.preventDefault(); if (highlightIdx >= 0) selectDevice(highlightIdx); }
        else if (e.key === 'Escape') { sugBox.style.display = 'none'; }
      });

      document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !sugBox.contains(e.target)) sugBox.style.display = 'none';
      });

      if (nextBtn) nextBtn.addEventListener('click', () => {
        if (!state.device) { showToast('Please select a device first.', 'error'); SoundManager.play('error'); return; }
        SoundManager.play('click');
        goTo(3);
      });
    }

    /* ── §12D  Player settings ── */
    function initSettings() {
      function pillGroup(containerId, key) {
        const container = $(`#${containerId}`);
        if (!container) return;
        $$('.pill-toggle', container).forEach(pill => {
          pill.addEventListener('click', () => {
            $$('.pill-toggle', container).forEach(p => p.classList.remove('selected'));
            pill.classList.add('selected');
            state[key] = pill.dataset.value;
            SoundManager.play('click');
          });
          // Pre-select first
          if (!state[key]) { pill.classList.add('selected'); state[key] = pill.dataset.value; }
        });
      }
      pillGroup('style-pills', 'style');
      pillGroup('finger-pills', 'fingers');
      pillGroup('gyro-pills', 'gyroOn');

      const nextBtn = $('#settings-next-btn');
      if (nextBtn) nextBtn.addEventListener('click', () => {
        if (!state.style || !state.fingers || state.gyroOn === null) {
          showToast('Please select all settings.', 'error'); SoundManager.play('error'); return;
        }
        state.gyroOn = state.gyroOn === 'on' || state.gyroOn === true;
        SoundManager.play('click');
        goTo(4);
        startAnalysis();
      });
    }

    /* ── §12E  AI Analysis runner ── */
    const ANALYSIS_STEPS = [
      { label: 'Scanning device hardware profile…', ms: 400 },
      { label: 'Loading neural sensitivity model…', ms: 500 },
      { label: 'Calibrating touch response matrix…', ms: 500 },
      { label: 'Processing refresh rate coefficients…', ms: 500 },
      { label: 'Applying style bias algorithms…', ms: 500 },
      { label: 'Optimizing finger configuration…', ms: 500 },
      { label: 'Gyroscope compensation layer…', ms: 500 },
      { label: 'Computing headshot accuracy metric…', ms: 500 },
      { label: 'Finalising FPS & graphics profile…', ms: 500 },
      { label: 'Generating AI sensitivity output…', ms: 600 },
    ];

    function startAnalysis() {
      const stepsEl = $('#analysis-steps');
      const logEl   = $('#analysis-log');
      const fillEl  = $('#progress-fill');
      const pctEl   = $('#progress-pct');
      if (stepsEl) stepsEl.innerHTML = '';
      if (logEl)   logEl.innerHTML   = '';

      let accumulated = 0;
      const total = ANALYSIS_STEPS.reduce((s, x) => s + x.ms, 0) + 300;

      ANALYSIS_STEPS.forEach((step, i) => {
        accumulated += step.ms;
        setTimeout(() => {
          // Add step item
          if (stepsEl) {
            const li = document.createElement('div');
            li.className = 'analysis-step-item';
            li.innerHTML = `<span class="check-icon">✓</span> ${step.label}`;
            stepsEl.appendChild(li);
            requestAnimationFrame(() => li.classList.add('step-in'));
          }
          // Log entry
          if (logEl) {
            const now = new Date();
            const ts  = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
            const line = document.createElement('div');
            line.className = 'log-line';
            line.textContent = `[${ts}] ${step.label}`;
            logEl.appendChild(line);
            logEl.scrollTop = logEl.scrollHeight;
          }
          // Progress
          const pct = Math.round(((i + 1) / ANALYSIS_STEPS.length) * 100);
          if (fillEl) fillEl.style.width = `${pct}%`;
          if (pctEl)  pctEl.textContent  = `${pct}%`;
          SoundManager.play('transition');
        }, accumulated - step.ms);
      });

      // Finish
      setTimeout(() => {
        state.result = computeSensitivity(
          state.device, state.style, state.fingers,
          state.gyroOn === true || state.gyroOn === 'on'
        );
        state.currentId = Date.now();
        const entry = {
          id:      state.currentId,
          device:  state.device,
          style:   state.style,
          fingers: state.fingers,
          gyroOn:  state.gyroOn,
          result:  state.result,
        };
        Store.addToHistory(entry);
        lsSet(LS.CURRENT, entry);
        Confetti.fire();
        SoundManager.play('success');
        setTimeout(() => goTo(5), 300);
        setTimeout(() => renderResults(), 350);
      }, total);
    }

    /* ── §12F  Results rendering ── */
    function renderResults() {
      const { device, result, style, fingers, gyroOn } = state;
      if (!result) return;

      setText('#result-device',   device.name);
      setText('#result-score',    result.performanceScore);
      setText('#result-accuracy', result.headshotAccuracy + '%');
      setText('#result-fps',      result.recommendedFPS + ' FPS');
      setText('#result-graphics', result.recommendedGraphics);

      // Stars
      const starsEl = $('#result-stars');
      if (starsEl) {
        const full  = Math.round(result.aiRating);
        starsEl.innerHTML = '★'.repeat(full) + '<span class="empty-star">☆</span>'.repeat(5 - full);
      }

      // Circular progress rings (animated SVG)
      animateCircularProgress('#perf-ring',   result.performanceScore);
      animateCircularProgress('#acc-ring',    result.headshotAccuracy);

      // Sensitivity list
      const sensData = [
        { key:'General',   val: result.general },
        { key:'Red Dot',   val: result.redDot },
        { key:'2× Scope',  val: result.x2 },
        { key:'4× Scope',  val: result.x4 },
        { key:'Sniper',    val: result.sniper },
        { key:'Free Look', val: result.freeLook },
        { key:'Gyroscope', val: result.gyro },
      ];

      const listEl = $('#result-sens-list');
      if (listEl) {
        listEl.innerHTML = sensData.map(s => `
          <div class="sens-row">
            <span class="sens-key">${s.key}</span>
            <div class="sens-bar-wrap">
              <div class="sens-bar" style="width:0%" data-target="${s.val}"></div>
            </div>
            <span class="sens-val">${s.val}</span>
            <button class="btn-copy-single ripple" data-copy="${s.key}: ${s.val}" aria-label="Copy ${s.key}">⧉</button>
          </div>`).join('');
        // Animate bars
        requestAnimationFrame(() => {
          $$('.sens-bar', listEl).forEach(bar => {
            const target = bar.dataset.target;
            bar.style.transition = 'width 0.8s cubic-bezier(.4,0,.2,1)';
            bar.style.width = `${target}%`;
          });
        });
        // Individual copy
        $$('.btn-copy-single', listEl).forEach(btn => {
          btn.addEventListener('click', () => {
            navigator.clipboard?.writeText(btn.dataset.copy)
              .then(() => showToast('Copied!', 'success', 1500))
              .catch(() => {});
            SoundManager.play('click');
          });
        });
      }

      // Copy all button
      const copyBtn = $('#copy-btn');
      if (copyBtn) copyBtn.addEventListener('click', () => {
        const text = buildSensText(device, result, style, fingers, gyroOn);
        navigator.clipboard?.writeText(text)
          .then(() => { showToast('Copied to clipboard', 'success'); SoundManager.play('success'); })
          .catch(() => showToast('Copy failed', 'error'));
      });

      // Download PNG
      const dlBtn = $('#download-png');
      if (dlBtn) dlBtn.addEventListener('click', () => {
        SoundManager.play('click');
        exportReportToPNG(device, result, style, fingers, gyroOn);
      });

      // Favorites
      const favBtn = $('#fav-btn');
      if (favBtn) {
        const updateFavBtn = () => {
          const starred = Store.isFav(state.currentId);
          favBtn.textContent = starred ? '★ Saved' : '☆ Save to Favorites';
          favBtn.classList.toggle('fav-active', starred);
        };
        updateFavBtn();
        favBtn.addEventListener('click', () => {
          const now = Store.toggleFav(state.currentId);
          updateFavBtn();
          showToast(now ? 'Added to favorites!' : 'Removed from favorites', now ? 'success' : 'info');
          SoundManager.play(now ? 'success' : 'click');
        });
      }

      // Regenerate
      const regenBtn = $('#regen-btn');
      if (regenBtn) regenBtn.addEventListener('click', () => {
        SoundManager.play('click');
        goTo(2); // back to device selection
      });

      // Support popup
      initSupportPopup();

      // History / Favorites drawers
      initHistoryDrawer();
      initFavsDrawer();
      initCompareModal();
    }

    function setText(sel, val) {
      const el = $(sel);
      if (el) el.textContent = val;
    }

    function buildSensText(device, result, style, fingers, gyroOn) {
      return [
        `╔══ ZEUS SENSI AI v6.0 ══╗`,
        `Device  : ${device.name}`,
        `Style   : ${style} | Fingers: ${fingers} | Gyro: ${gyroOn ? 'ON' : 'OFF'}`,
        `Performance Score: ${result.performanceScore}/100`,
        `Headshot Accuracy: ${result.headshotAccuracy}%`,
        `AI Rating: ${'★'.repeat(Math.round(result.aiRating))}`,
        ``,
        `── Sensitivity Settings ──`,
        `General   : ${result.general}`,
        `Red Dot   : ${result.redDot}`,
        `2× Scope  : ${result.x2}`,
        `4× Scope  : ${result.x4}`,
        `Sniper    : ${result.sniper}`,
        `Free Look : ${result.freeLook}`,
        `Gyroscope : ${result.gyro}`,
        ``,
        `FPS: ${result.recommendedFPS} | Graphics: ${result.recommendedGraphics}`,
        `╚══ zeussensi.app ════════╝`,
      ].join('\n');
    }

    function animateCircularProgress(sel, value) {
      const el = $(sel);
      if (!el) return;
      const circle = el.querySelector('.progress-ring-fill');
      if (!circle) return;
      const r = parseFloat(circle.getAttribute('r') || 48);
      const circ = 2 * Math.PI * r;
      circle.style.strokeDasharray  = circ;
      circle.style.strokeDashoffset = circ;
      if (reduced()) { circle.style.strokeDashoffset = circ - (value / 100) * circ; return; }
      requestAnimationFrame(() => {
        circle.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)';
        circle.style.strokeDashoffset = circ - (value / 100) * circ;
      });
    }

    /* ── §12G  Support Popup ── */
    function initSupportPopup() {
      const btn   = $('#support-btn');
      const popup = $('#support-popup');
      if (!btn || !popup) return;

      const closeBtn = popup.querySelector('.popup-close');
      const waLink   = popup.querySelector('.wa-support-link');
      const joinBtn2 = popup.querySelector('.join-wa-btn2');

      if (waLink)   waLink.href = WA_SUPPORT;
      if (joinBtn2) joinBtn2.addEventListener('click', () => {
        window.open(WA_CHANNEL, '_blank', 'noopener');
        SoundManager.play('click');
      });

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        SoundManager.play('click');
        popup.classList.toggle('popup-open');
      });
      if (closeBtn) closeBtn.addEventListener('click', () => popup.classList.remove('popup-open'));
      document.addEventListener('click', (e) => {
        if (!popup.contains(e.target) && e.target !== btn) popup.classList.remove('popup-open');
      });
    }

    /* ── §12H  History drawer ── */
    function initHistoryDrawer() {
      const drawer  = $('#history-drawer');
      const openBtn = $('#open-history-btn');
      const closeBtn = drawer?.querySelector('.drawer-close');
      const listEl   = drawer?.querySelector('.drawer-list');
      const clearBtn = drawer?.querySelector('.drawer-clear');
      if (!drawer) return;

      function renderHistory() {
        const h = Store.getHistory();
        if (!listEl) return;
        if (!h.length) { listEl.innerHTML = '<p class="drawer-empty">No history yet.</p>'; return; }
        listEl.innerHTML = h.map(entry => `
          <div class="drawer-item" data-id="${entry.id}">
            <div class="drawer-item-main">
              <strong>${entry.device?.name || 'Unknown'}</strong>
              <span class="drawer-meta">${entry.date} · ${entry.style}</span>
              <div class="drawer-mini-bars">${miniBarsSVG(entry.result)}</div>
            </div>
            <button class="drawer-del ripple" data-id="${entry.id}" aria-label="Delete">✕</button>
          </div>`).join('');
        listEl.querySelectorAll('.drawer-del').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            Store.deleteHistory(parseInt(btn.dataset.id));
            renderHistory();
            SoundManager.play('click');
          });
        });
        listEl.querySelectorAll('.drawer-item-main').forEach(item => {
          item.addEventListener('click', () => {
            const id = parseInt(item.closest('.drawer-item').dataset.id);
            const entry = Store.getHistory().find(x => x.id === id);
            if (!entry) return;
            state.device = entry.device;
            state.style  = entry.style;
            state.fingers = entry.fingers;
            state.gyroOn  = entry.gyroOn;
            state.result  = entry.result;
            state.currentId = entry.id;
            closeDrawer(drawer);
            goTo(5);
            setTimeout(() => renderResults(), 200);
          });
        });
      }

      if (openBtn) openBtn.addEventListener('click', () => { SoundManager.play('click'); openDrawer(drawer); renderHistory(); });
      if (closeBtn) closeBtn.addEventListener('click', () => closeDrawer(drawer));
      if (clearBtn) clearBtn.addEventListener('click', () => { Store.clearHistory(); renderHistory(); SoundManager.play('click'); });
      drawer.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(drawer); });
    }

    /* ── §12I  Favorites drawer ── */
    function initFavsDrawer() {
      const drawer   = $('#fav-drawer');
      const openBtn  = $('#open-favs-btn');
      const closeBtn = drawer?.querySelector('.drawer-close');
      const listEl   = drawer?.querySelector('.drawer-list');
      const clearBtn = drawer?.querySelector('.drawer-clear');
      if (!drawer) return;

      function renderFavs() {
        const favs = Store.getFavs();
        if (!listEl) return;
        if (!favs.length) { listEl.innerHTML = '<p class="drawer-empty">No favorites yet.</p>'; return; }
        listEl.innerHTML = favs.map(entry => `
          <div class="drawer-item" data-id="${entry.id}">
            <div class="drawer-item-main">
              <strong>${entry.device?.name || 'Unknown'}</strong>
              <span class="drawer-meta">${entry.date} · ${entry.style}</span>
              <div class="drawer-mini-bars">${miniBarsSVG(entry.result)}</div>
            </div>
            <button class="drawer-del ripple" data-id="${entry.id}" aria-label="Remove">✕</button>
          </div>`).join('');
        listEl.querySelectorAll('.drawer-del').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            Store.deleteFav(parseInt(btn.dataset.id));
            renderFavs();
            SoundManager.play('click');
          });
        });
      }

      if (openBtn) openBtn.addEventListener('click', () => { SoundManager.play('click'); openDrawer(drawer); renderFavs(); });
      if (closeBtn) closeBtn.addEventListener('click', () => closeDrawer(drawer));
      if (clearBtn) clearBtn.addEventListener('click', () => { Store.clearFavs(); renderFavs(); SoundManager.play('click'); });
      drawer.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(drawer); });
    }

    function openDrawer(el)  { el?.classList.add('drawer-open'); }
    function closeDrawer(el) { el?.classList.remove('drawer-open'); }

    function miniBarsSVG(result) {
      if (!result) return '';
      const vals = [result.general, result.redDot, result.x2, result.x4, result.sniper, result.freeLook];
      return vals.map(v => `<span class="mini-bar" style="height:${Math.round(v * 0.24)}px" title="${v}"></span>`).join('');
    }

    /* ── §12J  Compare modal ── */
    function initCompareModal() {
      const modal    = $('#compare-modal');
      const openBtn  = $('#open-compare-btn');
      const closeBtn = modal?.querySelector('.modal-close');
      if (!modal) return;

      const allEntries = () => [...Store.getHistory(), ...Store.getFavs()].reduce((acc, e) => {
        if (!acc.find(x => x.id === e.id)) acc.push(e);
        return acc;
      }, []);

      function renderModal() {
        const entries = allEntries();
        const selA = modal.querySelector('#compare-sel-a');
        const selB = modal.querySelector('#compare-sel-b');
        if (!selA || !selB) return;
        const opts = entries.map(e => `<option value="${e.id}">${e.device?.name || 'Unknown'}</option>`).join('');
        selA.innerHTML = '<option value="">-- Select --</option>' + opts;
        selB.innerHTML = '<option value="">-- Select --</option>' + opts;

        function update() {
          const eA = entries.find(x => x.id === parseInt(selA.value));
          const eB = entries.find(x => x.id === parseInt(selB.value));
          const tableEl = modal.querySelector('.compare-table');
          if (!tableEl) return;
          if (!eA || !eB) { tableEl.innerHTML = ''; return; }

          const keys = [
            ['Performance', 'performanceScore'],
            ['Headshot %',  'headshotAccuracy'],
            ['General',     'general'],
            ['Red Dot',     'redDot'],
            ['2× Scope',    'x2'],
            ['4× Scope',    'x4'],
            ['Sniper',      'sniper'],
            ['Free Look',   'freeLook'],
            ['Gyroscope',   'gyro'],
          ];
          tableEl.innerHTML = `
            <div class="cmp-header"><span>${eA.device?.name}</span><span>Δ</span><span>${eB.device?.name}</span></div>
            ${keys.map(([label, key]) => {
              const vA = eA.result?.[key] ?? 0;
              const vB = eB.result?.[key] ?? 0;
              const d  = vA - vB;
              const dStr = d > 0 ? `+${d}` : `${d}`;
              const cls  = d > 0 ? 'delta-pos' : d < 0 ? 'delta-neg' : 'delta-zero';
              return `<div class="cmp-row"><span>${vA}</span><span class="${cls}">${label}: ${dStr}</span><span>${vB}</span></div>`;
            }).join('')}`;
        }
        selA.addEventListener('change', update);
        selB.addEventListener('change', update);
      }

      if (openBtn) openBtn.addEventListener('click', () => {
        SoundManager.play('click');
        modal.classList.add('modal-open');
        renderModal();
      });
      if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('modal-open'));
      modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('modal-open'); });
    }

    /* ── Boot wizard ── */
    showStep(settings.codeUnlocked ? 2 : settings.whatsappJoined ? 1 : 0);
    initWhatsApp();
    initCodeStep();
    initDeviceSearch();
    initSettings();
  }

  /* ═══════════════════════════════════════════════════════════════
   * §13  OFFLINE DETECTION
   * ═══════════════════════════════════════════════════════════════ */

  function initOfflineDetection() {
    window.addEventListener('offline', () => showToast('You are offline', 'error', 4000));
    window.addEventListener('online',  () => showToast('Back online', 'success'));
  }

  /* ═══════════════════════════════════════════════════════════════
   * §14  BOOTSTRAP
   * ═══════════════════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body?.dataset?.page;
    if (page === 'landing') {
      initLanding();
    } else if (page === 'wizard') {
      initWizard();
    } else {
      // Fallback: try to detect by presence of wizard-specific element
      if ($('#whatsapp-step')) initWizard();
      else initLanding();
    }
  });

  /* ═══════════════════════════════════════════════════════════════
   * §15  PUBLIC API  (minimal window.ZSS exposure)
   * ═══════════════════════════════════════════════════════════════ */

  window.ZSS = Object.freeze({
    /** Change theme: 'dark' | 'orange' | 'system' */
    setTheme: (t) => ThemeManager.set(t),
    /** Fire confetti at center */
    fireConfetti: () => Confetti.fire(),
    /** Open history drawer (wizard page) */
    openHistory:  () => $('#history-drawer')?.classList.add('drawer-open'),
    /** Open favorites drawer (wizard page) */
    openFavorites: () => $('#fav-drawer')?.classList.add('drawer-open'),
    /** Open compare modal (wizard page) */
    openCompare: () => $('#compare-modal')?.classList.add('modal-open'),
    /** Show a toast */
    toast: showToast,
    /** Device list for external use */
    devices: DEVICES,
  });

})(); // end IIFE
