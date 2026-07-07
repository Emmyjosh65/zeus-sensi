/* script.js — ZEUS SENSI AI
   Vanilla JS interactions: panels, pin, device search, AI simulation, storage, export
*/
const OWNER='ZEUS';
const ACCESS_CODE='2007'; // premium code

/* Canvas background particles */
class ParticlesBackground{
  constructor(canvasId){
    this.canvas=document.getElementById(canvasId);if(!this.canvas)return;
    this.ctx=this.canvas.getContext('2d');this.particles=[];this.resize();
    window.addEventListener('resize',()=>this.resize());
    requestAnimationFrame(()=>this.loop());
  }
  resize(){this.canvas.width=innerWidth;this.canvas.height=innerHeight}
  loop(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    if(this.particles.length<60) this.particles.push(this.create());
    this.particles.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;p.size*=0.999;p.life--;this.ctx.fillStyle=p.color;this.ctx.beginPath();this.ctx.ellipse(p.x,p.y,p.size,p.size,0,0,Math.PI*2);this.ctx.fill();if(p.life<0||p.size<0.2) this.particles.splice(i,1)});
    requestAnimationFrame(()=>this.loop());
  }
  create(){return{ x:Math.random()*this.canvas.width, y:Math.random()*this.canvas.height, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4, size:6+Math.random()*18, color:`rgba(255,${120+Math.floor(Math.random()*120)},${30+Math.floor(Math.random()*200)},${0.06+Math.random()*0.2})`, life:200+Math.random()*200 }}
}

/* Simple confetti - canvas */
function launchConfetti(){const c=document.createElement('canvas');c.style.position='fixed';c.style.left=0;c.style.top=0;c.width=innerWidth;c.height=innerHeight;c.style.pointerEvents='none';document.body.appendChild(c);const ctx=c.getContext('2d');let conf=[];for(let i=0;i<140;i++){conf.push({x:Math.random()*c.width,y:Math.random()*-c.height,vx:(Math.random()-0.5)*6,vy:2+Math.random()*6,size:4+Math.random()*8,color:`hsl(${Math.random()*360}deg,80%,60%)`,rot:Math.random()*360})}
  const t=setInterval(()=>{ctx.clearRect(0,0,c.width,c.height);conf.forEach((p)=>{p.x+=p.vx;p.y+=p.vy;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.color;ctx.fillRect(0,0,p.size,p.size);ctx.restore()});conf=conf.filter(p=>p.y<c.height+50);if(conf.length===0){clearInterval(t);document.body.removeChild(c)}},16)
}

/* Toast */
function toast(msg,delay=2400){const t=document.getElementById('toast');if(!t)return; t.textContent=msg; t.style.display='block'; t.style.opacity='1'; setTimeout(()=>{t.style.opacity='0';setTimeout(()=>t.style.display='none',300)},delay)}

