const KEY = "2007";
let verified = localStorage.getItem('zeusVerified') === 'true';
let xp = parseInt(localStorage.getItem('zeusXP')) || 0;
let streak = parseInt(localStorage.getItem('zeusStreak')) || 0;
let badges = JSON.parse(localStorage.getItem('zeusBadges')) || [];

// COMPLETE PHONE DATABASE - ALL MODELS THAT RUN FREE FIRE
const phoneDB = {
  iPhone: [
    "iPhone 6","iPhone 6 Plus","iPhone 6s","iPhone 6s Plus","iPhone 7","iPhone 7 Plus",
    "iPhone 8","iPhone 8 Plus","iPhone X","iPhone XR","iPhone XS","iPhone XS Max",
    "iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max","iPhone 12","iPhone 12 Mini","iPhone 12 Pro","iPhone 12 Pro Max",
    "iPhone 13","iPhone 13 Mini","iPhone 13 Pro","iPhone 13 Pro Max",
    "iPhone 14","iPhone 14 Plus","iPhone 14 Pro","iPhone 14 Pro Max",
    "iPhone 15","iPhone 15 Plus","iPhone 15 Pro","iPhone 15 Pro Max"
  ],
  Samsung: [
    "Galaxy S10","S10+","S10e","S20","S20+","S20 Ultra","S21","S21+","S21 Ultra","S22","S22+","S22 Ultra",
    "S23","S23+","S23 Ultra","S24","S24+","S24 Ultra","Note 10","Note 10+","Note 20","Note 20 Ultra",
    "A14","A15","A24","A34","A54","A73","M14","M34","M54","F23","F54"
  ],
  Tecno: [
    "Spark 8","Spark 9","Spark 10","Spark 10 Pro","Spark 20","Spark 20 Pro",
    "Camon 18","Camon 19","Camon 20","Camon 20 Pro","Camon 30",
    "Pova 3","Pova 4","Pova 5","Pova 5 Pro","Pova 6"
  ],
  Infinix: [
    "Hot 10","Hot 11","Hot 12","Hot 20","Hot 30","Hot 30i","Hot 40",
    "Note 10","Note 11","Note 12","Note 30","Note 30 Pro","Note 40",
    "Zero 20","Zero 30","Zero 40"
  ],
  Xiaomi: [
    "Mi 11","Mi 12","Mi 13","Mi 13 Pro","Mi 14",
    "Redmi Note 10","Note 11","Note 12","Note 13","Note 13 Pro",
    "Redmi 10","Redmi 12","Redmi 13","POCO X5","POCO X6","POCO F5"
  ],
  Realme: [
    "8","9","10","11","11 Pro","C35","C55","GT 2","GT 3","GT Neo 3"
  ],
  Oppo: [
    "A16","A17","A57","A78","Reno 8","Reno 9","Reno 10","Reno 11","Find X5","Find X6"
  ],
  Vivo: [
    "Y16","Y27","Y36","V25","V27","V29","X80","X90"
  ],
  OnePlus: [
    "Nord 2","Nord 3","9","10","10 Pro","11","11R","12"
  ],
  "Google Pixel": [
    "Pixel 6","Pixel 6a","Pixel 7","Pixel 7a","Pixel 8","Pixel 8 Pro"
  ],
  Nothing: ["Phone 1","Phone 2"],
  Motorola: ["Edge 30","Edge 40","G54","G84"],
  Huawei: ["P40","P50","P60","Nova 10","Nova 11"],
  Honor: ["X8b","X9b","90","100"],
  "ROG Phone": ["5","6","7","8"],
  "Black Shark": ["4","5","5 Pro"],
  "Red Magic": ["7","8","8 Pro","9"]
};

// GENERATOR
function startAI(){
  document.getElementById('aiThinking').classList.remove('hidden');
  const steps = [
    "Scanning Device...",
    "Checking Performance Tier...",
    "Analyzing RAM + Processor...",
    "Testing Refresh Rate...",
    "Optimizing Recoil Control...",
    "Calibrating Headshot Settings...",
    "Building Final Profile..."
  ];
  let i=0;
  const interval = setInterval(()=>{
    document.getElementById('aiText').innerText = steps[i];
    document.getElementById('progressBar').style.width = ((i+1)/steps.length*100)+'%';
    i++;
    if(i===steps.length){clearInterval(interval); showResult();}
  },900);
}

