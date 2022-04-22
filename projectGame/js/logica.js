
//variables correspondientes a los id y clases en HTML
const categoria = document.querySelector('#categoria');
const pregunta = document.querySelector('#pregunta');
const opciones = Array.from(document.querySelectorAll('.textoRespuesta'));
const progresoAviso = document.querySelector('#progreso');
const puntos = document.querySelector('#puntos');
const barraProgresoLlena = document.querySelector('#barraProgresoLlena');
let preguntaActual = {}
let respuestaObtenida= true;
let puntaje = 0; //Puntaje inicial
let contadorPreguntas = 0; //Contador de preguntas
let preguntasDisponibles = []