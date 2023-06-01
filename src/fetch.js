import * as info from './info-pokemon.js';
import * as lista from './lista.js';
import * as paginador from "./paginacion.js";

export function cargarPokemon(nombre){
    const linkFetch = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
    fetch(linkFetch)
    .then((res) => res.json())
    .then((respuesta) => {
        info.mostrarPokemon(respuesta);
    })
    .catch((error) => console.log("ERROR", error));
}

export function iniciar(link){
    const regex = /offset=(\d+)/;
    fetch(link)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
        const totalPokemones = respuesta.count;
        const pokemones = respuesta.results;
        let urlSiguiente = respuesta.next;
        let urlAnterior = respuesta.previous;

        if(!document.querySelector('#botones-numerados').innerHTML){
            paginador.mostrarPaginador(totalPokemones);
        }

        const botonAnterior = document.querySelector('#pagina-anterior');
        if(urlAnterior){
            botonAnterior.onclick = function(){
                document.querySelector('#lista-pokemones').innerHTML = '';
                iniciar(urlAnterior);
                const numeroFragmentoLink = Number(urlAnterior.match(regex)[1]);
                const numeroPagina = Math.floor(numeroFragmentoLink / paginador.POKEMONES_POR_PAGINA) + 1;
                const botonPagina = document.querySelector(`#pagina-${numeroPagina}`);
                paginador.removerColor();
                paginador.activarBoton(botonPagina, numeroPagina);
            }
        }

        const botonSiguiente = document.querySelector('#pagina-siguiente');
        if(urlSiguiente){
            botonSiguiente.onclick = function(){
                document.querySelector('#lista-pokemones').innerHTML = '';
                iniciar(urlSiguiente);
                const numeroFragmentoLink = Number(urlSiguiente.match(regex)[1]);
                const numeroPagina = Math.ceil(numeroFragmentoLink / paginador.POKEMONES_POR_PAGINA) + 1;
                const botonPagina = document.querySelector(`#pagina-${numeroPagina}`);
                paginador.removerColor();
                paginador.activarBoton(botonPagina, numeroPagina);
            }
        }
        
        lista.mostrarTotalPokemones(totalPokemones);
        lista.mostrarListaPokemones(pokemones);
        paginador.procesarBotonPagina(urlAnterior, urlSiguiente, botonAnterior, botonSiguiente);
    }).catch((error) => console.log("ERROR", error));
}
