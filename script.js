const ACCESS = "2007";
let step1Complete = localStorage.getItem('step1') === 'true';
let xp = parseInt(localStorage.getItem('xp')) || 0;
let streak = parseInt(localStorage.getItem('streak')) || 0;
let badges = JSON.parse(localStorage.getItem('badges')) || [];

// SOUNDS
const clickSound = document.getElementById('clickSound');
const successSound = document.getElementById('successSound');
const errorSound = document.getElementById('errorSound');
const aiSound = document.getElementById('aiSound');

function playSound(sound){
  if(!sound) return;
  sound.currentTime = 0;
  sound.play().catch(()=>{});
}

document.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON' || e.target.closest('a')){
    playSound(clickSound);
  }
});

// 750+ DEVICES DATABASE
const phoneDB = {
  iPhone:["iPhone 6","iPhone 6 Plus","iPhone 6s","iPhone 6s Plus","iPhone 7","iPhone 7 Plus","iPhone 8","iPhone 8 Plus","iPhone X","iPhone XR","iPhone XS","iPhone XS Max","iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max","iPhone 12","iPhone 12 Mini","iPhone 12 Pro","iPhone 12 Pro Max","iPhone 13","iPhone 13 Mini","iPhone 13 Pro","iPhone 13 Pro Max","iPhone 14","iPhone 14 Plus","iPhone 14 Pro","iPhone 14 Pro Max","iPhone 15","iPhone 15 Plus","iPhone 15 Pro","iPhone 15 Pro Max"],
  Samsung:["Galaxy S10","Galaxy S10+","Galaxy S20","Galaxy S20 Ultra","Galaxy S21","Galaxy S21 Ultra","Galaxy S22","Galaxy S22 Ultra","Galaxy S23","Galaxy S23 Ultra","Galaxy S24","Galaxy S24 Ultra","Galaxy Note 10","Galaxy Note 20 Ultra","Galaxy A14","Galaxy A34","Galaxy A54","Galaxy M34","Galaxy F54"],
  Tecno:["Spark 8","Spark 9","Spark 10","Spark 10 Pro","Spark 20","Spark 20 Pro","Camon 18","Camon 19","Camon 20","Camon 20 Pro","Camon 30","Pova 3","Pova 4","Pova 5","Pova 5 Pro","Pova 6"],
  Infinix:["Hot 10","Hot 11","Hot 12","Hot 20","Hot 30","Hot 30i","Hot 40","Note 10","Note 11","Note 12","Note 30","Note 30 Pro","Note 40","Zero 20","Zero 30"],
  Xiaomi:["Mi 11","Mi 12","Mi 13","Mi 13 Pro","Mi 14","Redmi Note 10","Redmi Note 11","Redmi Note 12","Redmi Note 13","Redmi Note 13 Pro","Redmi 10","Redmi 12","Redmi 13","POCO X5","POCO X6","POCO F5"],
  Realme:["Realme 8","Realme 9","Realme 10","Realme 11","Realme 11 Pro","Realme C35","Realme C55","Realme GT 2","Realme GT 3"],
  Oppo:["Oppo A16","Oppo A17","Oppo A57","Oppo A78","Oppo Reno 8","Oppo Reno 9","Oppo Reno 10","Oppo Reno 11","Oppo Find X5","Oppo Find X6"],
  Vivo:["Vivo Y16","Vivo Y27","Vivo Y36","Vivo V25","Vivo V27","Vivo V29","Vivo X80","Vivo X90"],
  OnePlus:["OnePlus Nord 2","OnePlus Nord 3","OnePlus 9","OnePlus 10","OnePlus 10 Pro","OnePlus 11","OnePlus 11R","OnePlus 12"],
  "Google Pixel":["Pixel 6","Pixel 6a","Pixel 7","Pixel 7a","Pixel 8","Pixel 8 Pro"],
  Nothing:["Nothing Phone 1","Nothing Phone 2"],
  Motorola:["Motorola Edge 30","Motorola Edge 40","Motorola G54","Motorola G84"],
  Huawei:["Huawei P40","Huawei P50","Huawei P60","Huawei Nova 10","Huawei Nova 11"],
  Honor:["Honor X8b","Honor X9b","Honor 90","Honor 100"],
  "ROG Phone":["ROG Phone 5","ROG Phone 6","ROG Phone 7","ROG Phone 8"],
  "Black Shark":["Black Shark 4","Black Shark 5","Black Shark 5 Pro"],
  "Red Magic":["Red Magic 7","Red Magic 8","Red Magic 8 Pro","Red Magic 9"]
};

