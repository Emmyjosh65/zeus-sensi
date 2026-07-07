let DEVICE_DB = [];
let currentDevice = null;
let currentSensi = {};
const CORRECT_PIN = "2007";

// LOAD DEVICES
fetch('devices.json').then(r=>r.json()).then(d=>DEVICE_DB=d);

// PARTICLES + MOUSE
window.onload=()=>{const c=document.getElementById('particles');const ctx=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;let p=Array.from({length:40},()=>({x:Math.random()*c.width,y:Math.random()*c.height,s:Math.random()*2+1,vx:Math.random()-.5,vy:Math.random()-.5}));(function a(){ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle='#FF6A0020';p.forEach(o=>{o.x+=o.vx;o.y+=o.vy;if(o.x<0||o.x>c.width)o.vx*=-1;if(o.y<0||o.y>c.height)o.vy*=-1;ctx.beginPath();ctx.arc(o.x,o.y,o.s,0,6.28);ctx.fill()});requestAnimationFrame(a)})();
document.addEventListener('mousemove',e=>{document.querySelector('.mouse-glow').style=`left:${e.pageX}px;top:${e.pageY}px`});
document.addEventListener('click',e=>{if(e.target.classList.contains('ripple')){let r=document.createElement('span');r.className='ripple-effect';let b=e.target.getBoundingClientRect();r.style=`left:${e.clientX-b.left}px;top:${e.clientY-b.top}px`;e.target.appendChild(r);setTimeout(()=>r.remove(),600)}});
new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('active'))).observe(document.body);

function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');scrollTo(0,0)}

// PIN LOGIC
document.querySelectorAll('.pin-inputs input').forEach((inp,i,arr)=>{inp.addEventListener('input',()=>{if(inp.value.length==1&&i<3)arr[i+1].focus();if(i==3)checkPin()})});
function checkPin(){
  const pin=[...document.querySelectorAll('.pin-inputs input')].map(i=>i.value).join('');
  const box=document.getElementById('pinBox');
  if(pin===CORRECT_PIN){
    box.classList.add('green-glow');
    navigator.vibrate&&navigator.vibrate(50);
    toast('Access Granted ✅');
    confetti();
    setTimeout(()=>showPage('generator'),800);
  }else{
    box.classList.add('shake','red-glow');
    navigator.vibrate&&navigator.vibrate([100,50,100]);
    toast('Wrong Access Code ❌');
    document.getElementById('pin-error').innerText='Wrong Access Code';
    setTimeout(()=>{box.classList.remove('shake','red-glow');document.querySelectorAll('.pin-inputs input').forEach(i=>i.value='');document.querySelector('.pin-inputs input').focus()},400);
  }
}

// DEVICE SEARCH - DEBOUNCED
let searchTimeout;
document.getElementById('deviceSearch').addEventListener('input',e=>{
  clearTimeout(searchTimeout);
  searchTimeout=setTimeout(()=>searchDevices(e.target.value),150);
});

function searchDevices(q){
  const box=document.getElementById('suggestions');
  if(!q){box.style.display='none';return}
  const res=DEVICE_DB.filter(d=>d.name.toLowerCase().includes(q.toLowerCase())).slice(0,10);
  box.innerHTML=res.map(d=>`<div onclick='selectDevice(${JSON.stringify(d).replace(/'/g,"&apos;")})'><span>${highlight(d.name,q)}</span><span>${d.brand}</span></div>`).join('');
  box.style.display=res.length?'block':'none';
}
function highlight(text,q){return text.replace(new RegExp(q,'gi'),m=>`<b>${m}</b>`)}
function selectDevice(d){
  currentDevice=d;
  document.getElementById('deviceSearch').value=d.name;
  document.getElementById('suggestions').style.display='none';
  document.getElementById('deviceSpecs').style.display='block';
  document.getElementById('deviceSpecs').innerHTML=`
    <h3>${d.name}</h3>
    <p><b>Brand:</b> ${d.brand} | <b>RAM:</b> ${d.ram} | <b>CPU:</b> ${d.cpu}</p>
    <p><b>GPU:</b> ${d.gpu} | <b>Display:</b> ${d.screen}" ${d.resolution} ${d.refresh}</p>
    <p><b>Touch:</b> ${d.touch} | <b>Gyro:</b> ${d.gyro?'Yes':'No'} | <b>Score:</b> ${d.score}/100</p>
  `;
  document.getElementById('generateBtn').disabled=false;
}

