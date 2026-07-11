// ZEUS SENSI — Premium Sensi Wizard
const totalSteps = 7;
const state = { platform: null, device: null, dpi: 450, style: null, fingers: null, pinOk: false };
let devices = [];

// Load devices
fetch('devices.json').then(r => r.json()).then(d => { devices = d; });

const wiz = initWizard(totalSteps, (cur, advance) => {
  // Per-step validation
  if (cur === 1 && !state.pinOk) {
    document.getElementById('pinErr').textContent = '❌ Invalid PIN. Contact the owner.';
    return false;
  }
  if (cur === 2 && !state.platform) { flash('Select a platform'); return false; }
  if (cur === 3 && !state.device)    { flash('Pick a device or Generic'); return false; }
  if (cur === 5 && !state.style)     { flash('Pick a playstyle'); return false; }
  if (cur === 6 && !state.fingers)   { flash('Pick your grip'); return false; }

  if (cur === 6) {
    // Generate result on the way to step 7
    const sensi = generateSensi(state);
    document.getElementById('r-general').textContent  = sensi.general;
    document.getElementById('r-reddot').textContent   = sensi.redDot;
    document.getElementById('r-2x').textContent       = sensi.scope2x;
    document.getElementById('r-4x').textContent       = sensi.scope4x;
    document.getElementById('r-sniper').textContent   = sensi.sniper;
    document.getElementById('r-freelook').textContent = sensi.freeLook;
    document.getElementById('resultSummary').textContent =
      `${state.platform.toUpperCase()} · ${state.device} · ${state.dpi} DPI · ${state.style} · ${state.fingers}-finger`;
  }
  advance();
});

function flash(msg) {
  const e = document.getElementById('pinErr') || { textContent: '' };
  e.textContent = '⚠️ ' + msg;
  e.style.color = '#FF3B3B';
  setTimeout(() => { e.textContent = ''; }, 2000);
}

// PIN
document.getElementById('pinSubmit').onclick = () => {
  const v = document.getElementById('pinInput').value;
  if (v === PREMIUM_PIN) {
    state.pinOk = true;
    document.getElementById('pinErr').textContent = '';
    wiz.go(2);
  } else {
    document.getElementById('pinErr').textContent = '❌ Invalid PIN. Contact the owner.';
  }
};
document.getElementById('pinInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') document.getElementById('pinSubmit').click();
});

// Platform
document.querySelectorAll('[data-step="2"] .choice').forEach(c => {
  c.onclick = () => {
    document.querySelectorAll('[data-step="2"] .choice').forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
    state.platform = c.dataset.value;
    setTimeout(() => document.getElementById('nextBtn').click(), 250);
  };
});

// Device search
const search = document.getElementById('deviceSearch');
const list = document.getElementById('deviceList');
function renderDevices(q = '') {
  const ql = q.toLowerCase();
  const matches = devices.filter(d => d.name.toLowerCase().includes(ql)).slice(0, 30);
  list.innerHTML = matches.map(d =>
    `<div class="device-item" data-name="${d.name}">
      <span>${d.name}</span>
      <span class="chip">${d.os}</span>
    </div>`
  ).join('') || '<p class="hint">No devices found. Pick Generic or Low-End below.</p>';
  list.querySelectorAll('.device-item').forEach(it => {
    it.onclick = () => {
      list.querySelectorAll('.device-item').forEach(x => x.classList.remove('selected'));
      it.classList.add('selected');
      state.device = it.dataset.name;
      document.querySelectorAll('[data-step="3"] .choice').forEach(x => x.classList.remove('selected'));
    };
  });
}
search?.addEventListener('input', e => renderDevices(e.target.value));
renderDevices();

// Generic / Low-end
document.querySelectorAll('[data-step="3"] .choice').forEach(c => {
  c.onclick = () => {
    document.querySelectorAll('[data-step="3"] .choice').forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
    state.device = c.dataset.value;
    list.querySelectorAll('.device-item').forEach(x => x.classList.remove('selected'));
  };
});

// DPI
const dpi = document.getElementById('dpi');
const dpiVal = document.getElementById('dpiVal');
function updateDpi() {
  state.dpi = parseInt(dpi.value);
  dpiVal.textContent = state.dpi;
  const p = ((state.dpi - 200) / (1200 - 200)) * 100;
  dpi.style.setProperty('--p', p + '%');
}
dpi.addEventListener('input', updateDpi);
updateDpi();
document.querySelectorAll('.dpi-presets button').forEach(b => {
  b.onclick = () => { dpi.value = b.dataset.dpi; updateDpi(); };
});

// Style
document.querySelectorAll('[data-step="5"] .choice').forEach(c => {
  c.onclick = () => {
    document.querySelectorAll('[data-step="5"] .choice').forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
    state.style = c.dataset.value;
    setTimeout(() => document.getElementById('nextBtn').click(), 250);
  };
});

// Fingers
document.querySelectorAll('[data-step="6"] .choice').forEach(c => {
  c.onclick = () => {
    document.querySelectorAll('[data-step="6"] .choice').forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
    state.fingers = c.dataset.value;
    setTimeout(() => document.getElementById('nextBtn').click(), 250);
  };
});

// Result actions
document.getElementById('copyBtn').onclick = () => {
  const sensi = generateSensi(state);
  navigator.clipboard.writeText(formatSensiText(sensi));
  const b = document.getElementById('copyBtn');
  b.textContent = '✅ COPIED!';
  setTimeout(() => b.textContent = '📋 COPY ALL', 2000);
};
document.getElementById('restartBtn').onclick = () => {
  state.platform = state.device = state.style = state.fingers = null;
  state.pinOk = false;
  document.getElementById('pinInput').value = '';
  document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
  wiz.restart();
};
