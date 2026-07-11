// ZEUS SENSI — HUD Config Wizard
const totalSteps = 5;
const state = { platform: null, style: null, fingers: null, pinOk: false };

const wiz = initWizard(totalSteps, (cur, advance) => {
  if (cur === 1 && !state.pinOk) {
    document.getElementById('pinErr').textContent = '❌ Invalid PIN.';
    return false;
  }
  if (cur === 2 && !state.platform) return false;
  if (cur === 3 && !state.style)    return false;
  if (cur === 4 && !state.fingers)  return false;
  if (cur === 4) buildHud();
  advance();
});

// PIN
document.getElementById('pinSubmit').onclick = () => {
  const v = document.getElementById('pinInput').value;
  if (v === PREMIUM_PIN) { state.pinOk = true; wiz.go(2); }
  else document.getElementById('pinErr').textContent = '❌ Invalid PIN.';
};
document.getElementById('pinInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') document.getElementById('pinSubmit').click();
});

// Platform / Style / Fingers auto-advance
['2','3','4'].forEach(step => {
  document.querySelectorAll(`[data-step="${step}"] .choice`).forEach(c => {
    c.onclick = () => {
      document.querySelectorAll(`[data-step="${step}"] .choice`).forEach(x => x.classList.remove('selected'));
      c.classList.add('selected');
      const key = step === '2' ? 'platform' : step === '3' ? 'style' : 'fingers';
      state[key] = c.dataset.value;
      setTimeout(() => document.getElementById('nextBtn').click(), 250);
    };
  });
});

/* ===== HUD BUILDER ===== */
function buildHud() {
  const { platform, style, fingers } = state;
  const screen = document.getElementById('hudScreen');
  screen.innerHTML = '';

  // Button sets per grip
  const layouts = {
    2: ['fire','jump','crouch','scope','look'],
    3: ['fire','jump','crouch','scope','look','reload'],
    4: ['fire','jump','crouch','scope','look','reload','medkit','grenade'],
    5: ['fire','jump','crouch','scope','look','reload','medkit','grenade','gloo','skill']
  };
  const buttons = layouts[fingers] || layouts[2];

  // Position table (left%, top%, size%)
  // Tuned per style
  const pos = {
    headshot: {
      fire:   { l: 78, t: 50, s: 14 },
      jump:   { l: 78, t: 30, s: 10 },
      crouch: { l: 78, t: 70, s: 10 },
      scope:  { l: 60, t: 75, s: 10 },
      look:   { l: 88, t: 88, s: 9 },
      reload: { l: 60, t: 60, s: 9 },
      medkit: { l: 22, t: 78, s: 9 },
      grenade:{ l: 12, t: 70, s: 9 },
      gloo:   { l: 22, t: 60, s: 9 },
      skill:  { l: 12, t: 85, s: 9 }
    },
    spam: {
      fire:   { l: 80, t: 55, s: 16 },
      jump:   { l: 80, t: 30, s: 10 },
      crouch: { l: 80, t: 78, s: 10 },
      scope:  { l: 65, t: 80, s: 10 },
      look:   { l: 88, t: 88, s: 9 },
      reload: { l: 55, t: 60, s: 10 },
      medkit: { l: 18, t: 80, s: 9 },
      grenade:{ l: 10, t: 70, s: 9 },
      gloo:   { l: 18, t: 60, s: 9 },
      skill:  { l: 10, t: 88, s: 9 }
    },
    esports: {
      fire:   { l: 78, t: 52, s: 13 },
      jump:   { l: 78, t: 32, s: 10 },
      crouch: { l: 78, t: 72, s: 10 },
      scope:  { l: 62, t: 78, s: 10 },
      look:   { l: 88, t: 88, s: 9 },
      reload: { l: 58, t: 60, s: 9 },
      medkit: { l: 20, t: 80, s: 9 },
      grenade:{ l: 12, t: 72, s: 9 },
      gloo:   { l: 20, t: 60, s: 9 },
      skill:  { l: 12, t: 88, s: 9 }
    }
  };
  const cfg = pos[style] || pos.esports;

  // Render buttons
  const labels = { fire:'FIRE', jump:'JUMP', crouch:'CROUCH', scope:'SCOPE', look:'LOOK', reload:'RELOAD', medkit:'MED', grenade:'BOOM', gloo:'GLOO', skill:'SKILL' };
  const cls = { fire:'fire' };
  buttons.forEach(b => {
    const p = cfg[b] || { l: 50, t: 50, s: 8 };
    const el = document.createElement('div');
    el.className = 'hud-btn' + (cls[b] ? ' ' + cls[b] : '');
    el.style.left = p.l + '%';
    el.style.top  = p.t + '%';
    el.style.width = p.s + '%';
    el.style.height = p.s + '%';
    el.style.transform = 'translate(-50%, -50%)';
    el.textContent = labels[b] || b.toUpperCase();
    screen.appendChild(el);
  });

  // Button map
  const map = document.getElementById('hudMap');
  map.innerHTML = buttons.map(b => `<li><strong>${labels[b]}</strong>${b.toUpperCase()} action button</li>`).join('');

  // Summary
  document.getElementById('hudSummary').textContent =
    `${platform.toUpperCase()} · ${style} · ${fingers}-finger claw layout`;

  // Wire copy
  document.getElementById('copyBtn').onclick = () => {
    const txt = `ZEUS SENSI — Custom HUD\nPlatform: ${platform}\nStyle: ${style}\nFingers: ${fingers}\n\nButtons: ${buttons.map(b => labels[b]).join(', ')}\n\nSee the preview in the app.`;
    navigator.clipboard.writeText(txt);
    const btn = document.getElementById('copyBtn');
    btn.textContent = '✅ COPIED!';
    setTimeout(() => btn.textContent = '📋 COPY HUD', 2000);
  };
  document.getElementById('restartBtn').onclick = () => {
    state.platform = state.style = state.fingers = null;
    state.pinOk = false;
    document.getElementById('pinInput').value = '';
    document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
    wiz.restart();
  };
}
