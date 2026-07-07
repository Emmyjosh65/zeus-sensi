let currentDevice = {};
let currentSensi = {};
const CORRECT_PIN = "2007";
const DEVICES = ["iPhone 15 Pro Max","Samsung S24 Ultra","Tecno Spark 20","Infinix Note 40","Redmi Note 13 Pro","Poco X6 Pro","Pixel 8 Pro","Realme 12 Pro+","Nothing Phone 2","OnePlus 12","Vivo V30","Oppo Reno 11","ROG Phone 8","Huawei P60 Pro"];

// PARTICLES + MOUSE GLOW
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particlesArray = [];
for(let i=0;i<50;i++){particlesArray.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,size:Math.random()*2+1,speedX:Math.random()*1-0.5,speedY:Math.random()*1-0.5})}
function animateParticles(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#FF6A0033';particlesArray.forEach(p=>{p.x+=p.speedX;p.y+=p.speedY;if(p.x<0||p.x>canvas.width)p.speedX*=-1;if(p.y<0||p.y>canvas.height)p.speedY*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill()});requestAnimationFrame(animateParticles)}
animateParticles();
document.addEventListener('mousemove',e=>{document.querySelector('.mouse-glow').style.left=e.pageX+'px';document.querySelector('.mouse-glow').style.top=e.pageY+'px'})

// RIPPLE EFFECT
document.querySelectorAll('.ripple').forEach(btn=>{btn.addEventListener('click',function(e){const ripple=document.createElement('span');ripple.className='ripple-effect';const rect=this.getBoundingClientRect();ripple.style.left=e.clientX-rect.left+'px';ripple.style.top=e.clientY-rect.top+'px';this.appendChild(ripple);setTimeout(()=>ripple.remove(),600)})})

// SCROLL REVEAL
const observer = new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('active')})},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}
function movePin(input, index){
  if(input.value.length === 1){
    const next = input.parentNode.children[index+1];
    if(next) next.focus();
  }
  if(index===3) checkPin();
}
function checkPin(){
  const pins = [...document.querySelectorAll('.pin-inputs input')].map(i=>i.value).join('');
  if(pins === CORRECT_PIN){
    showPage('generator');
    confetti();
    toast('Access Granted ✅');
  } else {
    document.querySelector('.pin-inputs').classList.add('shake');
    document.getElementById('pin-error').innerText = "Wrong Access Code";
    toast('Wrong Code ❌');
    setTimeout(()=>document.querySelector('.pin-inputs').classList.remove('shake'),400);
  }
}
function showSuggestions(val){
  const box = document.getElementById('suggestions');
  if(!val){box.style.display='none';return}
  const filtered = DEVICES.filter(d=>d.toLowerCase().includes(val.toLowerCase()));
  box.innerHTML = filtered.map(d=>`<div onclick="selectDevice('${d}')">${d}</div>`).join('');
  box.style.display = filtered.length? 'block':'none';
}
function selectDevice(name){
  currentDevice.name = name;
  currentDevice.ram = "8GB"; currentDevice.cpu="Snapdragon 8 Gen 3"; currentDevice.fps="120Hz";
  document.getElementById('deviceSearch').value = name;
  document.getElementById('suggestions').style.display='none';
  document.getElementById('deviceSpecs').innerHTML = `<h3>${name}</h3><p>RAM: ${currentDevice.ram} | CPU: ${currentDevice.cpu} | Refresh: ${currentDevice.fps}</p>`;
}
function startAI(){
  showPage('ai');
  const steps = ["AI Detecting Device...","Scanning CPU...","Checking Display...","Checking Touch Sampling...","Optimizing Headshots...","Finding Best Drag Speed...","Calculating Recoil...","Testing Camera Sensitivity...","Training AI Model...","Building Final Profile..."];
  let i=0;
  const interval = setInterval(()=>{
    document.getElementById('ai-text').innerText = steps[i];
    document.getElementById('progress').style.width = ((i+1)*10)+'%';
    i++;
    if(i>=steps.length){clearInterval(interval);generateResult();}
  },500);
}
function generateResult(){
  currentSensi = {General:100,RedDot:95,TwoX:90,FourX:85,Sniper:70,FreeLook:100,Gyro:80};
  document.getElementById('resultSpecs').innerHTML = `<p><b>Device:</b> ${currentDevice.name || 'Custom'} | <b>AI Rating:</b> S+</p>`;
  document.getElementById('resultSensi').innerHTML = Object.entries(currentSensi).map(([k][v])=>`<div class="glass-card"><b>${k}</b><p>${v}</p></div>`).join('');

  let history = JSON.parse(localStorage.getItem('zeus_history')) || [];
  history.unshift({device:currentDevice.name,date:new Date().toLocaleDateString(),sensi:currentSensi});
  localStorage.setItem('zeus_history', JSON.stringify(history.slice(0,5)));
  showHistory();

  showPage('results');
  confetti();
}
function showHistory(){
  const history = JSON.parse(localStorage.getItem('zeus_history')) || [];
  if(history.length>0){
    document.getElementById('history').innerHTML = '<h3>Recent History</h3>' + history.map(h=>`<p>${h.device} - ${h.date}</p>`).join('');
  }
}
function copySensi(){
  const text = Object.entries(currentSensi).map(([k][v])=>`${k}: ${v}`).join('\n');
  navigator.clipboard.writeText(text);
  toast('Copied to clipboard ✅');
}
function exportPNG(){ toast('Exported PNG ✅'); confetti(); }
function saveFavorite(){ localStorage.setItem('fav', JSON.stringify(currentSensi)); toast('Saved to Favorites ⭐'); }
function toast(msg){const t=document.getElementById('toast');t.innerText=msg;t.style.display='block';setTimeout(()=>t.style.display='none',2000)}
function confetti(){for(let i=0;i<30;i++){const c=document.createElement('div');c.style=position:fixed;top:0;left:Math.random()*100+'%';width:8px;height:8px;background:#FF6A00;z-index:999;animation:fall 1s linear;document.body.appendChild(c);setTimeout(()=>c.remove(),1000)}}

// INIT TOGGLES
['Headshot','Balanced','Rush','Drag','Sniper'].forEach(s=>{document.getElementById('styleToggles').innerHTML += `<button class="toggle-btn ripple">${s}</button>`});
['2','3','4','5'].forEach(f=>{document.getElementById('fingerToggles').innerHTML += `<button class="toggle-btn ripple">${f} Finger</button>`});
['ON','OFF'].forEach(g=>{document.getElementById('gyroToggles').innerHTML += `<button class="toggle-btn ripple">${g}</button>`});
document.addEventListener('click',e=>{if(e.target.classList.contains('toggle-btn'))e.target.classList.toggle('active')});
showHistory();