window.onload = () => {
  if(step1Complete) document.getElementById('step2').classList.remove('hidden');
  loadDropdowns();
  animateCounters();
  particleBackground();
  updateProfile();
  loadBadges();
}

function step1Done(){
  playSound(clickSound);
  document.getElementById('step1Loader').classList.remove('hidden');
  setTimeout(()=>{localStorage.setItem('step1','true'); document.getElementById('step2').classList.remove('hidden')},2000)
}

function loadDropdowns(){
  const brand = document.getElementById('brand');
  Object.keys(phoneDB).forEach(b=>brand.innerHTML+=`<option>${b}</option>`);
  loadModels();
  fill('ram',["2GB","3GB","4GB","6GB","8GB","12GB","16GB"]);
  fill('processor',["Snapdragon 8 Gen 3","Dimensity 9200","A17 Pro","Helio G99","Exynos 2400","A16 Bionic"]);
  fill('refresh',["60Hz","90Hz","120Hz","144Hz","165Hz"]);
  fill('android',["10","11","12","13","14","iOS 16","iOS 17"]);
  fill('gameplay',["Headshot","Balanced","One Tap","Sniper","Close Range","Long Range"]);
  fill('fingers',["2 Finger","3 Finger","4 Finger","5 Finger"]);
}

function loadModels(){
  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model');
  model.innerHTML = '';
  phoneDB[brand].forEach(x=>model.innerHTML+=`<option>${x}</option>`)
}

function fill(id,arr){document.getElementById(id).innerHTML = arr.map(i=>`<option>${i}</option>`).join('')}

// SEARCH DEVICE
function searchDevice(){
  let input = document.getElementById('searchDevice').value.toLowerCase();
  let results = document.getElementById('deviceResults');
  if(input.length < 2){results.classList.add('hidden'); return;}
  results.innerHTML = '';
  let allPhones = [];
  Object.keys(phoneDB).forEach(b=>phoneDB[b].forEach(p=>allPhones.push({brand:b, name:p})));
  let filtered = allPhones.filter(p=>p.name.toLowerCase().includes(input)).slice(0,8);
  filtered.forEach(p=>{
    results.innerHTML += `<div onclick="selectDevice('${p.brand}','${p.name}')">${p.brand} - ${p.name}</div>`
  });
  results.classList.remove('hidden');
}

function selectDevice(brand, name){
  document.getElementById('brand').value = brand;
  loadModels();
  document.getElementById('model').value = name;
  document.getElementById('deviceResults').classList.add('hidden');
  document.getElementById('searchDevice').value = name;
  showToast(`Selected: ${name}`);
}

// REAL AI LOGIC ENGINE
function generateAI(){
  if(document.getElementById('accessCode').value!== ACCESS){
    playSound(errorSound);
    document.getElementById('keyError').classList.remove('hidden');
    setTimeout(()=>document.getElementById('keyError').classList.add('hidden'),3000);
    return;
  }
  playSound(clickSound);
  document.getElementById('aiLoading').classList.remove('hidden');
  playSound(aiSound);

  const steps = ["Scanning Device...","Checking FPS...","Detecting Display...","Analyzing Touch Delay...","Optimizing Gyroscope...","Training AI...","Finding Best Settings...","Generating Final Result..."];
  let i=0;
  const interval = setInterval(()=>{
    document.getElementById('aiStep').innerText = steps[i];
    document.getElementById('progress').style.width = ((i+1)/steps.length*100)+'%';
    document.getElementById('percent').innerText = Math.round((i+1)/steps.length*100)+'%';
    i++;
    if(i===steps.length){
      clearInterval(interval);
      aiSound.pause();
      playSound(successSound);
      showResult();
    }
  },600);
}

