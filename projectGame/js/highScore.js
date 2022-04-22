const listaPuntajesAltos = document.querySelector('#listaPuntajesAltos')
const puntajesAltos = JSON.parse(localStorage.getItem('puntajesAltos')) || []

listaPuntajesAltos.innerHTML =
puntajesAltos.map(puntaje =>{
    return `<li class='puntaje-alto'>${puntaje.name} - ${puntaje.puntaje}</li>`
}).join("")