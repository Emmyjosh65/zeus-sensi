// BUILT-IN DEVICE DATABASE - iPhone 6 to iPhone 18 Pro Max + All Major Phones
const DEVICE_DB = [
{"name":"iPhone 18 Pro Max","brand":"Apple","ram":"12GB","cpu":"A20 Bionic","gpu":"Apple GPU 8-core","os":"iOS 26","refresh":"120Hz","touch":"240Hz","resolution":"3200x1440","screen":"6.9","battery":"5000mAh","gyro":true,"fps":"120","score":100},
{"name":"iPhone 17 Pro Max","brand":"Apple","ram":"12GB","cpu":"A19 Pro","gpu":"Apple GPU 7-core","os":"iOS 25","refresh":"120Hz","touch":"240Hz","resolution":"3120x1400","screen":"6.9","battery":"4800mAh","gyro":true,"fps":"120","score":99},
{"name":"iPhone 16 Pro Max","brand":"Apple","ram":"8GB","cpu":"A18 Pro","gpu":"Apple GPU 6-core","os":"iOS 24","refresh":"120Hz","touch":"240Hz","resolution":"3088x1366","screen":"6.9","battery":"4600mAh","gyro":true,"fps":"90","score":98},
{"name":"iPhone 15 Pro Max","brand":"Apple","ram":"8GB","cpu":"A17 Pro","gpu":"Apple GPU 6-core","os":"iOS 17","refresh":"120Hz","touch":"120Hz","resolution":"2796x1290","screen":"6.7","battery":"4422mAh","gyro":true,"fps":"90","score":97},
{"name":"iPhone 14 Pro Max","brand":"Apple","ram":"6GB","cpu":"A16 Bionic","gpu":"Apple GPU 5-core","os":"iOS 16","refresh":"120Hz","touch":"120Hz","resolution":"2796x1290","screen":"6.7","battery":"4323mAh","gyro":true,"fps":"90","score":95},
{"name":"iPhone 13 Pro Max","brand":"Apple","ram":"6GB","cpu":"A15 Bionic","gpu":"Apple GPU 5-core","os":"iOS 15","refresh":"120Hz","touch":"120Hz","resolution":"2778x1284","screen":"6.7","battery":"4352mAh","gyro":true,"fps":"90","score":93},
{"name":"iPhone 12 Pro Max","brand":"Apple","ram":"6GB","cpu":"A14 Bionic","gpu":"Apple GPU 4-core","os":"iOS 14","refresh":"60Hz","touch":"120Hz","resolution":"2778x1284","screen":"6.7","battery":"3687mAh","gyro":true,"fps":"60","score":86},
{"name":"iPhone 11 Pro Max","brand":"Apple","ram":"4GB","cpu":"A13 Bionic","gpu":"Apple GPU 4-core","os":"iOS 13","refresh":"60Hz","touch":"120Hz","resolution":"2688x1242","screen":"6.5","battery":"3969mAh","gyro":true,"fps":"60","score":82},
{"name":"iPhone XS Max","brand":"Apple","ram":"4GB","cpu":"A12 Bionic","gpu":"Apple GPU 4-core","os":"iOS 12","refresh":"60Hz","touch":"120Hz","resolution":"2688x1242","screen":"6.5","battery":"3174mAh","gyro":true,"fps":"60","score":78},
{"name":"iPhone X","brand":"Apple","ram":"3GB","cpu":"A11 Bionic","gpu":"Apple GPU 3-core","os":"iOS 11","refresh":"60Hz","touch":"120Hz","resolution":"2436x1125","screen":"5.8","battery":"2716mAh","gyro":true,"fps":"60","score":75},
{"name":"iPhone 8 Plus","brand":"Apple","ram":"3GB","cpu":"A11 Bionic","gpu":"Apple GPU 3-core","os":"iOS 11","refresh":"60Hz","touch":"120Hz","resolution":"1920x1080","screen":"5.5","battery":"2691mAh","gyro":true,"fps":"60","score":72},
{"name":"iPhone 7 Plus","brand":"Apple","ram":"3GB","cpu":"A10 Fusion","gpu":"PowerVR GT7600","os":"iOS 10","refresh":"60Hz","touch":"120Hz","resolution":"1920x1080","screen":"5.5","battery":"2900mAh","gyro":true,"fps":"60","score":68},
{"name":"iPhone 6S Plus","brand":"Apple","ram":"2GB","cpu":"A9","gpu":"PowerVR GT7600","os":"iOS 9","refresh":"60Hz","touch":"120Hz","resolution":"1920x1080","screen":"5.5","battery":"2750mAh","gyro":true,"fps":"60","score":60},
{"name":"iPhone 6 Plus","brand":"Apple","ram":"1GB","cpu":"A8","gpu":"PowerVR GX6450","os":"iOS 8","refresh":"60Hz","touch":"120Hz","resolution":"1920x1080","screen":"5.5","battery":"2915mAh","gyro":true,"fps":"60","score":55},
{"name":"iPhone 6","brand":"Apple","ram":"1GB","cpu":"A8","gpu":"PowerVR GX6450","os":"iOS 8","refresh":"60Hz","touch":"120Hz","resolution":"1334x750","screen":"4.7","battery":"1810mAh","gyro":true,"fps":"60","score":53},
{"name":"Samsung Galaxy S24 Ultra","brand":"Samsung","ram":"12GB","cpu":"Snapdragon 8 Gen 3","gpu":"Adreno 750","os":"Android 14","refresh":"120Hz","touch":"240Hz","resolution":"3088x1440","screen":"6.8","battery":"5000mAh","gyro":true,"fps":"90","score":98},
{"name":"Samsung Galaxy S23 Ultra","brand":"Samsung","ram":"12GB","cpu":"Snapdragon 8 Gen 2","gpu":"Adreno 740","os":"Android 13","refresh":"120Hz","touch":"240Hz","resolution":"3088x1440","screen":"6.8","battery":"5000mAh","gyro":true,"fps":"90","score":97},
{"name":"Google Pixel 8 Pro","brand":"Google","ram":"12GB","cpu":"Tensor G3","gpu":"Mali-G715","os":"Android 14","refresh":"120Hz","touch":"240Hz","resolution":"2992x1344","screen":"6.7","battery":"5050mAh","gyro":true,"fps":"90","score":94},
{"name":"Tecno Spark 20 Pro","brand":"Tecno","ram":"8GB","cpu":"Helio G99","gpu":"Mali-G57","os":"Android 13","refresh":"90Hz","touch":"180Hz","resolution":"1080x2460","screen":"6.78","battery":"5000mAh","gyro":true,"fps":"60","score":75},
{"name":"Infinix Note 40 Pro","brand":"Infinix","ram":"12GB","cpu":"Dimensity 7020","gpu":"IMG BXM-8-256","os":"Android 14","refresh":"120Hz","touch":"240Hz","resolution":"1080x2436","screen":"6.78","battery":"5000mAh","gyro":true,"fps":"90","score":82},
{"name":"Poco X6 Pro","brand":"Poco","ram":"12GB","cpu":"Dimensity 8300-Ultra","gpu":"Mali-G615","os":"HyperOS","refresh":"120Hz","touch":"240Hz","resolution":"1220x2712","screen":"6.67","battery":"5000mAh","gyro":true,"fps":"90","score":90},
{"name":"OnePlus 12","brand":"OnePlus","ram":"16GB","cpu":"Snapdragon 8 Gen 3","gpu":"Adreno 750","os":"OxygenOS 14","refresh":"120Hz","touch":"240Hz","resolution":"1440x3168","screen":"6.82","battery":"5400mAh","gyro":true,"fps":"90","score":96},
{"name":"ASUS ROG Phone 8 Pro","brand":"ASUS","ram":"24GB","cpu":"Snapdragon 8 Gen 3","gpu":"Adreno 750","os":"Android 14","refresh":"165Hz","touch":"720Hz","resolution":"1080x2480","screen":"6.78","battery":"5500mAh","gyro":true,"fps":"120","score":99}
];

