function generate(){

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

/* PHONE TYPE */

if(phone == "iphone11pro"
|| phone == "iphone12"
|| phone == "iphone13"
|| phone == "iphone14"
|| phone == "iphone15"){

general += 10;
redDot += 10;
scope2x += 10;
scope4x += 10;

}

else if(phone == "samsungs21"
|| phone == "samsungs22"
|| phone == "samsungs23"){

general += 8;
redDot += 8;
scope2x += 8;

}

else if(phone == "tecnospark5"
|| phone == "infinixhot10"
|| phone == "itelp38"){

general -= 5;
redDot -= 5;

}

/* RAM */

if(ram >= 8){

general += 5;
redDot += 5;
scope2x += 5;

}

else if(ram <= 3){

general -= 5;
redDot -= 5;

}

/* DPI */

if(dpi == "high"){

general += 5;
redDot += 5;
freeLook += 5;

}

else if(dpi == "low"){

general -= 5;
redDot -= 5;

}

/* RESULT */

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
