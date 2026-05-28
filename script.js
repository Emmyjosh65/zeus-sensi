function randomSensi() {

return Math.floor(Math.random() * 161) + 40;

/* RANDOM NUMBER FROM 40 TO 200 */

}

function generate(){

let pin =
document.getElementById("pin").value;

/* PREMIUM PIN */

if(pin != "2007"){

document.getElementById("result")
.innerHTML = `

<h2 style="color:red;">
INVALID PREMIUM PIN
</h2>

<p>
Contact owner on WhatsApp
to get access.
</p>

`;

return;

}

/* RANDOM SENSITIVITY */

let general = randomSensi();
let redDot = randomSensi();
let scope2x = randomSensi();
let scope4x = randomSensi();
let sniper = randomSensi();
let freeLook = randomSensi();
let buttonSize = randomSensi();

document.getElementById("result")
.innerHTML = `

<h2>
Recommended Sensitivity
</h2>

<div class="sensi-box">

<div class="sensi">
<span>General</span>
<span>${general}</span>
</div>

<div class="bar">
<div class="fill"
style="width:${general / 2}%">
</div>
</div>

<div class="sensi">
<span>Red Dot</span>
<span>${redDot}</span>
</div>

<div class="bar">
<div class="fill"
style="width:${redDot / 2}%">
</div>
</div>

<div class="sensi">
<span>2X Scope</span>
<span>${scope2x}</span>
</div>

<div class="bar">
<div class="fill"
style="width:${scope2x / 2}%">
</div>
</div>

<div class="sensi">
<span>4X Scope</span>
<span>${scope4x}</span>
</div>

<div class="bar">
<div class="fill"
style="width:${scope4x / 2}%">
</div>
</div>

<div class="sensi">
<span>Sniper Scope</span>
<span>${sniper}</span>
</div>

<div class="bar">
<div class="fill"
style="width:${sniper / 2}%">
</div>
</div>

<div class="sensi">
<span>Free Look</span>
<span>${freeLook}</span>
</div>

<div class="bar">
<div class="fill"
style="width:${freeLook / 2}%">
</div>
</div>

<div class="sensi">
<span>Button Size</span>
<span>${buttonSize}</span>
</div>

<div class="bar">
<div class="fill"
style="width:${buttonSize / 2}%">
</div>
</div>

</div>

`;

}
