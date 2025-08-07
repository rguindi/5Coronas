// INPUTS DE UNIDADES
let INFama = document.getElementById("INFama");
let INFrojo = document.getElementById("INFrojo");

let CABama = document.getElementById("CABama");
let CABrojo = document.getElementById("CABrojo");

let CANama = document.getElementById("CANama");
let CANrojo = document.getElementById("CANrojo");

// ÍNDICE DE DEFENSA
let IDama = document.getElementById("IDama");
let IDrojo = document.getElementById("IDrojo");

// ELEMENTOS DE RESULTADO
let PUNTama = document.getElementById("PUNTama");
let PUNTrojo = document.getElementById("PUNTrojo");
let DANO = document.getElementById("DANO");

// BARRAS DE VIDA
let VIDAama = document.getElementById("VIDAama");
let VIDArojo = document.getElementById("VIDArojo");

//DADOS
// Dados de 10
let D10ama;
let D10rojo;

// Dados de 20
let D20ama;
let D20rojo;

// Dados de 30
let D30ama;
let D30rojo;

let DANOMax;
let IDaut;

const modal = document.getElementById("INFOmodal");
const btn = document.getElementById("VERjugada");
const span = document.querySelector(".cerrar");
const contenidoModal = document.getElementById("contenidoModal");

let LUCHAR = document.getElementById("LUCHAR");
LUCHAR.addEventListener("click", resolverCombate);

btn.onclick = function () {
  // Rellenamos el contenido con los valores
  contenidoModal.innerHTML = `
      <strong>ID:</strong> ${IDaut}<br/><br/>
      <strong>Dados de 10:</strong><br/>
      Amarillo: ${D10ama} &nbsp;&nbsp; Rojo: ${D10rojo}<br/><br/>
      <strong>Dados de 20:</strong><br/>
      Amarillo: ${D20ama} &nbsp;&nbsp; Rojo: ${D20rojo}<br/><br/>
      <strong>Dados de 30:</strong><br/>
      Amarillo: ${D30ama} &nbsp;&nbsp; Rojo: ${D30rojo}<br/><br/>
      <strong>Daño Máximo:</strong> ${DANOMax}
    `;
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Función que se ejecuta al hacer clic
function resolverCombate() {
  console.log("¡Combate iniciado!");

  // Dados de 10
  D10ama = Math.floor(Math.random() * 10) + 1;
  D10rojo = Math.floor(Math.random() * 10) + 1;

  // Dados de 20
  D20ama = Math.floor(Math.random() * 20) + 1;
  D20rojo = Math.floor(Math.random() * 20) + 1;

  // Dados de 30
  D30ama = Math.floor(Math.random() * 30) + 1;
  D30rojo = Math.floor(Math.random() * 30) + 1;

  // Mostrar los valores en consola (puedes quitarlos después si no los necesitas)
  console.log("D10 A:", D10ama, "| D10 B:", D10rojo);
  console.log("D20 A:", D20ama, "| D20 B:", D20rojo);
  console.log("D30 A:", D30ama, "| D30 B:", D30rojo);
}
