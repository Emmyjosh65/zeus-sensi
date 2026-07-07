
      document.addEventListener("DOMContentLoaded", () => {
  
  // PLATFORM DATA ARCHITECTURE SYSTEM CONFIG
  const ACCESS_PASSCODE = "2007";
  let channelVerified = false;

  const DEVICE_METRIC_DATABASE = {
    "Samsung": ["Galaxy S24 Ultra", "Galaxy S23 Ultra", "Galaxy A55", "Galaxy A35", "Galaxy M54", "Galaxy F54"],
    "Tecno": ["Camon 30 Pro", "Camon 20 Premier", "Pova 6 Pro", "Pova 5 Pro", "Spark 20 Pro+", "Spark 10 Pro"],
    "Infinix": ["Hot 40 Pro", "Hot 30", "Note 40 Pro", "Note 30 VIP", "Zero 30 5G", "GT 10 Pro"],
    "Xiaomi": ["Mi 14 Ultra", "Mi 13 Ultra", "Xiaomi 14", "Xiaomi 13T Pro", "Pad 6 Pro"],
    "Redmi": ["Note 13 Pro+ 5G", "Note 12 Pro", "13C", "12 5G", "K70 Pro", "Note 11S"],
    "Vivo": ["X100 Pro", "V30 Pro", "Y200", "T2 Pro", "V29 Pro"],
    "Oppo": ["Find X7 Ultra", "Reno 11 Pro", "A78 5G", "A58", "F25 Pro"],
    "Realme": ["GT 5 Pro", "12 Pro+", "11 Pro", "C67", "Narzo 60"],
    "Huawei": ["Pura 70 Ultra", "Mate 60 Pro", "Nova 12 Ultra", "P60 Pro"],
    "Google Pixel": ["Pixel 8 Pro", "Pixel 8a", "Pixel 7 Pro", "Pixel 7a", "Pixel 6 Pro"],
    "Nothing": ["Phone (2)", "Phone (2a)", "Phone (1)"],
    "Motorola": ["Edge 50 Ultra", "Edge 40 Neo", "G84 5G", "Razr 40 Ultra"],
    "OnePlus": ["OnePlus 12", "OnePlus 12R", "Nord CE4", "OnePlus 11"],
    "Nokia": ["G42 5G", "X30 5G", "G22", "C32"],
    "iPhone": ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 14 Pro Max", "iPhone 13 Pro Max", "iPhone 12", "iPhone 11"],
    "Honor": ["Magic 6 Pro", "Honor 90", "X9b", "Magic V2"],
    "IQOO": ["IQOO 12", "IQOO Neo9 Pro", "IQOO Z9 5G", "IQOO 11"],
    "ASUS ROG": ["ROG Phone 8 Pro", "ROG Phone 7 Ultimate", "ROG Phone 6"],
    "Black Shark": ["Black Shark 5 Pro", "Black Shark 5", "Black Shark 4 Pro"],
    "Red Magic": ["Red Magic 9 Pro", "Red Magic 8S Pro", "Red Magic 7"]
  };

  const STATIC_TRENDING = ["Infinix Hot 40 Pro", "iPhone 15 Pro Max", "Tecno Camon 30 Pro", "Red Magic 9 Pro"];
  const STATIC_POPULAR = ["Samsung Galaxy S24 Ultra", "Redmi Note 13 Pro+", "Realme 12 Pro+", "Nothing Phone (2a)"];

  // SELECT DOM ELEMENT HANDLE POINTERS
  const brandSelector = document.getElementById("dev-brand");
  const modelSelector = document.getElementById("dev-model");
  const btnJoinChannel = document.getElementById("btn-join-channel");
  const channelSuccessNode = document.getElementById("channel-success-node");
  const passkeyInput = document.getElementById("input-pass-key");
  const btnSubmitPass = document.getElementById("btn-submit-pass");
  const passErrorTerminal = document.getElementById("pass-error-terminal");
  const aiGeneratorModule = document.getElementById("ai-generator-module");
  const securityPassLock = document.getElementById("security-pass-lock");
  const btnTriggerGen = document.getElementById("btn-trigger-generation");
  const aiLoadingPanel = document.getElementById("ai-loading-panel");
  const loadingBarFillNode = document.getElementById("loading-bar-fill-node");
  const loadingTerminalText = document.getElementById("loading-terminal-text");
  const resultsDashboard = document.getElementById("results-display-dashboard");

  // ==========================================
  // INITIALIZATION AND SELECTION COMPILATION
  // ==========================================
  (() => {
    // Populate Device Brands dropdown select layout
    let brandHtml = `<option value="" disabled selected>SELECT HARDWARE MANUFACTURER</option>`;
    Object.keys(DEVICE_METRIC_DATABASE).sort().forEach(brand => {
      brandHtml += `<option value="${brand}">${brand.toUpperCase()}</option>`;
    });
    brandSelector.innerHTML = brandHtml;

    // Build Static Data Decks
    document.getElementById("trending-devices-deck").innerHTML = STATIC_TRENDING.map(d => `<li><span>${d}</span><span class="text-glow-cyan">🔥 ACTIVE</span></li>`).join('');
    document.getElementById("popular-devices-deck").innerHTML = STATIC_POPULAR.map(d => `<li><span>${d}</span><span class="accent-orange">⭐ POPULAR</span></li>`).join('');
    
    // Core Background Performance Metric Canvas Loop Animation
    initializeParticleCanvas();
    startLiveUserSim();
    renderRecentActivities();
  })();

  // Dynamic Dependant Select Lists Event Handlers
  brandSelector.addEventListener("change", (e) => {
    const selectedBrand = e.target.value;
    const modelList = DEVICE_METRIC_DATABASE[selectedBrand] || [];
    let modelHtml = `<option value="" disabled selected>SELECT MODEL HARDWARE VARIANT</option>`;
    modelList.forEach(model => {
      modelHtml += `<option value="${model}">${model.toUpperCase()}</option>`;
    });
    modelSelector.innerHTML = modelHtml;
    modelSelector.disabled = false;
  });

  // ==========================================
  // VERIFICATION LOCKS & SEQUENCES LOGIC
  // ==========================================
  btnJoinChannel.addEventListener("click", () => {
    setTimeout(() => {
      channelVerified = true;
      channelSuccessNode.classList.remove("hidden");
    }, 2000);
  });

  btnSubmitPass.addEventListener("click", () => {
    if(!channelVerified) {
      alert("🔒 PLATFORM INTEGRITY ERROR: Complete the required verification sequence channel check first.");
      return;
    }
    
    if(passkeyInput.value.trim() === ACCESS_PASSCODE) {
      securityPassLock.classList.add("hidden");
      aiGeneratorModule.classList.remove("hidden");
      addSearchLog(`SYSTEM PASSWORD PASSED // INSTANCE SECURED`);
    } else {
      passErrorTerminal.classList.remove("hidden");
      passkeyInput.classList.add("shake-fault");
      setTimeout(() => passkeyInput.classList.remove("shake-fault"), 400);
    }
  });

  passkeyInput.addEventListener("input", () => {
    passErrorTerminal.classList.add("hidden");
  });

  // Scroll anchor utility links
  document.getElementById("btn-scroll-start").addEventListener("click", () => {
    document.getElementById("channel-verification").scrollIntoView({ behavior: 'smooth' });
  });

  // ==========================================
  // CONTEXTUAL DEEP ALGORITHMIC SENSITIVITY CALCULATION ENGINE
  // ==========================================
  btnTriggerGen.addEventListener("click", () => {
    if(!document.getElementById("generator-form").checkValidity()) {
      alert("⚠️ DATA RECONCILIATION EXCEPTION: Ensure all matrix configuration selection menus are chosen properly.");
      return;
    }

    btnTriggerGen.disabled = true;
    resultsDashboard.classList.add("hidden");
    aiLoadingPanel.classList.remove("hidden");

    let simulationProgress = 0;
    const logStrings = [
      "INTERPOLATING DISPLAY PANEL BUS CLOCK CORRECTION...",
      "FETCHING TARGET TOUCH CONSOLE BUFFER OVERLAYS...",
      "EVALUATING SYSTEM MEMORY LATENCY STRUCT PARAMETERS...",
      "COMPILING COMPONENT CONFIGURATION PRESETS FOR INSTANCE..."
    ];

    const processingInterval = setInterval(() => {
      simulationProgress += 2.5;
      loadingBarFillNode.style.width = `${simulationProgress}%`;
      
      let currentLogIdx = Math.floor((simulationProgress / 100) * logStrings.length);
      if(logStrings[currentLogIdx]) {
        loadingTerminalText.innerText = logStrings[currentLogIdx];
      }

      if(simulationProgress >= 100) {
        clearInterval(processingInterval);
        aiLoadingPanel.classList.add("hidden");
        btnTriggerGen.disabled = false;
        executeAIPredictionFormula();
      }
    }, 70);
  });

  function executeAIPredictionFormula() {
    const brand = brandSelector.value;
    const model = modelSelector.value;
    const ram = parseInt(document.getElementById("dev-ram").value);
    const hz = parseInt(document.getElementById("dev-refresh").value);
    const style = document.getElementById("dev-style").value;
    const fps = parseInt(document.getElementById("dev-fps").value);

    // Baseline Parameters Calculations based on selected properties
    let baseGeneral = 92;
    let baseRedDot = 94;
    let baseDpi = 480;

    // Optimization curves depending on underlying hardware layers
    if(hz >= 120) { baseGeneral -= 6; baseRedDot -= 4; baseDpi += 60; }
    else if(hz === 90) { baseGeneral -= 2; baseDpi += 30; }

    if(ram >= 12) { baseGeneral -= 2; baseDpi += 40; }
    else if(ram <= 4) { baseGeneral += 6; baseRedDot += 5; baseDpi -= 90; }

    if(style === "one_tap") { baseGeneral += 2; baseRedDot += 3; }
    else if(style === "sniper") { baseGeneral -= 4; }

    // Constrain outputs cleanly within optimal target metrics
    const outGen = Math.min(100, Math.max(80, baseGeneral + Math.floor(Math.random() * 4)));
    const outRed = Math.min(100, Math.max(85, baseRedDot + Math.floor(Math.random() * 3)));
    const out2x = Math.min(100, Math.max(88, outRed - 3 + Math.floor(Math.random() * 3)));
    const out4x = Math.min(100, Math.max(85, out2x - 2 + Math.floor(Math.random() * 4)));
    const outAwm = Math.floor(Math.random() * (58 - 42 + 1)) + 42;
    const outLook = Math.floor(Math.random() * (100 - 70 + 1)) + 70;
    const finalDpi = Math.max(360, baseDpi + (Math.floor(Math.random() * 5) * 5));
    const fireBtn = Math.floor(Math.random() * (52 - 41 + 1)) + 41;

    // Display Output Fields
    document.getElementById("out-target-device").innerText = `${brand.toUpperCase()} ${model.toUpperCase()} CONFIG MATRIX`;
    document.getElementById("val-general").innerText = outGen;
    document.getElementById("val-red-dot").innerText = outRed;
    document.getElementById("val-2x").innerText = out2x;
    document.getElementById("val-4x").innerText = out4x;
    document.getElementById("val-awm").innerText = outAwm;
    document.getElementById("val-free-look").innerText = outLook;
    document.getElementById("val-dpi").innerText = `${finalDpi} DPI`;
    document.getElementById("val-hud").innerText = `${fireBtn}%`;

    // Metrical Performance Evaluation Simulation
    document.getElementById("val-graphics").innerText = document.getElementById("dev-graphics").value.toUpperCase();
    document.getElementById("val-precision").innerText = `${(92 + Math.random() * 7.5).toFixed(1)}%`;
    document.getElementById("val-accuracy").innerText = `${(94 + Math.random() * 5.8).toFixed(1)}%`;
    document.getElementById("val-recoil").innerText = `-${(78 + Math.random() * 18).toFixed(1)}%`;
    document.getElementById("val-reaction").innerText = `${(0.02 + Math.random() * 0.05).toFixed(3)}ms`;
    document.getElementById("val-touch").innerText = `${document.getElementById("dev-touch").value}X ACCEL`;

    document.getElementById("val-perf-score").innerText = `${Math.floor(92 + Math.random() * 8)}/100`;
    document.getElementById("val-gaming-rating").innerText = ram >= 8 ? "SS+ ELITE" : "A+ OPTIMAL";
    document.getElementById("val-confidence").innerText = `${(96 + Math.random() * 3.8).toFixed(1)}%`;
    document.getElementById("val-opt-score").innerText = `${(95 + Math.random() * 4.9).toFixed(1)}%`;

    // Tailored Device Context Rationale text string generator
    document.getElementById("out-ai-rationale").innerText = `AI Analysis: Calculated configuration profile optimized targeting a screen refresh window around ${hz}Hz running on a system architecture matching ${ram}GB system registers. Touch interpolators restricted scaling thresholds matching an index of ${document.getElementById("dev-touch").value}x to neutralize standard screen drift acceleration parameters securely inside your game engine loop layers.`;

    resultsDashboard.classList.remove("hidden");
    resultsDashboard.scrollIntoView({ behavior: 'smooth' });

    addSearchLog(`COMPILED PRESET // ${brand.toUpperCase()} ${model.toUpperCase()}`);
  }

  // ==========================================
  // INTERACTIVE SYSTEM COMPONENT UTILITIES
  // ==========================================
  document.getElementById("btn-copy-sensi").addEventListener("click", () => {
    const textToCopy = `ZEUS SENSI AI CALIBRATION PROFILE:\nGeneral: ${document.getElementById("val-general").innerText} | Red Dot: ${document.getElementById("val-red-dot").innerText} | 2X: ${document.getElementById("val-2x").innerText} | 4X: ${document.getElementById("val-4x").innerText} | DPI: ${document.getElementById("val-dpi").innerText} | Button: ${document.getElementById("val-hud").innerText}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("⚡ SYSTEM RECORD COPY: Config matrix profile indicators copied safely to current device cache clipboard.");
    });
  });

  document.getElementById("btn-share-result").addEventListener("click", () => {
    const targetLink = window.location.href;
    const shareStr = encodeURIComponent(`🔥 EXCLUSIVE: Just calibrated my Free Fire client layout settings utilizing the premium ZEUS SENSI AI Matrix Compiler! Adjust your frame profiles natively free here: ${targetLink}`);
    window.open(`https://api.whatsapp.com/send?text=${shareStr}`, '_blank');
  });

  document.getElementById("btn-bookmark-sensi").addEventListener("click", () => {
    const activeDeviceName = document.getElementById("out-target-device").innerText;
    const genVal = document.getElementById("val-general").innerText;
    if(!activeDeviceName || genVal === "—") return;

    let localFavs = JSON.parse(localStorage.getItem("zeus_sensi_favs") || "[]");
    if(!localFavs.includes(activeDeviceName)) {
      localFavs.push(activeDeviceName);
      localStorage.setItem("zeus_sensi_favs", JSON.stringify(localFavs));
      renderLocalBookmarks();
      alert("🔖 DATA DECK LOCKED: Selected target parameters pinned to local system session storage layout.");
    }
  });

  document.getElementById("btn-generate-again").addEventListener("click", () => {
    resultsDashboard.classList.add("hidden");
    document.getElementById("ai-generator-module").scrollIntoView({ behavior: 'smooth' });
  });

  // Modal Interface Navigation Controls Logic
  const spinModal = document.getElementById("lucky-spin-modal");
  const wheelCore = document.getElementById("wheel-turntable-core");
  
  document.getElementById("lucky-spin-trigger").addEventListener("click", () => spinModal.classList.remove("hidden"));
  document.getElementById("btn-close-wheel").addEventListener("click", () => spinModal.classList.add("hidden"));

  document.getElementById("btn-spin-wheel").addEventListener("click", () => {
    wheelCore.classList.add("wheel-spinning-mod");
    document.getElementById("btn-spin-wheel").disabled = true;
    
    setTimeout(() => {
      wheelCore.classList.remove("wheel-spinning-mod");
      document.getElementById("btn-spin-wheel").disabled = false;
      const prizePool = ["ULTRA DRAG MACRO CODE V4", "DPI MODIFIER TUNING 540", "AIM LOCK INJECTOR BUFF V2", "SCREEN ACCELERATOR OVERLAY"];
      alert(`🎁 MATRIX SUPPLY DROP COMPLETED: Received [ ${prizePool[Math.floor(Math.random() * prizePool.length)]} ] matrix variable!`);
    }, 2200);
  });

  // TAB ARCHITECTURE CONTROLS PANEL INTERFACES
  document.querySelectorAll(".tab-trigger").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-trigger").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-viewpane, .tab-viewactive").forEach(p => { p.classList.add("hidden"); p.className = "tab-viewpane hidden"; });

      const targetViewNode = e.target.getAttribute("data-tab");
      e.target.classList.add("active");
      
      const targetElement = document.getElementById(`tab-${targetViewNode}`);
      targetElement.classList.remove("hidden");
      targetElement.className = "tab-viewactive animate-reveal-frame";
    });
  });

  // FAQ Interactive Disclosure Nodes Selection
  document.querySelectorAll(".faq-query").forEach(query => {
    query.addEventListener("click", (e) => {
      const resp = e.target.nextElementSibling || e.target.parentElement.querySelector(".faq-response");
      if(resp) resp.classList.toggle("hidden");
    });
  });

  // ==========================================
  // RECENT RANDOMIZED ACTIVITY TELEMETRY FEED
  // ==========================================
  function renderRecentActivities() {
    const actContainer = document.getElementById("recent-activity-container");
    const demoNames = ["Xit_Player_99", "Alpha_Regedit", "Zeus_User_42", "Ghost_FF", "VVIP_Macro", "Sensi_Sniper"];
    const randBrands = Object.keys(DEVICE_METRIC_DATABASE);

    let rowsHtml = "";
    for(let i=0; i < 5; i++) {
      let randomBrand = randBrands[Math.floor(Math.random() * randBrands.length)];
      let randomModel = DEVICE_METRIC_DATABASE[randomBrand][Math.floor(Math.random() * DEVICE_METRIC_DATABASE[randomBrand].length)];
      let randomUser = demoNames[Math.floor(Math.random() * demoNames.length)] + Math.floor(Math.random() * 90);
      rowsHtml += `<div class="activity-row"><span>⚡ USER <strong>${randomUser}</strong> SIMULATED MODEL ${randomModel.toUpperCase()}</span><span class="activity-ts">JUST NOW</span></div>`;
    }
    actContainer.innerHTML = rowsHtml;
  }

  function addSearchLog(message) {
    const deck = document.getElementById("search-history-deck");
    if(deck.innerText.includes("Session buffer clear")) deck.innerHTML = "";
    const logItem = document.createElement("div");
    logItem.style.padding = "6px";
    logItem.style.background = "rgba(0,0,0,0.2)";
    logItem.style.marginBottom = "4px";
    logItem.style.borderRadius = "4px";
    logItem.innerText = `[${new Date().toLocaleTimeString()}] ${message}`;
    deck.prepend(logItem);
  }

  function renderLocalBookmarks() {
    const deck = document.getElementById("favorites-storage-deck");
    let localFavs = JSON.parse(localStorage.getItem("zeus_sensi_favs") || "[]");
    if(localFavs.length > 0) {
      deck.innerHTML = localFavs.map(f => `<div style="background:rgba(255,170,0,0.05); padding:8px; margin-bottom:4px; border-radius:4px; border-left:2px solid var(--color-gold-premium);">${f}</div>`).join('');
    }
  }
  renderLocalBookmarks();

  function startLiveUserSim() {
    const userDisplay = document.getElementById("live-users");
    setInterval(() => {
      let currentVal = 1400 + Math.floor(Math.random() * 85);
      userDisplay.innerText = `⚡ ${currentVal} UNITS ACTIVE ON MAIN NODE`;
    }, 4000);
  }

  // ==========================================
  // NATIVE AMBIENT CANVAS BACKGROUND METRICS ANIMATION
  // ==========================================
  function initializeParticleCanvas() {
    const canvas = document.getElementById("ambient-particles");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");

    let pArray = [];
    const maxParticles = 35;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if(this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(255, 85, 0, 0.25)" : "rgba(0, 240, 255, 0.2)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for(let i=0; i<maxParticles; i++) {
      pArray.push(new Particle());
    }

    function loopAnimParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pArray.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(loopAnimParticles);
    }
    loopAnimParticles();
  }

});
