import { preguntas } from "./questions.js";

const categoria = document.querySelector("#categoria");
const pregunta = document.querySelector("#pregunta");
const opciones = Array.from(document.querySelectorAll(".textoRespuesta"));
const progresoAviso = document.querySelector("#progreso");
const puntos = document.querySelector("#puntos");
const barraProgresoLlena = document.querySelector("#barraProgresoLlena");
let preguntaActual = {};

let puntaje = 0;
let contadorPreguntas = 0;
let preguntasDisponibles = [];
const PUNTOS_CORRECTA = 100;
const PREGUNTAS_MAX = 5;

let empezarJuego = () => {
  contadorPreguntas = 0;
  puntaje = 0;
  preguntasDisponibles = [...preguntas];
  obtenerNuevaPregunta();
};

let obtenerNuevaPregunta = () => {
  if (contadorPreguntas >= PREGUNTAS_MAX) {
    localStorage.setItem("puntajeMasReciente", puntaje);
    return window.location.assign("../template/endGame.html");
  }
  progresoAviso.innerText = `Pregunta ${
    contadorPreguntas + 1
  } de ${PREGUNTAS_MAX}`;
  barraProgresoLlena.style.width = `${
    (contadorPreguntas / PREGUNTAS_MAX) * 100
  }%`;

  const indicePreguntas = Math.floor(Math.random() * 5);
  preguntaActual = preguntas[contadorPreguntas][indicePreguntas];
  pregunta.innerText = preguntaActual.pregunta;
  contadorPreguntas++;
  categoria.innerText = preguntaActual.categoria.toUpperCase();

  opciones.forEach((opcion) => {
    const number = opcion.dataset["number"];
    opcion.innerText = preguntaActual["opcion" + number];
  });
};

let btn = document.getElementById("terminarBoton");
btn.addEventListener(
  "click",
  function terminarJuego() {
    localStorage.setItem("puntajeMasReciente", puntaje);
    return window.location.assign("../template/endGame.html");
  },
  false
);

opciones.forEach((opcion) => {
  opcion.addEventListener("click", (e) => {
    const opcionSeleccionada = e.target;
    const respuestaSeleccionada = opcionSeleccionada.dataset["number"];

    let classToApply =
      respuestaSeleccionada == preguntaActual.respuesta
        ? "correcto"
        : "incorrecto";

    if (classToApply === "correcto") {
      incrementarPuntaje(PUNTOS_CORRECTA);
    } else {
      activarBoton();
      setTimeout(() => {
        terminoJuego();
      }, 2000);
    }
    opcionSeleccionada.parentElement.classList.add(classToApply);

    setTimeout(() => {
      opcionSeleccionada.parentElement.classList.remove(classToApply);
      obtenerNuevaPregunta();
    }, 3000);
  });
});

let incrementarPuntaje = (num) => {
  puntaje += num;
  puntos.innerText = puntaje;
};

let terminoJuego = () => {
  localStorage.setItem("puntajeMasReciente", puntaje);
  return window.location.assign("../template/endGame.html");
};

function activarBoton() {
  let llamado = document.getElementById("btnModal");
  llamado.click();
}

if (document.getElementById("btnModal")) {
  var modal = document.getElementById("myModal");
  var boton1 = document.getElementById("btnModal");
  var span = document.getElementsByClassName("close")[0];
  var body = document.getElementsByTagName("body")[0];

  boton1.onclick = function () {
    modal.style.display = "block";
    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
  };
  span.onclick = function () {
    modal.style.display = "none";

    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";

      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
    }
  };
}

empezarJuego();