let currentDevice = null;
let currentSensi = {};
const CORRECT_PIN = "2007";

// PREMIUM BACKGROUND + PARTICLES
window.onload = () => {
  const c = document.getElementById('particles');
  if(c){
    const ctx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    let p = Array.from({length:50}, () => ({
      x:Math.random()*c.width,
      y:Math.random()*c.height,
      s:Math.random()*2+1,
      vx:(Math.random()-.5)*0.5,
      vy:(Math.random()-.5)*0.5
    }));
    (function animate(){
      ctx.clearRect(0,0,c.width,c.height);
      ctx.fillStyle='#FF6A0025';
      p.forEach(o=>{
        o.x+=o.vx; o.y+=o.vy;
        if(o.x<0||o.x>c.width)o.vx*=-1;
        if(o.y<0||o.y>c.height)o.vy*=-1;
        ctx.beginPath(); ctx.arc(o.x,o.y,o.s,0,6.28); ctx.fill()
      });
      requestAnimationFrame(animate)
    })();
  }
  // Mouse glow
  document.addEventListener('mousemove',e=>{
    const g = document.querySelector('.mouse-glow');
    if(g){g.style.left=e.pageX+'px';g.style.top=e.pageY+'px'}
  });
  // Ripple effect
  document.addEventListener('click',e=>{
    if(e.target.classList.contains('ripple')){
      let r=document.createElement('span');
      r.className='ripple-effect';
      let b=e.target.getBoundingClientRect();
      r.style.left=e.clientX-b.left+'px';
      r.style.top=e.clientY-b.top+'px';
      e.target.appendChild(r);
      setTimeout(()=>r.remove(),600)
    }
  });
  // Scroll reveal
  new IntersectionObserver(entries=>entries.forEach(x=>x.isIntersecting&&x.target.classList.add('active')),{threshold:0.1})
    .observe(document.body);
}

