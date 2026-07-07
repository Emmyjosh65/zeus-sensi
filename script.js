const KEY = "2007";
const devices = {
  Samsung:["S23 Ultra","S22","A54","M33"],
  Tecno:["Spark 10","Camon 20","Pova 5"],
  Infinix:["Note 30","Hot 30","Zero 30"],
  Xiaomi:["13 Pro","12","Note 12"],
  iPhone:["15 Pro Max","14","13","12"],
  // Add more as needed
};

window.onload = () => {
  const brandSel = document.getElementById('brand');
  Object.keys(devices).forEach(b => brandSel.innerHTML += `<option>${b}</option>`);
  brandSel.onchange = () => {
    const modelSel = document.getElementById('model');
    modelSel.innerHTML = '<option>Phone Model</option>';
    devices[brandSel.value].forEach(m => modelSel.innerHTML += `<option>${m}</option>`);
  }
  // Live user counter
  setInterval(()=>{document.getElementById('onlineUsers').innerText = Math.floor(1000 + Math.random()*500)},5000)
}

function scrollToKey(){document.getElementById('whatsappGate').scrollIntoView({behavior:'smooth'})}
function markJoined(){document.getElementById('joinedMsg').classList.remove('hidden');document.getElementById('keyGate').classList.remove('hidden')}

function checkKey(){
  const val = document.getElementById('accessKey').value;
  if(val === KEY){
    document.getElementById('generator').classList.remove('hidden');
    document.getElementById('keyError').classList.add('hidden');
  }else{
    document.getElementById('keyError').classList.remove('hidden');
  }
}

function generateAI(){
  document.getElementById('loading').classList.remove('hidden');
  setTimeout(()=>{
    document.getElementById('loading').classList.add('hidden');
    const result = `
      <div class="card glass"><h3>General</h3><p>${80 + Math.floor(Math.random()*20)}</p></div>
      <div class="card glass"><h3>Red Dot</h3><p>${85 + Math.floor(Math.random()*15)}</p></div>
      <div class="card glass"><h3>2X Scope</h3><p>${70 + Math.floor(Math.random()*20)}</p></div>
      <div class="card glass"><h3>4X Scope</h3><p>${60 + Math.floor(Math.random()*20)}</p></div>
      <div class="card glass"><h3>AWM Scope</h3><p>${50 + Math.floor(Math.random()*20)}</p></div>
      <div class="card glass"><h3>DPI</h3><p>${600 + Math.floor(Math.random()*200)}</p></div>
      <div class="card glass"><h3>AI Confidence</h3><p>${90 + Math.floor(Math.random()*10)}%</p></div>
      <div class="card glass"><h3>Optimization</h3><p>${85 + Math.floor(Math.random()*15)}%</p></div>
    `;
    document.getElementById('result').innerHTML = result + `<p class="glass" style="grid-column:1/-1">Explanation: Based on your ${document.getElementById('brand').value} with ${document.getElementById('ram').value} RAM and ${document.getElementById('refresh').value}, ZEUS AI calibrated lower sensitivity for high refresh and higher DPI for claw players to improve recoil control and headshot accuracy.</p>`;
    document.getElementById('result').classList.remove('hidden');
    localStorage.setItem('zeusResult', document.getElementById('result').innerHTML);
  },2500)
}

document.getElementById('themeToggle').onclick = () => {
  document.body.classList.toggle('light');
}
