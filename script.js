function generate(){

let ram =
document.getElementById("ram").value;

let general;
let redDot;
let scope2x;
let scope4x;
let sniper;
let freeLook;

if(ram >= 6){

general = 95;
redDot = 90;
scope2x = 82;
scope4x = 70;
sniper = 50;
freeLook = 67;

}

else{

general = 80;
redDot = 75;
scope2x = 65;
scope4x = 55;
sniper = 40;
freeLook = 50;

}

document.getElementById("result")
.innerHTML = `

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
