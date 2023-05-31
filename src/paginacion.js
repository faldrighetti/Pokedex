import * as moduloFetch from './fetch.js'

const CANTIDAD_PAGINAS = 65;
const POKEMONES_POR_PAGINA = 20;

export function mostrarPaginador(cantidadPokemones){
    const botonera = document.querySelector('#botones-numerados');
    let cantidadBotones = Math.ceil(cantidadPokemones/POKEMONES_POR_PAGINA);

    for(let i = 0; i < cantidadBotones; i++){
        const pagina = document.createElement('a');
        pagina.textContent = i + 1;
        pagina.className = 'btn btn-info';
        pagina.id = `pagina-${i+1}`;
        pagina.href = '#';
        pagina.onclick = function(){
            removerColor();
            pagina.classList.add('active');
            document.querySelector('#lista-pokemones').innerHTML = '';
            moduloFetch.iniciar(`https://pokeapi.co/api/v2/pokemon?offset=${(POKEMONES_POR_PAGINA*i)}&limit=20`);
        }
        botonera.appendChild(pagina);
    }
    return botonera;
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

export function procesarBotonPagina(urlAnterior, urlSiguiente, botonAnterior, botonSiguiente){
    if(!urlAnterior){
        botonAnterior.classList.add('disabled');
    } else if (botonAnterior.classList.contains('disabled')){
        botonAnterior.classList.remove('disabled');
    } else if(!urlSiguiente){
        botonSiguiente.classList.add('disabled');
    } else if (botonSiguiente.classList.contains('disabled')){
        botonSiguiente.classList.remove('disabled');
    }
}
