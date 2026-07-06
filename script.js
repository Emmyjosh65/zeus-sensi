document.addEventListener("DOMContentLoaded", () => {
  // Application credentials configured by Zeus
  const secretKey = "2007"; 
  let currentShares = 0;
  const targetShares = 5;

  // DOM Handles
  const keyGate = document.getElementById("key-gate");
  const shareGate = document.getElementById("share-gate");
  const appDashboard = document.getElementById("app-dashboard");
  const accessKeyInput = document.getElementById("access-key");
  const btnVerifyKey = document.getElementById("btn-verify-key");
  const keyError = document.getElementById("key-error");
  const deviceInput = document.getElementById("device-input");
  const btnShareWhatsapp = document.getElementById("btn-share-whatsapp");
  const shareCountLabel = document.getElementById("share-count");
  const shareProgressFill = document.getElementById("share-progress-fill");
  const phoneModelDisplay = document.getElementById("phone-model");

  // Output Elements Mapped to Tactical Arrays
  const sGen = document.getElementById("sensi-general-value");
  const sRed = document.getElementById("sensi-red-dot-value");
  const s2x = document.getElementById("sensi-2x-value");
  const s4x = document.getElementById("sensi-4x-value");
  const sSniper = document.getElementById("sensi-sniper-value");
  const sDpi = document.getElementById("sensi-free-look-value");

  // ==========================================
  // BACKGROUND DIGITAL MATRIX MATRIX ENGINE 
  // ==========================================
  const canvas = document.getElementById("matrix-bg");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const matrixChars = "0101ABCDEFUXZ☠⚡⚡";
  const charArray = matrixChars.split("");
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrixStream() {
    ctx.fillStyle = "rgba(10, 11, 14, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 69, 0, 0.15)"; // Soft secondary neon rain trail
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      
      // Randomly turn specific stream strings into Cyan tones for rich variance
      if (Math.random() > 0.95) ctx.fillStyle = "#00f3ff";
      else ctx.fillStyle = "rgba(255, 69, 0, 0.12)";

      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrixStream, 33);

  // ==========================================
  // INPUT LOGIC AND CORE HARDWARE PARSING
  // ==========================================
  btnVerifyKey.addEventListener("click", () => {
    if (accessKeyInput.value.trim() === secretKey) {
      keyGate.classList.add("hidden");
      shareGate.classList.remove("hidden");
    } else {
      keyError.classList.remove("hidden");
      accessKeyInput.style.borderColor = "#ff3333";
      accessKeyInput.classList.add("shake-telemetry");
      setTimeout(() => accessKeyInput.classList.remove("shake-telemetry"), 500);
    }
  });

  accessKeyInput.addEventListener("input", () => {
    keyError.classList.add("hidden");
    accessKeyInput.style.borderColor = "";
  });

  btnShareWhatsapp.addEventListener("click", () => {
    const rawDevice = deviceInput.value.trim();
    if (!rawDevice) {
      alert("⚠️ LOGISTIC EXCEPTION: Target machine hardware model is unassigned.");
      deviceInput.focus();
      return;
    }

    currentShares++;
    let percentage = (currentShares / targetShares) * 100;
    shareProgressFill.style.width = percentage + "%";
    shareCountLabel.innerText = `${currentShares} / ${targetShares} MAIN REGISTERS PIPED`;

    let payloadString = encodeURIComponent(
      `🔥 ZEUS SENSI AI ENGINE LEVEL V4 UNLOCKED!\n\nJust ran my hardware model data parameters through the custom headshot calibration module. True smooth execution matrix and total screen calibration profile built instantly.\n\nLink into your private node data free here: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${payloadString}`, '_blank');

    if (currentShares >= targetShares) {
      setTimeout(() => {
        const dLower = rawDevice.toLowerCase();
        let general = 95, redDot = 98, scope2x = 94, scope4x = 97, sniper = 48, dpi = 500;

        // Custom hardware calculation arrays
        if (dLower.includes("iphone") || dLower.includes("ios") || dLower.includes("ipad")) {
          general = Math.floor(Math.random() * (92 - 89 + 1)) + 89;
          redDot = 96;
          scope2x = 90;
          scope4x = 93;
          sniper = 40;
          dpi = "DYNAMIC (iOS Native Core)";
        } else if (dLower.includes("infinix") || dLower.includes("tecno") || dLower.includes("itel")) {
          general = 100;
          redDot = 100;
          scope2x = 98;
          scope4x = 100;
          dpi = Math.floor(Math.random() * (640 - 590 + 1)) + 590;
        } else if (dLower.includes("rog") || dLower.includes("black shark") || dLower.includes("poco f")) {
          general = Math.floor(Math.random() * (90 - 85 + 1)) + 85;
          redDot = 92;
          scope2x = 88;
          scope4x = 91;
          dpi = "STOCK (High Refresh Override)";
        } else {
          general = Math.floor(Math.random() * (98 - 94 + 1)) + 94;
          redDot = 99;
          dpi = Math.floor(Math.random() * (540 - 450 + 1)) + 450;
        }

        phoneModelDisplay.innerText = rawDevice.toUpperCase();
        sGen.innerText = general;
        sRed.innerText = redDot;
        s2x.innerText = scope2x;
        s4x.innerText = scope4x;
        sSniper.innerText = sniper;
        sDpi.innerText = dpi;

        shareGate.classList.add("hidden");
        appDashboard.classList.remove("hidden");
      }, 800);
    }
  });

  document.getElementById("btn-copy").addEventListener("click", () => {
    alert("🚀 SECURE CORE MATRIX BROADCAST: Registers successfully synced into memory pipeline stack. Launch Free Fire client to override parameters.");
  });
});