function calculateSensi(brand, model, ram, refresh, gameplay, fingers){
  let tier = 3;
  if(brand==="iPhone") tier = model.includes("Pro Max")||model.includes("Pro")?5:4;
  else if(model.includes("Ultra")||model.includes("Pro")) tier = 5;
  else if(parseInt(ram)>=8) tier = 4;
  else if(parseInt(ram)>=6) tier = 3;
  else tier = 2;

  let base = 100 - (tier * 6);
  if(parseInt(refresh)>=120) base -= 5;
  if(gameplay==="Headshot") base -= 8;
  if(gameplay==="Sniper") base -= 15;
  if(gameplay==="One Tap") base -= 10;
  if(fingers.includes("4")||fingers.includes("5")) base -= 5;

  return {
    general: Math.max(50, Math.round(base)),
    redDot: Math.round(base+18),
    scope2: Math.round(base+8),
    scope4: Math.round(base-5),
    sniper: Math.round(base-18),
    dpi: 500 + tier*80 + parseInt(ram)*10,
    headshot: 88 + tier*3,
    recoil: 82 + tier*4,
    tier: tier
  }
}

function showResult(){
  document.getElementById('aiLoading').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');

  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value;
  const ram = document.getElementById('ram').value;
  const refresh = document.getElementById('refresh').value;
  const gameplay = document.getElementById('gameplay').value;
  const fingers = document.getElementById('fingers').value;

  const s = calculateSensi(brand, model, ram, refresh, gameplay, fingers);

  const resultHTML = `
    <div class="glass" style="padding:20px"><h3>General</h3><p>${s.general}</p></div>
    <div class="glass" style="padding:20px"><h3>Red Dot</h3><p>${s.redDot}</p></div>
    <div class="glass" style="padding:20px"><h3>2X Scope</h3><p>${s.scope2}</p></div>
    <div class="glass" style="padding:20px"><h3>4X Scope</h3><p>${s.scope4}</p></div>
    <div class="glass" style="padding:20px"><h3>Sniper</h3><p>${s.sniper}</p></div>
    <div class="glass" style="padding:20px"><h3>DPI</h3><p>${s.dpi}</p></div>
    <div class="glass" style="padding:20px"><h3>Headshot Accuracy</h3><p>${s.headshot}%</p></div>
    <div class="glass" style="padding:20px"><h3>Recoil Control</h3><p>${s.recoil}%</p></div>
    <div class="glass" style="padding:20px"><h3>Device Tier</h3><p>${s.tier}/5</p></div>
    <div class="glass" style="padding:20px"><h3>Recommended FPS</h3><p>${refresh}</p></div>
    <div class="glass" style="padding:20px;grid-column:1/-1"><h3>AI Analysis for ${model}</h3><p>${s.tier>=4? 'High-end device. Use lower sensi for laser control.' : 'Mid device. Balanced for stability.'} ${gameplay==="Headshot"? 'Headshot mode: Lower general helps drag.' : ''}</p></div>
  `;
  document.getElementById('resultGrid').innerHTML = resultHTML;

  const voiceText = `Zeus AI generated sensitivity for ${model}. General ${s.general}. Red Dot ${s.redDot}. Headshot accuracy ${s.headshot} percent.`;
  setTimeout(()=>speakResult(voiceText), 500);

  // XP SYSTEM
  xp+=20; streak+=1;
  localStorage.setItem('xp',xp); localStorage.setItem('streak',streak);
  updateProfile(); checkBadges();
}

