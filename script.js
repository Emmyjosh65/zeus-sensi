function generate(){

  let ram =
  document.getElementById("ram").value;

  let general;
  let redDot;

  if(ram >= 6){
    general = 95;
    redDot = 90;
  }

  else{
    general = 80;
    redDot = 75;
  }

  document.getElementById("result")
  .innerHTML = `

  <h2>Recommended Sensitivity</h2>

  <p>General: ${general}</p>

  <p>Red Dot: ${redDot}</p>

  `;
}
