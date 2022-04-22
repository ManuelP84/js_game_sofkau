import {preguntas} from '../js/questions.js'

//variables correspondientes a los id y clases en HTML
const categoria = document.querySelector('#categoria');
const pregunta = document.querySelector('#pregunta');
const opciones = Array.from(document.querySelectorAll('.textoRespuesta'));
const progresoAviso = document.querySelector('#progreso');
const puntos = document.querySelector('#puntos');
const barraProgresoLlena = document.querySelector('#barraProgresoLlena');
let preguntaActual = {}
//let respuestaObtenida= true;
let puntaje = 0; //Puntaje inicial
let contadorPreguntas = 0; //Contador de preguntas
let preguntasDisponibles = []
const PUNTOS_CORRECTA = 100; //Puntos ganados por cada respuesta correcta
const PREGUNTAS_MAX = 5; //5 preguntas max por juego



var empezarJuego = () => {
    contadorPreguntas = 0;
    puntaje = 0;
    preguntasDisponibles = [...preguntas] 
    obtenerNuevaPregunta()
}

var obtenerNuevaPregunta = () =>{
    if(contadorPreguntas >= PREGUNTAS_MAX ){
        localStorage.setItem('puntajeMasReciente', puntaje) 
        return window.location.assign('../template/endGame.html')
     }
    //Si no hay preguntas disponibles o el contador llega al numero de preguntas máximo por juego,
    // se guarda el puntaje en el almacenamiento local y se redirige a la vista de fin de juego
    
    contadorPreguntas ++;
    progresoAviso.innerText = `Pregunta ${contadorPreguntas} de ${PREGUNTAS_MAX}` //Progreso de juego
    barraProgresoLlena.style.width = `${(contadorPreguntas/PREGUNTAS_MAX) * 100}%`//Barra de progreso
    
    categoria.innerText = `Ronda ${contadorPreguntas}` //Categoria de la pregunta (Ronda)

    //const indicePreguntas = Math.floor(Math.random() * preguntasDisponibles.length) //Elige el indice de una pregunta al azar
    //preguntaActual = preguntasDisponibles[indicePreguntas] //Pregunta seleccionada
   //pregunta.innerText = preguntaActual.pregunta; //Imprime la pregunta seleccionada en la vista
    
    const indicePreguntas = Math.floor(Math.random() * 5)
    preguntaActual =  preguntas[contadorPreguntas][indicePreguntas]
    pregunta.innerText = preguntaActual.pregunta;

    //imprime las opciones correspondientes a la pregunta seleccionada
    opciones.forEach(opcion => {
        const number = opcion.dataset['number']
        opcion.innerText = preguntaActual["opcion" + number]
 }) 
    //preguntasDisponibles.splice(indicePreguntas, 1)
    //respuestaObtenida = true
}

//function select_id(id){
//    return document.getElementById(id)
//}

opciones.forEach(opcion => {
    opcion.addEventListener('click', e => {
        //if(!respuestaObtenida) 
        //return 

        //respuestaObtenida = false
        const opcionSeleccionada = e.target
        const respuestaSeleccionada = opcionSeleccionada.dataset['number']

        //verifica que la opción seleccionada sea la respuesta correcta
        let classToApply = respuestaSeleccionada == preguntaActual.respuesta ? 'correcto' : 'incorrecto'
        
        if(classToApply === 'correcto'){
            incrementarPuntaje(PUNTOS_CORRECTA) //si es correcta suma 100 puntos 
        }
        else {
            window.alert('¡Has perdido!')
            terminarJuego()   //si es incorrecta ejecuta la función terminarJuego()
        }
        opcionSeleccionada.parentElement.classList.add(classToApply)

        setTimeout(() => {
            opcionSeleccionada.parentElement.classList.remove(classToApply)
            obtenerNuevaPregunta()
        }, 1000) //tiempo que tardar en aparecer la siguiente pregunta
    })
})
var incrementarPuntaje = num => {
    //Acumula los puntajes y los imprime en la casilla de puntaje
    puntaje+=num; 
    puntos.innerText = puntaje;
}
var terminarJuego= () => {
    localStorage.setItem('puntajeMasReciente', puntaje) //al terminar el juego, guarda el puntaje en el almacenamiento local
    return window.location.assign('../template/endGame.html') //Redirije a la vista de fin de juego
}
empezarJuego()