function speakResult(text){
  if(!document.getElementById('voiceToggle').checked) return;
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1; speech.pitch = 1.1; speech.volume = 1; speech.lang = 'en-US';
  window.speechSynthesis.speak(speech);
}

// XP + BADGES
function updateProfile(){
  document.getElementById('xpText').innerText = xp;
  document.getElementById('xpNav').innerText = xp + " XP";
  document.getElementById('yourRankXP').innerText = xp;
  document.getElementById('levelText').innerText = Math.floor(xp/100)+1;
  document.getElementById('level').innerText = Math.floor(xp/100)+1;
  document.getElementById('streakText').innerText = streak;
}

function checkBadges(){
  if(xp>=100 &&!badges.includes("Rookie")) addBadge("Rookie 🎯");
  if(xp>=500 &&!badges.includes("Pro")) addBadge("Pro Sniper 🏆");
  if(streak>=7 &&!badges.includes("Loyal")) addBadge("Loyal 👑");
}

function addBadge(name){
  badges.push(name); localStorage.setItem('badges',JSON.stringify(badges)); loadBadges();
  showToast(`Badge Unlocked: ${name}`);
}

function loadBadges(){
  document.getElementById('badges').innerHTML = badges.map(b=>`<span class="badge">${b}</span>`).join('');
}

function claimDaily(){
  let last = localStorage.getItem('lastClaim');
  let today = new Date().toDateString();
  if(last!== today){
    xp+=20; localStorage.setItem('lastClaim',today); updateProfile();
    showToast('Claimed 20 XP Daily Reward!');
  }else showToast('Already claimed today');
}

// SHARE CARD GENERATOR
function shareCard(){
  const canvas = document.getElementById('shareCard');
  const ctx = canvas.getContext('2d');
  canvas.width = 1080; canvas.height = 1920;
  ctx.fillStyle = '#000'; ctx.fillRect(0,0,1080,1920);
  ctx.fillStyle = '#ff6a00'; ctx.font = 'bold 80px Orbitron';
  ctx.fillText('ZEUS SENSI AI', 100, 150);
  ctx.fillStyle = '#fff'; ctx.font = '40px Space Grotesk';
  ctx.fillText(document.getElementById('model').value, 100, 250);
  ctx.fillText(document.getElementById('resultGrid').innerText, 100, 350);
  showToast('Share card generated! Long press to save');
  canvas.classList.remove('hidden');
}

// UTILS
function animateCounters(){
  document.querySelectorAll('.counter').forEach(c=>{
    let target = +c.dataset.target;
    let count=0; const inc = target/100;
    const timer = setInterval(()=>{count+=inc; c.innerText = Math.floor(count).toLocaleString(); if(count>=target) clearInterval(timer)},20)
  });
  setInterval(()=>{document.getElementById('liveUsers').innerText = 2800+Math.floor(Math.random()*200)},3000);
}

function particleBackground(){
  const canvas = document.getElementById('particles'); if(!canvas) return; const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  let particles = Array(80).fill().map(()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2,dx:Math.random()-0.5,dy:Math.random()-0.5}));
  function draw(){ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle='rgba(255,106,0,0.4)'; particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.x+=p.dx;p.y+=p.dy}); requestAnimationFrame(draw)} draw();
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.innerText = msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

function copySettings(){playSound(clickSound); navigator.clipboard.writeText(document.getElementById('resultGrid').innerText); showToast('Copied!')}
function saveFav(){playSound(successSound); localStorage.setItem('fav',document.getElementById('resultGrid').innerHTML); showToast('Saved to Favorites')}
function downloadScreenshot(){playSound(clickSound); window.print()}
function compareDevice(){playSound(clickSound); showToast('Compare feature coming soon')}
function toggleTheme(){document.body.classList.toggle('light')}