/* Panel interactions for landing */
(function(){
  new ParticlesBackground('bg-canvas');
  const openJoin=document.getElementById('open-join');
  const joinPanel=document.getElementById('join-panel');
  const closeJoin=document.getElementById('close-join');
  const joinWa=document.getElementById('join-wa');
  const joinedCta=document.getElementById('joined-cta');
  const continueToCode=document.getElementById('continue-to-code');
  const codePanel=document.getElementById('code-panel');
  const closeCode=document.getElementById('close-code');
  const closeCodeX=document.getElementById('close-code-x');
  const validateCode=document.getElementById('validate-code');
  const pins=document.querySelectorAll('.pin');
  const codeMsg=document.getElementById('code-msg');

  function show(panel){panel.classList.add('show')}
  function hide(panel){panel.classList.remove('show')}

  openJoin.addEventListener('click',e=>{e.preventDefault();show(joinPanel)})
  closeJoin.addEventListener('click',()=>hide(joinPanel))
  joinWa.addEventListener('click',()=>{ // fake join flow
    // After clicking, reveal Already Joined CTA
    setTimeout(()=>{joinedCta.hidden=false; toast('WhatsApp opened - mark as joined')},600)
  })
  continueToCode.addEventListener('click',e=>{e.preventDefault();hide(joinPanel);setTimeout(()=>show(codePanel),240)})

  closeCode.addEventListener('click',()=>hide(codePanel))
  closeCodeX.addEventListener('click',()=>hide(codePanel))

  // PIN behavior
  pins.forEach((p,i)=>{
    p.addEventListener('input',(e)=>{
      if(p.value.length) {if(i<pins.length-1)pins[i+1].focus();}
    });
    p.addEventListener('keydown',(e)=>{if(e.key==='Backspace' && !p.value && i>0) pins[i-1].focus()})
  })

  validateCode.addEventListener('click',()=>{
    const code=Array.from(pins).map(i=>i.value||'').join('');
    if(code===ACCESS_CODE){
      codeMsg.textContent='Access Granted'; codeMsg.style.color='lightgreen';
      // unlock: redirect to generator page with small animation
      setTimeout(()=>{hide(codePanel);toast('Unlocked — Loading Generator');setTimeout(()=>location.href='FF SENSITIVITY.html',800)},700)
    } else {
      codeMsg.textContent='Wrong Access Code'; codeMsg.style.color='#ff6b6b';
      // shake animation & haptic-like feedback
      const card=document.querySelector('#code-panel .panel-card');card.animate([{transform:'translateX(0)'},{transform:'translateX(-10px)'},{transform:'translateX(10px)'},{transform:'translateX(0)'}],{duration:420});
      try{navigator.vibrate&&navigator.vibrate(70)}catch(e){}
    }
  })
})();

