function generate(){

let pin =
document.getElementById("pin").value;

/* PREMIUM PIN */

if(pin != "RAMADAM"){

document.getElementById("result")
.innerHTML = `

<h2 style="color:red;">
Invalid Premium PIN
</h2>

<p>
Contact owner on WhatsApp
to get access.
</p>

`;

return;

}

/* DEVICE */

let phone =
document.getElementById("phone").value;

let ram =
document.getElementById("ram").value;

let dpi =
document.getElementById("dpi").value;

let general = 85;
let redDot = 80;
let scope2x = 70;
let scope4x = 60;
let sniper = 45;
let freeLook = 55;

/* PHONE BOOST */

if(phone.includes("iphone")){

general += 10;
redDot += 10;
scope2x += 10;

}

else if(phone.includes("samsung")){

general += 7;
redDot += 7;

}

else if(phone.includes("tecno")){

general -= 5;

}

/* RAM BOOST */

if(ram >= 8){

general += 5;
redDot += 5;

}

/* DPI */

if(dpi == "high"){

general += 5;
redDot += 5;
freeLook += 5;

}

else if(dpi == "low"){

general -= 5;

}

/* SHOW RESULT */

document.getElementById("result")
.innerHTML = `

<h2>Recommended Sensitivity</h2>

<div class="sensi">
<span>General</span>
<span>${general}</span>
</div>

<div class="sensi">
<span>Red Dot</span>
<span>${redDot}</span>
</div>

<div class="sensi">
<span>2X Scope</span>
<span>${scope2x}</span>
</div>

<div class="sensi">
<span>4X Scope</span>
<span>${scope4x}</span>
</div>

<div class="sensi">
<span>Sniper Scope</span>
<span>${sniper}</span>
</div>

<div class="sensi">
<span>Free Look</span>
<span>${freeLook}</span>
</div>

`;

}
