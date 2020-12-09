var el_up = document.getElementById("GFG_UP");
var el_down = document.getElementById("GFG_DOWN");
el_up.innerHTML = "Click on the button to disable right click";

function gfg_Run() {
  oneTwo();
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  el_down.innerHTML = "Right click disabled";
  
}
