document.addEventListener("DOMContentLoaded", () => {
  // CONFIGURATION: Set your private validation key here
  let secretKey = "FEARLESS-99"; 
  
  // Track WhatsApp group click count
  let currentShares = 0;
  const targetShares = 5;

  // Dom Elements
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
  const btnCopy = document.getElementById("btn-copy");

  // STEP 1: Verify Secret Entry Key
  btnVerifyKey.addEventListener("click", () => {
    const userKey = accessKeyInput.value.trim();
    
    if (userKey === secretKey) {
      keyGate.classList.add("hidden");
      shareGate.classList.remove("hidden");
    } else {
      keyError.classList.remove("hidden");
      // Add a slight shake animation response
      accessKeyInput.style.borderColor = "#ff3333";
    }
  });

  // Clear error border on typing again
  accessKeyInput.addEventListener("input", () => {
    keyError.classList.add("hidden");
    accessKeyInput.style.borderColor = "";
  });

  // STEP 2: Viral WhatsApp Verification Simulation
  btnShareWhatsapp.addEventListener("click", () => {
    // Check if they typed a device model first
    if (!deviceInput.value.trim()) {
      alert("Please type your mobile device profile model first!");
      deviceInput.focus();
      return;
    }

    // Modern tracking mechanics setup 
    currentShares++;
    
    // Calculate progress fill percentage
    let percentage = (currentShares / targetShares) * 100;
    shareProgressFill.style.width = percentage + "%";
    shareCountLabel.innerText = `${currentShares} / ${targetShares} Group Shares`;

    // Construct the viral message text format
    let messageText = encodeURIComponent(
      `🔥 ZEUS SENSI AI ENGINE v4 UNLOCKED!\n\nGet 99% precise auto-headshots config calibrated for your exact phone layout. Free Fire anti-ban config active.\n\nClaim your setup free here: ${window.location.href}`
    );
    
    // Open WhatsApp portal share window dynamically
    window.open(`https://api.whatsapp.com/send?text=${messageText}`, '_blank');

    // Check if target goal is completed
    if (currentShares >= targetShares) {
      setTimeout(() => {
        // Transfer target model to dashboard
        phoneModelDisplay.innerText = deviceInput.value.toUpperCase();
        
        // Unlock full application profile
        shareGate.classList.add("hidden");
        appDashboard.classList.remove("hidden");
      }, 800);
    }
  });

  // Copy Mechanics Implementation
  btnCopy.addEventListener("click", () => {
    alert("⚡ ZEUS Macro Engine Synced! Sensitivity values successfully copied to clip board. Start Free Fire to apply changes.");
  });
});