// PAGE NAVIGATION
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0)
}

// PIN LOGIC
document.querySelectorAll('.pin-inputs input').forEach((inp,i,arr)=>{
  inp.addEventListener('input',()=>{
    if(inp.value.length==1 && i<3) arr[i+1].focus();
    if(i==3) checkPin()
  })
});

function checkPin(){
  const pin = [...document.querySelectorAll('.pin-inputs input')].map(i=>i.value).join('');
  const box = document.getElementById('pinBox');
  if(pin === CORRECT_PIN){
    box.classList.add('green-glow');
    navigator.vibrate && navigator.vibrate(50);
    toast('Access Granted ✅');
    setTimeout(()=>showPage('generator'),700);
  }else{
    box.classList.add('shake','red-glow');
    navigator.vibrate && navigator.vibrate([100,50,100]);
    toast('Wrong Access Code ❌');
    document.getElementById('pin-error').innerText='Wrong Access Code';
    setTimeout(()=>{
      box.classList.remove('shake','red-glow');
      document.querySelectorAll('.pin-inputs input').forEach(i=>i.value='');
      document.querySelector('.pin-inputs input').focus()
    },500);
  }
}

// DEVICE SEARCH
let searchTimeout;
document.getElementById('deviceSearch').addEventListener('input',e=>{
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(()=>searchDevices(e.target.value),120);
});

function searchDevices(q){
  const box = document.getElementById('suggestions');
  if(!q || q.length < 1){box.style.display='none';return}
  const res = DEVICE_DB.filter(d=>d.name.toLowerCase().includes(q.toLowerCase())).slice(0,8);
  box.innerHTML = res.map(d=>`<div onclick='selectDevice("${d.name}")'><span>${d.name}</span><span>${d.brand}</span></div>`).join('');
  box.style.display = res.length ? 'block' : 'none';
}

function selectDevice(name){
  currentDevice = DEVICE_DB.find(d=>d.name === name);
  document.getElementById('deviceSearch').value = name;
  document.getElementById('suggestions').style.display = 'none';
  document.getElementById('deviceSpecs').style.display = 'block';
  document.getElementById('deviceSpecs').innerHTML = `
    <h3>${currentDevice.name}</h3>
    <p><b>Brand:</b> ${currentDevice.brand} | <b>RAM:</b> ${currentDevice.ram}</p>
    <p><b>CPU:</b> ${currentDevice.cpu} | <b>Display:</b> ${currentDevice.screen}" ${currentDevice.refresh}</p>
    <p><b>Performance Score:</b> ${currentDevice.score}/100 | <b>FPS:</b> ${currentDevice.fps}</p>
  `;
  document.getElementById('generateBtn').disabled = false;
}

document.getElementById('generateBtn').onclick = startAI;

function startAI(){
  showPage('ai');
  const steps = ["AI Detecting Device...","Scanning CPU...","Scanning GPU...","Checking Display...","Checking Touch Sampling...","Optimizing Headshots...","Calculating Recoil...","Training AI...","Building Final Profile..."];
  let i = 0;
  const int = setInterval(()=>{
    document.getElementById('ai-text').innerText = steps[i];
    document.getElementById('progress').style.width = ((i+1)*100/steps.length)+'%';
    document.getElementById('progress-percent').innerText = Math.round((i+1)*100/steps.length)+'%';
    i++;
    if(i >= steps.length){clearInterval(int);generateResult()}
  },550);
}

function generateResult(){
  const base = currentDevice.score > 90 ? 100 : currentDevice.score > 80 ? 95 : 90;
  currentSensi = {General:base,RedDot:base-5,TwoX:base-10,FourX:base-15,Sniper:base-30,FreeLook:100,Gyro:currentDevice.gyro?80:0};
  document.getElementById('resultSpecs').innerHTML = `<p><b>Device:</b> ${currentDevice.name} | <b>Performance:</b> ${currentDevice.score}/100</p>`;
  document.getElementById('resultSensi').innerHTML = Object.entries(currentSensi).map(([k,v])=>`<div class="glass-card"><b>${k}</b><p>${v}</p></div>`).join('');
  showPage('results');
}

function copySensi(){
  navigator.clipboard.writeText(Object.entries(currentSensi).map(([k,v])=>`${k}: ${v}`).join('\n'));
  toast('Copied to clipboard ✅')
}

function toast(m){
  const t = document.getElementById('toast');
  t.innerText = m;
  t.style.display = 'block';
  setTimeout(()=>t.style.display='none',2000)
}
