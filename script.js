const DEVICE_DB = [
{"name":"iPhone 18 Pro Max","brand":"Apple","ram":"12GB","cpu":"A20 Bionic","score":100,"fps":"120"},
{"name":"iPhone 15 Pro Max","brand":"Apple","ram":"8GB","cpu":"A17 Pro","score":97,"fps":"90"},
{"name":"iPhone 13","brand":"Apple","ram":"4GB","cpu":"A15 Bionic","score":88,"fps":"60"},
{"name":"iPhone 6","brand":"Apple","ram":"1GB","cpu":"A8","score":53,"fps":"60"},
{"name":"Samsung Galaxy S24 Ultra","brand":"Samsung","ram":"12GB","cpu":"Snapdragon 8 Gen 3","score":98,"fps":"90"},
{"name":"Tecno Spark 20 Pro","brand":"Tecno","ram":"8GB","cpu":"Helio G99","score":75,"fps":"60"},
{"name":"Infinix Note 40 Pro","brand":"Infinix","ram":"12GB","cpu":"Dimensity 7020","score":82,"fps":"90"},
{"name":"Poco X6 Pro","brand":"Poco","ram":"12GB","cpu":"Dimensity 8300","score":90,"fps":"90"}
];

let currentDevice = null;
let currentSensi = {};
const CORRECT_PIN = "2007";

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0)
}

document.querySelectorAll('.pin-inputs input').forEach((inp,i,arr)=>{
  inp.addEventListener('input',()=>{if(inp.value.length==1 && i<3) arr[i+1].focus(); if(i==3) checkPin()})
});

function checkPin(){
  const pin = [...document.querySelectorAll('.pin-inputs input')].map(i=>i.value).join('');
  const box = document.getElementById('pinBox');
  if(pin === CORRECT_PIN){
    box.classList.add('green-glow');
    toast('Access Granted ✅');
    setTimeout(()=>showPage('generator'),600);
  }else{
    box.classList.add('shake','red-glow');
    toast('Wrong Access Code ❌');
    setTimeout(()=>{box.classList.remove('shake','red-glow');document.querySelectorAll('.pin-inputs input').forEach(i=>i.value='')},500);
  }
}

document.getElementById('deviceSearch').addEventListener('input',e=>{
  const q = e.target.value.toLowerCase();
  const box = document.getElementById('suggestions');
  if(!q){box.style.display='none';return}
  const res = DEVICE_DB.filter(d=>d.name.toLowerCase().includes(q)).slice(0,8);
  box.innerHTML = res.map(d=>`<div onclick='selectDevice("${d.name}")'>${d.name} - ${d.brand}</div>`).join('');
  box.style.display = res.length ? 'block' : 'none';
});

function selectDevice(name){
  currentDevice = DEVICE_DB.find(d=>d.name === name);
  document.getElementById('deviceSearch').value = name;
  document.getElementById('suggestions').style.display = 'none';
  document.getElementById('deviceSpecs').style.display = 'block';
  document.getElementById('deviceSpecs').innerHTML = `<h3>${currentDevice.name}</h3><p>RAM: ${currentDevice.ram} | CPU: ${currentDevice.cpu}</p>`;
  document.getElementById('generateBtn').disabled = false;
}

document.getElementById('generateBtn').onclick = ()=>{
  showPage('ai');
  let i=0;
  const int = setInterval(()=>{
    document.getElementById('progress').style.width = ((i+1)*20)+'%';
    i++;
    if(i>=5){clearInterval(int);generateResult()}
  },500);
}

function generateResult(){
  const base = currentDevice.score > 90 ? 100 : 95;
  currentSensi = {General:base,RedDot:base-5,Scope2X:base-10,Scope4X:base-15,Sniper:base-30};
  document.getElementById('resultSpecs').innerHTML = `<p><b>Device:</b> ${currentDevice.name}</p>`;
  document.getElementById('resultSensi').innerHTML = Object.entries(currentSensi).map(([k,v])=>`<div class="glass-card"><b>${k}</b><p>${v}</p></div>`).join('');
  showPage('results');
}

function copySensi(){
  navigator.clipboard.writeText(Object.entries(currentSensi).map(([k,v])=>`${k}: ${v}`).join('\n'));
  toast('Copied ✅')
}

function toast(m){const t=document.getElementById('toast');t.innerText=m;t.style.display='block';setTimeout(()=>t.style.display='none',2000)}
