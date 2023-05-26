import * as moduloFetch from './fetch.js'

export function mostrarPaginador(cantidadPokemones){
    const POKEMONES_POR_PAGINA = 20;
    const botonera = document.querySelector('#botones-numerados');
    let cantidadBotones = Math.ceil(cantidadPokemones/POKEMONES_POR_PAGINA);

    for(let i = 1; i <= cantidadBotones; i++){
        const pagina = document.createElement('a');
        pagina.textContent = i;
        pagina.className = 'btn btn-info';
        pagina.onclick = function(){
            removerColor();
            pagina.classList.add('active');
            document.querySelector('#lista-pokemones').innerHTML = '';
            moduloFetch.iniciar(`https://pokeapi.co/api/v2/pokemon?offset=${POKEMONES_POR_PAGINA*i}&limit=20`);
        }
        botonera.appendChild(pagina);
    }
}

function removerColor(){
    let botonesPagina = document.getElementsByClassName('btn btn-info');
    let i = 0;
    while(i < botonesPagina.length){
        if(botonesPagina[i].classList.contains('active')){
            botonesPagina[i].classList.remove('active');
            break;
        };
        i++;
    }
}
