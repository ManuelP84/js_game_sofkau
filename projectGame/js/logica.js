
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
const PUNTOS_CORRECTA = 100; //Puntos ganados por cada respuesta correcta
const PREGUNTAS_MAX = 5; //5 preguntas max por juego



empezarJuego = () => {
    contadorPreguntas = 0;
    puntaje = 0;
    preguntasDisponibles = [...preguntas] 
    obtenerNuevaPregunta()
}

obtenerNuevaPregunta = () =>{
    if(preguntasDisponibles.length ===0 || contadorPreguntas >= PREGUNTAS_MAX ){
        localStorage.setItem('puntajeMasReciente', puntaje) 
        return window.location.assign('/fin.html')
     }
    //Si no hay preguntas disponibles o el contador llega al numero de preguntas máximo por juego,
    // se guarda el puntaje en el almacenamiento local y se redirige a la vista de fin de juego
    
    contadorPreguntas ++;
    progresoAviso.innerText = `Pregunta ${contadorPreguntas} de ${PREGUNTAS_MAX}` //Progreso de juego
    barraProgresoLlena.style.width = `${(contadorPreguntas/PREGUNTAS_MAX) * 100}%`//Barra de progreso
    
    categoria.innerText = `Ronda ${contadorPreguntas}` //Categoria de la pregunta (Ronda)
}

