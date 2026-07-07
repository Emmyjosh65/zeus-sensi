const ACCESS = "2007";
let step1Complete = localStorage.getItem('step1') === 'true';
let xp = parseInt(localStorage.getItem('xp')) || 0;

const phoneDB = {
  iPhone:["iPhone 6","6 Plus","6s","6s Plus","7","7 Plus","8","8 Plus","X","XR","XS","XS Max","11","11 Pro","11 Pro Max","12","12 Mini","12 Pro","12 Pro Max","13","13 Mini","13 Pro","13 Pro Max","14","14 Plus","14 Pro","14 Pro Max","15","15 Plus","15 Pro","15 Pro Max"],
  Samsung:["Galaxy S10","S10+","S20","S20 Ultra","S21","S21 Ultra","S22","S22 Ultra","S23","S23 Ultra","S24","S24 Ultra","Note 10","Note 20 Ultra","A14","A34","A54","M34","F54"],
  Tecno:["Spark 8","Spark 10","Spark 20 Pro","Camon 18","Camon 20 Pro","Camon 30","Pova 4","Pova 5 Pro","Pova 6"],
  Infinix:["Hot 10","Hot 30i","Hot 40","Note 10","Note 30 Pro","Note 40","Zero 20","Zero 30"],
  Xiaomi:["Mi 11","Mi 13 Pro","Redmi Note 10","Note 11","Note 12","Note 13 Pro","Redmi 10","Redmi 13","POCO X5","POCO F5"],
  Realme:["8","10","11 Pro","C55","GT 3"],
  Oppo:["A16","A78","Reno 8","Reno 10","Reno 11","Find X6"],
  Vivo:["Y16","Y36","V25","V29","X80","X90"],
  OnePlus:["Nord 2","Nord 3","10 Pro","11","12"],
  "Google Pixel":["Pixel 6","Pixel 7a","Pixel 8 Pro"],
  Nothing:["Phone 1","Phone 2"],
  Motorola:["Edge 30","Edge 40","G84"],
  Huawei:["P40","P50","P60","Nova 11"],
  Honor:["X8b","X9b","90","100"],
  "ROG Phone":["5","6","7","8"],
  "Black Shark":["4","5 Pro"],
  "Red Magic":["7","8 Pro","9"]
};

window.onload = () => {
  if(step1Complete) document.getElementById('step2').classList.remove('hidden');
  loadDropdowns(); animateCounters(); particleBackground();
}

function step1Done(){
  document.getElementById('step1Loader').classList.remove('hidden');
  setTimeout(()=>{localStorage.setItem('step1','true'); document.getElementById('step2').classList.remove('hidden')},2000)
}

function loadDropdowns(){
  const brand = document.getElementById('brand');
  Object.keys(phoneDB).forEach(b=>brand.innerHTML+=`<option>${b}</option>`);
  brand.onchange = ()=>{const m=document.getElementById('model'); m.innerHTML=''; phoneDB[brand.value].forEach(x=>m.innerHTML+=`<option>${x}</option>`)};
  fill('ram',["2GB","3GB","4GB","6GB","8GB","12GB","16GB"]);
  fill('processor',["Snapdragon 8 Gen 3","Dimensity 9200","A17 Pro","Helio G99","Exynos 2400"]);
  fill('refresh',["60Hz","90Hz","120Hz","144Hz","165Hz"]);
  fill('android',["10","11","12","13","14","iOS 16","iOS 17"]);
  fill('gameplay',["Headshot","Balanced","One Tap","Sniper","Close Range","Long Range"]);
  fill('fingers',["2 Finger","3 Finger","4 Finger","5 Finger"]);
}
function fill(id,arr){document.getElementById(id).innerHTML = arr.map(i=>`<option>${i}</option>`).join('')}

function generateAI(){
  if(document.getElementById('accessCode').value!== ACCESS){
    document.getElementById('keyError').classList.remove('hidden');
    setTimeout(()=>document.getElementById('keyError').classList.add('hidden'),3000);
    return;
  }
  document.getElementById('aiLoading').classList.remove('hidden');
  const steps = ["Scanning Device...","Checking FPS...","Detecting Display...","Analyzing Touch Delay...","Optimizing Gyroscope...","Training AI...","Finding Best Settings...","Generating Final Result..."];
  let i=0;
  const interval = setInterval(()=>{
    document.getElementById('aiStep').innerText = steps[i];
    document.getElementById('progress').style.width = ((i+1)/steps.length*100)+'%';
    document.getElementById('percent').innerText = Math.round((i+1)/steps.length*100)+'%';
    i++;
    if(i===steps.length){clearInterval(interval); showResult();}
  },600);
}

function showResult(){
  document.getElementById('aiLoading').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  const g = Math.floor(Math.random()*30)+70;
  document.getElementById('resultGrid').innerHTML = `
    <div class="glass" style="padding:20px"><h3>General</h3><p>${g}</p></div>
    <div class="glass" style="padding:20px"><h3>Red Dot</h3><p>${g+15}</p></div>
    <div class="glass" style="padding:20px"><h3>2X Scope</h3><p>${g+8}</p></div>
    <div class="glass" style="padding:20px"><h3>4X Scope</h3><p>${g-5}</p></div>
    <div class="glass" style="padding:20px"><h3>Sniper</h3><p>${g-15}</p></div>
    <div class="glass" style="padding:20px"><h3>DPI</h3><p>${650+Math.random()*200}</p></div>
    <div class="glass" style="padding:20px"><h3>Headshot Accuracy</h3><p>${92+Math.random()*5}%</p></div>
    <div class="glass" style="padding:20px"><h3>Gyroscope</h3><p>Optimized</p></div>
    <div class="glass" style="padding:20px"><h3>Device Temperature</h3><p>Cool</p></div>
    <div class="glass" style="padding:20px"><h3>Network</h3><p>Low Ping</p></div>
    <div class="glass" style="padding:20px;grid-column:1/-1"><h3>Pro Tip</h3><p>Use ${document.getElementById('fingers').value} claw for better drag. Keep graphics on Smooth for max FPS.</p></div>
  `;
  xp+=20; localStorage.setItem('xp',xp); document.getElementById('level').innerText = Math.floor(xp/100)+1;
}

function animateCounters(){
  document.querySelectorAll('.counter').forEach(c=>{
    let target = +c.dataset.target;
    let count=0; const inc = target/100;
    const timer = setInterval(()=>{count+=inc; c.innerText = Math.floor(count); if(count>=target) clearInterval(timer)},20)
  });
  setInterval(()=>{document.getElementById('liveUsers').innerText = 2800+Math.floor(Math.random()*200)},3000);
}

function particleBackground(){
  const canvas = document.getElementById('particles'); const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  let particles = Array(80).fill().map(()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2,dx:Math.random()-0.5,dy:Math.random()-0.5}));
  function draw(){ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle='rgba(255,106,0,0.5)'; particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.x+=p.dx;p.y+=p.dy}) ; requestAnimationFrame(draw)} draw();
}

function copySettings(){navigator.clipboard.writeText(document.getElementById('resultGrid').innerText)}
function shareSettings(){navigator.share? navigator.share({title:'ZEUS SENSI'}) : copySettings()}
function downloadScreenshot(){window.print()}
function saveFav(){alert('Saved to Favorites')}
function compareDevice(){alert('Compare feature coming soon')}
function randomGen(){alert('Random sensitivity generated')}
function searchDevice(){}
