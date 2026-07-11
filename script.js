/* ========================================
   ZEUS SENSI — Core Engine v2.0
   PIN gate + Sensi calculation + HUD builder
   ======================================== */

// ---- HIDDEN PIN (obfuscated: 2007) ----
const _p = [0x32, 0x30, 0x30, 0x37];
const PREMIUM_PIN = String.fromCharCode(..._p);

// ---- Contact (WhatsApp) ----
const OWNER_CONTACT = "https://wa.me/09066760078?text=Hello%2C%20I%20want%20to%20buy%20premium%20pin";

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.contact-owner').forEach(a => {
    a.href = OWNER_CONTACT;
  });
});

/* ============================================
   SENSI GENERATOR
   ============================================ */
function generateSensi({ platform, device, dpi, style, fingers }) {
  const base = { general: 100, redDot: 90, scope2x: 80, scope4x: 70, sniper: 50, freeLook: 65 };
  const styleMod = {
    headshot: { general: 1.12, redDot: 1.18, scope2x: 1.05, scope4x: 0.95, sniper: 0.90, freeLook: 1.08 },
    spam:     { general: 0.82, redDot: 0.88, scope2x: 0.85, scope4x: 0.80, sniper: 0.85, freeLook: 0.88 },
    esports:  { general: 1.00, redDot: 1.00, scope2x: 1.00, scope4x: 1.00, sniper: 1.00, freeLook: 1.00 }
  }[style] || {};
  const fingerMod = { 2: 1.18, 3: 1.06, 4: 1.00, 5: 0.90 }[fingers] || 1.0;
  const dpiMod = 450 / Math.max(200, Math.min(1200, dpi));
  const platMod = platform === 'ios' ? 0.97 : 1.0;
  const tierMod = device === 'low-end' ? 1.08 : 1.0;
  const out = {};
  for (const k in base) {
    let v = base[k] * (styleMod[k] || 1) * fingerMod * dpiMod * platMod * tierMod;
    v = Math.round(Math.max(10, Math.min(200, v)));
    out[k] = v;
  }
  return out;
}

function formatSensiText(s) {
  return `ZEUS SENSI — Premium Config
General  : ${s.general}
Red Dot  : ${s.redDot}
2x Scope : ${s.scope2x}
4x Scope : ${s.scope4x}
Sniper   : ${s.sniper}
Free Look: ${s.freeLook}

— Powered by Zeus Sensi ⚡`;
}

/* ============================================
   WIZARD ENGINE
   ============================================ */
function initWizard(wrapperId, totalSteps, onComplete) {
  let current = 1;
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return null;
  const back = wrapper.querySelector('.wiz-back');
  const next = wrapper.querySelector('.wiz-next');
  const bar = wrapper.querySelector('.wiz-bar');
  const steps = wrapper.querySelectorAll('.wiz-step');

  function show() {
    steps.forEach(s => s.classList.toggle('active', parseInt(s.dataset.step) === current));
    if (back) back.disabled = current === 1;
    if (next) next.style.display = current === totalSteps ? 'none' : '';
    if (bar) bar.style.width = ((current - 1) / (totalSteps - 1) * 100) + '%';
  }

  if (back) back.onclick = () => { if (current > 1) { current--; show(); } };
  if (next) next.onclick = () => {
    if (typeof onComplete === 'function' && onComplete(current, () => { current++; show(); }) === false) return;
    if (current < totalSteps) { current++; show(); }
  };

  show();

  return {
    go: (s) => { current = s; show(); },
    restart: () => { current = 1; show(); }
  };
}

/* ============================================
   LIGHTNING CANVAS (for all pages)
   ============================================ */
function initLightning() {
  const canvas = document.querySelector('.lightning');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  function resize() { w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  resize();
  addEventListener('resize', resize);
  function bolt() {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,215,0,0.4)';
    ctx.lineWidth = 1;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    let x = Math.random() * w, y = 0;
    ctx.moveTo(x, y);
    while (y < h) {
      x += (Math.random() - 0.5) * 30;
      y += 10 + Math.random() * 20;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    setTimeout(bolt, 1500 + Math.random() * 2000);
  }
  bolt();
}

// Run on load
initLightning();