/* Generator interactions */
(function(){
  new ParticlesBackground('bg-canvas-gen');

  // Devices dataset (truncated for brevity) — would be extended in production
  const devices=[
    {name:'Samsung Galaxy S24 Ultra',ram:'12GB',cpu:'Snapdragon 8 Gen 3',refresh:'120Hz',android:'13',fps:120,gyro:'Yes',touch:480,perf:95},
    {name:'Samsung Galaxy S23',ram:'8GB',cpu:'Snapdragon 8 Gen 2',refresh:'120Hz',android:'13',fps:120,gyro:'Yes',touch:360,perf:88},
    {name:'iPhone 15 Pro Max',ram:'8GB',cpu:'A17 Pro',refresh:'120Hz',android:'iOS 17',fps:120,gyro:'Yes',touch:480,perf:96},
    {name:'iPhone 14 Pro Max',ram:'6GB',cpu:'A16',refresh:'120Hz',android:'iOS 16',fps:120,gyro:'Yes',touch:480,perf:90},
    {name:'Xiaomi Poco X5',ram:'8GB',cpu:'Snapdragon 695',refresh:'90Hz',android:'13',fps:90,gyro:'No',touch:180,perf:65},
    {name:'Nothing Phone 2',ram:'12GB',cpu:'Snapdragon 8+',refresh:'120Hz',android:'13',fps:120,gyro:'Yes',touch:360,perf:84}
  ];

  const search=document.getElementById('device-search');
  const suggestions=document.getElementById('suggestions');
  const deviceInfo={name:document.getElementById('device-name'),ram:document.getElementById('ram'),cpu:document.getElementById('cpu'),refresh:document.getElementById('refresh'),android:document.getElementById('android'),fps:document.getElementById('fps'),gyro:document.getElementById('gyro')};
  let selectedDevice=null;

  function suggest(val){suggestions.innerHTML='';if(!val) return; const q=val.toLowerCase(); const found=devices.filter(d=>d.name.toLowerCase().includes(q)); found.slice(0,8).forEach(d=>{const li=document.createElement('li');li.textContent=d.name;li.tabIndex=0;li.addEventListener('click',()=>chooseDevice(d));li.addEventListener('keydown',e=>{if(e.key==='Enter')chooseDevice(d)});suggestions.appendChild(li)})}
  function chooseDevice(d){selectedDevice=d;search.value=d.name;suggestions.innerHTML='';populateInfo(d)}
  function populateInfo(d){deviceInfo.name.textContent=d.name;deviceInfo.ram.textContent=d.ram;deviceInfo.cpu.textContent=d.cpu;deviceInfo.refresh.textContent=d.refresh;deviceInfo.android.textContent=d.android;deviceInfo.fps.textContent=d.fps;deviceInfo.gyro.textContent=d.gyro}

  search.addEventListener('input',e=>suggest(e.target.value));
  search.addEventListener('focus',()=>{if(search.value) suggest(search.value)})
  document.addEventListener('click',e=>{if(!e.target.closest('.search-wrapper')) suggestions.innerHTML=''});

  // chips & toggles
  function setupChips(container,cb){const el=document.getElementById(container);el.addEventListener('click',e=>{const t=e.target.closest('button.chip'); if(!t) return; const group=t.parentElement; group.querySelectorAll('.chip').forEach(x=>x.classList.remove('active')); t.classList.add('active'); cb&&cb(t)})}
  setupChips('style-chips', (t)=>{ /* style selected */ });
  setupChips('finger-chips', (t)=>{ /* fingers selected */ });
  document.getElementById('gyro-toggle').addEventListener('click',e=>{const t=e.target.closest('.toggle-btn'); if(!t) return; t.parentElement.querySelectorAll('.toggle-btn').forEach(x=>x.classList.remove('active')); t.classList.add('active')});

  // generate process
  const genBtn=document.getElementById('generate');
  const aiPanel=document.getElementById('ai-process');
  const stepsEl=document.getElementById('process-steps');
  const progressBar=document.getElementById('progress-bar');
  const progressPercent=document.getElementById('progress-percent');
  const resultCard=document.getElementById('result-card');

  const steps=[
    'AI Detecting Device…','Scanning CPU…','Checking Display…','Checking Touch Sampling…','Optimizing Headshots…','Finding Best Drag Speed…','Calculating Recoil…','Testing Camera Sensitivity…','Training AI Model…','Building Final Profile…'
  ];

  function simulateAI(){if(!selectedDevice){toast('Select a device first');return}
    aiPanel.classList.remove('hidden'); resultCard.classList.add('hidden'); stepsEl.innerHTML='';
    steps.forEach(s=>{const d=document.createElement('div');d.textContent=s;d.className='step muted';stepsEl.appendChild(d)})
    let pct=0;progressBar.style.background=`linear-gradient(90deg,var(--accent) 0%, rgba(255,255,255,0.06) 0%)`;
    const duration=5200; const start=performance.now();
    const anim=setInterval(()=>{const now=performance.now(); const t=(now-start)/duration; pct=Math.min(100,Math.floor(t*100)); progressPercent.textContent=pct+'%'; progressBar.style.background=`linear-gradient(90deg,var(--accent) ${pct}%, rgba(255,255,255,0.06) ${pct}%)`;
      // reveal steps progressively
      const activeIndex=Math.floor((pct/100)*steps.length)-1; if(activeIndex>=0){const nodes=stepsEl.querySelectorAll('div');nodes.forEach((n,i)=>n.style.opacity=i<=activeIndex?1:0.35)}
      if(pct>=100){clearInterval(anim);setTimeout(()=>{aiPanel.classList.add('hidden');showResult();},600)}
    },80)
  }

  function showResult(){ // generate sensible numbers
    resultCard.classList.remove('hidden'); document.getElementById('res-device').textContent=selectedDevice.name; document.getElementById('res-score').textContent=selectedDevice.perf;
    const acc=Math.min(99,Math.floor(selectedDevice.perf*0.92)); document.getElementById('accuracy-circle').textContent=acc+'%'; document.getElementById('res-fps').textContent=selectedDevice.fps + ' FPS'; document.getElementById('res-graphics').textContent=(selectedDevice.perf>90?'Ultra':'High');
    // sensitivities (toy algorithm)
    const base=selectedDevice.perf/100*8; document.getElementById('sensi-general').textContent=(base.toFixed(2)); document.getElementById('sensi-reddot').textContent=(base*0.95).toFixed(2);
    document.getElementById('sensi-2x').textContent=(base*0.78).toFixed(2); document.getElementById('sensi-4x').textContent=(base*0.6).toFixed(2);
    document.getElementById('sensi-sniper').textContent=(base*0.45).toFixed(2); document.getElementById('sensi-free').textContent=(base*1.05).toFixed(2); document.getElementById('sensi-gyro').textContent=(selectedDevice.gyro==='Yes'? (base*1.1).toFixed(2) : 'N/A');

    // animate circle
    const circle=document.getElementById('accuracy-circle'); circle.style.background=`conic-gradient(var(--accent) 0%, var(--accent) ${acc}%, rgba(255,255,255,0.06) ${acc}% )`;

    // confetti
    setTimeout(()=>launchConfetti(),420);
  }

  genBtn.addEventListener('click',simulateAI);

  // copy sensitivity
  document.getElementById('copy-sensi').addEventListener('click',()=>{
    const txt=`General:${document.getElementById('sensi-general').textContent} RedDot:${document.getElementById('sensi-reddot').textContent} 2x:${document.getElementById('sensi-2x').textContent}`;
    navigator.clipboard&&navigator.clipboard.writeText(txt); toast('Sensitivity copied')
  })

  // export as PNG — draw a simple canvas with text
  document.getElementById('export-png').addEventListener('click',()=>{
    const w=900,h=500; const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');
    ctx.fillStyle='#050505';ctx.fillRect(0,0,w,h);
    ctx.fillStyle='#fff';ctx.font='28px Inter';ctx.fillText('ZEUS SENSI AI — Profile',28,48);
    ctx.font='22px Inter';ctx.fillText(document.getElementById('res-device').textContent,28,96);
    ctx.font='18px Inter';ctx.fillText('General: '+document.getElementById('sensi-general').textContent,28,150);
    ctx.fillText('Red Dot: '+document.getElementById('sensi-reddot').textContent,28,186);
    ctx.fillText('2x: '+document.getElementById('sensi-2x').textContent,28,222);
    const a=c.toDataURL('image/png'); const link=document.createElement('a');link.href=a;link.download='zeus-sensi-profile.png';link.click(); link.remove(); toast('Exported PNG')
  })

  // Save profile (localStorage)
  document.getElementById('save-profile').addEventListener('click',()=>{
    if(!selectedDevice){toast('No device to save');return}
    const profile={id:Date.now(),device:selectedDevice.name,score:selectedDevice.perf,general:document.getElementById('sensi-general').textContent};
    const hist=JSON.parse(localStorage.getItem('zs_history')||'[]'); hist.unshift(profile); localStorage.setItem('zs_history',JSON.stringify(hist)); toast('Profile saved'); loadHistory();
  })

  function loadHistory(){const list=document.getElementById('history-list');list.innerHTML=''; const hist=JSON.parse(localStorage.getItem('zs_history')||'[]'); hist.slice(0,30).forEach(h=>{const li=document.createElement('li');li.textContent=`${h.device} — ${h.general} — ${h.score}`;li.tabIndex=0;li.addEventListener('click',()=>{toast('Loaded profile');});list.appendChild(li)})}
  loadHistory();

  // history panel toggle
  document.getElementById('open-history').addEventListener('click',()=>{const hp=document.getElementById('history-panel'); hp.classList.toggle('hidden')});

  // theme toggle (Dark/Orange/System)
  document.getElementById('theme-toggle').addEventListener('click',()=>{document.documentElement.classList.toggle('theme-alt');toast('Theme toggled')});

  // support fab
  document.getElementById('support-fab').addEventListener('click',()=>{window.open('https://wa.me/2349125787958?text=Need%20Access%20Code','_blank')});

  // simple keyboard for device selection
  document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement!==search){e.preventDefault();search.focus()}})

})();