// GENERATOR
document.getElementById('generateBtn').onclick=startAI;
function startAI(){
  showPage('ai');
  const steps=["AI Detecting Device...","Scanning CPU...","Scanning GPU...","Checking Display...","Checking Touch Sampling...","Optimizing Headshots...","Calculating Recoil...","Training AI...","Building Final Profile..."];
  let i=0;
  const int=setInterval(()=>{
    document.getElementById('ai-text').innerText=steps[i];
    document.getElementById('progress').style.width=((i+1)*100/steps.length)+'%';
    document.getElementById('progress-percent').innerText=Math.round((i+1)*100/steps.length)+'%';
    i++;
    if(i>=steps.length){clearInterval(int);generateResult()}
  },550);
}

function generateResult(){
  const base = currentDevice.score>90?100:currentDevice.score>80?95:90;
  currentSensi={General:base,RedDot:base-5,TwoX:base-10,FourX:base-15,Sniper:base-30,FreeLook:100,Gyro:currentDevice.gyro?80:0};
  document.getElementById('resultSpecs').innerHTML=`<p><b>Device:</b> ${currentDevice.name} | <b>Performance:</b> ${currentDevice.score}/100 | <b>FPS:</b> ${currentDevice.fps}</p>`;
  document.getElementById('resultSensi').innerHTML=Object.entries(currentSensi).map(([k,v])=>`<div class="glass-card"><b>${k}</b><p>${v}</p></div>`).join('');
  let h=JSON.parse(localStorage.getItem('zeus_h')||'[]');h.unshift({d:currentDevice.name,t:Date.now(),s:currentSensi});localStorage.setItem('zeus_h',JSON.stringify(h.slice(0,5)));showHistory();
  showPage('results');confetti();
}

function showHistory(){const h=JSON.parse(localStorage.getItem('zeus_h')||'[]');if(h.length)document.getElementById('history').innerHTML='<h3>Recent</h3>'+h.map(x=>`<p>${x.d}</p>`).join('')}
function copySensi(){navigator.clipboard.writeText(Object.entries(currentSensi).map(([k,v])=>`${k}: ${v}`).join('\n'));toast('Copied ✅')}
function exportPNG(){toast('Exported ✅')}
function saveFavorite(){localStorage.setItem('fav',JSON.stringify(currentSensi));toast('Saved ⭐')}
function toast(m){const t=document.getElementById('toast');t.innerText=m;t.style.display='block';setTimeout(()=>t.style.display='none',2000)}
function confetti(){for(let i=0;i<50;i++){let c=document.createElement('div');c.style=`position:fixed;top:-10px;left:${Math.random()*100}%;width:8px;height:8px;background:#FF6A00;z-index:999;animation:fall 1.5s linear`;document.body.appendChild(c);setTimeout(()=>c.remove(),1500)}}

// INIT TOGGLES
['Headshot','Balanced','Rush','Drag','Sniper'].forEach(s=>styleToggles.innerHTML+=`<button class="toggle-btn ripple">${s}</button>`);
['2','3','4','5'].forEach(f=>fingerToggles.innerHTML+=`<button class="toggle-btn ripple">${f} Finger</button>`);
['ON','OFF'].forEach(g=>gyroToggles.innerHTML+=`<button class="toggle-btn ripple">${g}</button>`);
document.addEventListener('click',e=>{if(e.target.classList.contains('toggle-btn'))e.target.classList.toggle('active')});
