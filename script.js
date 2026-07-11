/* ========================================
   ZEUS SENSI — Core Engine v2.0
   ======================================== */

// ---- PIN (obfuscated: 2007) ----
const _p = [0x32, 0x30, 0x30, 0x37];
const PREMIUM_PIN = String.fromCharCode(..._p);

// ---- Contact ----
const OWNER_CONTACT = "https://wa.me/09066760078?text=Hello%2C%20I%20want%20to%20buy%20premium%20pin";

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.contact-owner').forEach(a => { a.href = OWNER_CONTACT; });
  initParticles();
});

/* ============================================
   PARTICLES
   ============================================ */
function initParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h;
  function resize() { w = c.width = innerWidth; h = c.height = innerHeight; }
  resize();
  addEventListener('resize', resize);

  const stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.15,
    dy: (Math.random() - 0.5) * 0.15,
    a: Math.random() * 0.6 + 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(s => {
      s.x += s.dx;
      s.y += s.dy;
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${s.a})`;
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 4;
      ctx.fill();
    });
    ctx.shadowBlur = 0;
    // Draw faint lines between close stars
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(255, 215, 0, ${0.08 * (1 - dist / 80)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

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
  return { go: (s) => { current = s; show(); }, restart: () => { current = 1; show(); } };
}
