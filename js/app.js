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

// DADOS
let D10ama;
let D10rojo;

let D20ama;
let D20rojo;

let D30ama;
let D30rojo;

// DAÑOS
let DANOMax;
let IDaut;
let DANOama;
let DANOrojo;
let RESULTADO;

let PBama;
let PBrojo;

const modal = document.getElementById("INFOmodal");
const btn = document.getElementById("VERjugada");
const span = document.querySelector(".cerrar");
const contenidoModal = document.getElementById("contenidoModal");

let LUCHAR = document.getElementById("LUCHAR");

// Inicialmente botón VERjugada deshabilitado
btn.disabled = true;

LUCHAR.addEventListener("click", resolverCombate);

btn.onclick = function () {
  if (!IDaut) {
    alert("Primero debes resolver el combate.");
    return;
  }

  // Poner barras a 0 antes de mostrar modal
  contenidoModal.innerHTML = `
  <br/><br/>
  <strong>Dados de 10:</strong><br/>
  Amarillo: ${D10ama} &nbsp;&nbsp; Rojo: ${D10rojo}<br/><br/>
  <strong>Dados de 20:</strong><br/>
  Amarillo: ${D20ama} &nbsp;&nbsp; Rojo: ${D20rojo}<br/><br/>
  <strong>Dados de 30:</strong><br/>
  Amarillo: ${D30ama} &nbsp;&nbsp; Rojo: ${D30rojo}<br/><br/>
  
  <strong>Puntuación Total:</strong><br/>
  Amarillo: ${PBama} &nbsp;&nbsp; Rojo: ${PBrojo}<br/><br/>
  
  <strong>Resultado:</strong><br/>
  ${
    PBama > PBrojo
      ? "¡El Equipo Amarillo gana!"
      : PBrojo > PBama
      ? "¡El Equipo Rojo gana!"
      : "¡Empate!"
  }
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

  console.log("D10 A:", D10ama, "| D10 B:", D10rojo);
  console.log("D20 A:", D20ama, "| D20 B:", D20rojo);
  console.log("D30 A:", D30ama, "| D30 B:", D30rojo);

  PBama =
    (Number(INFama.value) * D10ama +
      Number(CABama.value) * D20ama +
      Number(CANama.value) * D30ama) *
    Number(IDama.value);

  PBrojo =
    (Number(INFrojo.value) * D10rojo +
      Number(CABrojo.value) * D20rojo +
      Number(CANrojo.value) * D30rojo) *
    Number(IDrojo.value);

  console.log("PB ama", PBama);
  console.log("PB rojo", PBrojo);

  console.log("INFama", INFama.value);
  console.log("INFrojo", INFrojo.value);

  DANOMax =
    (Number(INFama.value) + Number(INFrojo.value)) * 10 +
    (Number(CABama.value) + Number(CABrojo.value)) * 20 +
    (Number(CANama.value) + Number(CANrojo.value)) * 30;

  console.log("DANOMax", DANOMax);

  IDaut = DANOMax / 200;
  console.log("IDaut", IDaut);

  DANOama = PBama / IDaut;
  DANOrojo = PBrojo / IDaut;
  console.log("DANOama", DANOama);
  console.log("DANOrojo", DANOrojo);

  RESULTADO = Math.round(DANOama - DANOrojo);
  console.log("RESULTADO", RESULTADO);

  // Leer vida actual desde aria-valuenow
  let vidaActualAma = Number(VIDAama.getAttribute("aria-valuenow"));
  let vidaActualRojo = Number(VIDArojo.getAttribute("aria-valuenow"));

  // Aplicar daño según resultado
  if (RESULTADO > 0) {
    vidaActualRojo = Math.max(0, vidaActualRojo - RESULTADO);
  } else if (RESULTADO < 0) {
    vidaActualAma = Math.max(0, vidaActualAma + RESULTADO);
  }

  // Actualizar barras visuales y atributos
  VIDAama.style.width = vidaActualAma + "%";
  VIDAama.setAttribute("aria-valuenow", vidaActualAma);
  VIDAama.textContent = vidaActualAma;

  VIDArojo.style.width = vidaActualRojo + "%";
  VIDArojo.setAttribute("aria-valuenow", vidaActualRojo);
  VIDArojo.textContent = vidaActualRojo;

  btn.disabled = false;

  if (vidaActualAma <= 0 || vidaActualRojo <= 0) {
    let ganador = vidaActualAma <= 0 ? "Equipo Rojo" : "Equipo Amarillo";
    let perdedorBarra = vidaActualAma <= 0 ? VIDAama : VIDArojo;

    // Actualizar solo la barra del perdedor a 0 antes del alert
    perdedorBarra.style.width = "0%";
    perdedorBarra.setAttribute("aria-valuenow", 0);
    perdedorBarra.textContent = "0";

    // Forzar reflow para que se vea el cambio
    perdedorBarra.offsetWidth;

    // Bloquear botón
    btn.disabled = true;

    // Esperar un poco para que se pinte la barra y después mostrar alert
    setTimeout(() => {
      alert(`¡${ganador} ha ganado!`);

      // Restablecer barras a 100%
      VIDAama.style.width = "100%";
      VIDAama.setAttribute("aria-valuenow", 100);
      VIDAama.textContent = "100";

      VIDArojo.style.width = "100%";
      VIDArojo.setAttribute("aria-valuenow", 100);
      VIDArojo.textContent = "100";

      btn.disabled = false;
    }, 600);
  }
}
