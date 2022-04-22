const usuario = document.querySelector('#usuario')
const botonGuardarPuntaje = document.querySelector('#guardarPuntaje')
const puntajeFinal = document.querySelector('#puntajeFinal')
const puntajeMasReciente = localStorage.getItem('puntajeMasReciente')

const puntajesAltos = JSON.parse(localStorage.getItem('puntajesAltos')) || []

const PUNTAJES_MAS_ALTOS = 5; //muestra los 5 puntajes más altos

puntajeFinal.innerText = puntajeMasReciente

usuario.addEventListener('keyup', () => {
    botonGuardarPuntaje.disable = !usuario.value
})

guardarPuntajeAlto = e => {
   e.preventDefault()
   
   const puntaje ={
       puntaje: puntajeMasReciente, 
       name: usuario.value
   }
   puntajesAltos.push(puntaje)

   puntajesAltos.sort((a,b) => {
       return b.puntaje - a.puntaje
   })
   puntajesAltos.splice(5)

   localStorage.setItem('puntajesAltos', JSON.stringify(puntajesAltos))
   window.location.assign('../')
}