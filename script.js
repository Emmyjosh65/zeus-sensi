/* ========================================
   ZEUS SENSI — Core Engine
   PIN gate + Sensi calculation + UI helpers
   ======================================== */

// ---- HIDDEN PIN (obfuscated, both gates use same PIN: 2007) ----
// Don't put 2007 plainly in code; contact owner only.
const _p = [0x32, 0x30, 0x30, 0x37];
const PREMIUM_PIN = String.fromCharCode(..._p);

// ---- Contact link (WhatsApp) ----
const OWNER_CONTACT = "https://wa.me/09066760078?text=Hello%2C%20I%20want%20to%20buy%20premium%20pin";

// ---- Set contact link on every page ----
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#contactOwner, #contactOwner2').forEach(a => {
    a.href = OWNER_CONTACT;
  });
});

/* ============================================
   SENSI GENERATOR
   Inputs: platform, device, dpi, style, fingers
   ============================================ */

function generateSensi({ platform, device, dpi, style, fingers }) {
  // Base values (balanced esports baseline)
  const base = { general: 100, redDot: 90, scope2x: 80, scope4x: 70, sniper: 50, freeLook: 65 };

  // Style modifier
  const styleMod = {
    headshot: { general: 1.12, redDot: 1.18, scope2x: 1.05, scope4x: 0.95, sniper: 0.90, freeLook: 1.08 },
    spam:     { general: 0.82, redDot: 0.88, scope2x: 0.85, scope4x: 0.80, sniper: 0.85, freeLook: 0.88 },
    esports:  { general: 1.00, redDot: 1.00, scope2x: 1.00, scope4x: 1.00, sniper: 1.00, freeLook: 1.00 }
  }[style] || {};

  // Finger modifier (more fingers = more control = can run lower sens)
  const fingerMod = { 2: 1.18, 3: 1.06, 4: 1.00, 5: 0.90 }[fingers] || 1.0;

  // DPI modifier (normalize to 450 DPI)
  const dpiMod = 450 / Math.max(200, Math.min(1200, dpi));

  // Platform modifier
  const platMod = platform === 'ios' ? 0.97 : 1.0;

  // Device tier modifier (low-end phones need slightly higher sens for responsiveness)
  const tierMod = device === 'low-end' ? 1.08 : 1.0;

  // Build result
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
   WIZARD SHARED LOGIC
   ============================================ */

function initWizard(totalSteps, onComplete) {
  let current = 1;
  const wizard = document.getElementById('wizard');
  const back = document.getElementById('backBtn');
  const next = document.getElementById('nextBtn');
  const bar = document.getElementById('progressBar');

  function show() {
    wizard.querySelectorAll('.step').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.step) === current);
    });
    back.disabled = current === 1;
    next.style.display = current === totalSteps ? 'none' : '';
    bar.style.width = (current / totalSteps * 100) + '%';
  }

  back.onclick = () => { if (current > 1) { current--; show(); } };
  next.onclick = () => {
    if (typeof onComplete === 'function' && onComplete(current, () => { current++; show(); }) === false) return;
    if (current < totalSteps) { current++; show(); }
  };

  show();

  return {
    go: (step) => { current = step; show(); },
    current: () => current,
    restart: () => { current = 1; show(); }
  };
}