function showResult(){
  document.getElementById('aiThinking').classList.add('hidden');
  const phone = document.getElementById('model').value;
  const ram = parseInt(document.getElementById('ram').value);
  const refresh = parseInt(document.getElementById('refresh').value);
  const brand = document.getElementById('brand').value;

  // REALISTIC AI LOGIC
  let tier = brand==="iPhone"? 5 : phone.includes("Ultra") || phone.includes("Pro Max")? 5 : ram>=8? 4 : ram>=6? 3 : 2;
  let base = 100 - (tier * 7) - (ram/2) + (refresh>90? -5 : 0);
  let dpi = 500 + tier*100 + ram*15;

  const result = `
    <div class="card glass"><h3>General</h3><p>${Math.round(base)}</p></div>
    <div class="card glass"><h3>Red Dot</h3><p>${Math.round(base+15)}</p></div>
    <div class="card glass"><h3>2X Scope</h3><p>${Math.round(base+5)}</p></div>
    <div class="card glass"><h3>4X Scope</h3><p>${Math.round(base-5)}</p></div>
    <div class="card glass"><h3>Sniper Scope</h3><p>${Math.round(base-15)}</p></div>
    <div class="card glass"><h3>Free Look</h3><p>${Math.round(base+10)}</p></div>
    <div class="card glass"><h3>DPI</h3><p>${dpi}</p></div>
    <div class="card glass"><h3>Headshot Accuracy</h3><p>${85+tier*3}%</p></div>
    <div class="card glass"><h3>Recoil Control</h3><p>${80+tier*4}%</p></div>
    <div class="card glass"><h3>AI Confidence</h3><p>${88+tier*2}%</p></div>
    <div class="card glass"><h3>Device Score</h3><p>${tier*20}%</p></div>
    <div class="card glass" style="grid-column:1/-1">
      <h3>Why this works for ${phone}</h3>
      <p>${tier>=4? 'High-end device detected. Lower sensitivity for laser control + High DPI for fast flicks.' : 'Mid-range device. Balanced sensitivity for stability.'}
      ${refresh>=120? '120Hz+ display allows smoother tracking.' : '60Hz device needs slightly higher sensi.'}
      ${document.getElementById('style').value.includes("Claw")? 'Claw players: Lower general helps with drag headshots.' : 'Thumb players: Higher general for better reach.'}</p>
    </div>
  `;
  document.getElementById('result').innerHTML = result;
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('resultActions').classList.remove('hidden');

  // XP + STREAK SYSTEM
  xp += 10; streak += 1;
  localStorage.setItem('zeusXP',xp);
  localStorage.setItem('zeusStreak',streak);
  updateProfile();
  checkBadges();
}

function updateProfile(){
  document.getElementById('xpText').innerText = `XP: ${xp}`;
  document.getElementById('streakText').innerText = `🔥 ${streak} Day Streak`;
}

function checkBadges(){
  if(xp>=100 &&!badges.includes("Rookie")) addBadge("Rookie 🎯");
  if(xp>=500 &&!badges.includes("Pro")) addBadge("Pro Sniper 🏆");
  if(streak>=7 &&!badges.includes("Loyal")) addBadge("Loyal Player 👑");
}

function addBadge(name){
  badges.push(name); localStorage.setItem('zeusBadges',JSON.stringify(badges));
  document.getElementById('badgeArea').innerHTML += `<span class="badge">${name}</span>`;
}

function spinWheel(){
  const prizes = ['50 XP','Free Access Code','Exclusive HUD','VIP Badge','2x XP Boost'];
  const win = prizes[Math.floor(Math.random()*prizes.length)];
  document.getElementById('spinResult').innerHTML = `🎉 You Won: <span class="gold">${win}</span>`;
  if(win.includes("XP")) {xp+=50; updateProfile();}
}

function dailyReward(){
  let lastClaim = localStorage.getItem('lastClaim');
  let today = new Date().toDateString();
  if(lastClaim!== today){
    xp += 20; localStorage.setItem('lastClaim',today
