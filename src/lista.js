import * as fetchFile from "./fetch.js";

export function cambiarAMayuscula(nombre){
    return nombre[0].toUpperCase() + nombre.slice(1);
  }

export function mostrarListaPokemones(pokemones){
    const listaPokemones = document.querySelector('#lista-pokemones');
    pokemones.forEach(function(pokemon){
        const entrada = document.createElement('a');
        const {name: nombre} = pokemon;
        entrada.textContent = cambiarAMayuscula(nombre);
        entrada.addEventListener('click', () => {
            fetchFile.cargarPokemon(nombre);
        })
        entrada.className = 'list-group-item list-group-item-action';
        listaPokemones.appendChild(entrada);
    })
}

export function mostrarTotalPokemones(totalPokemones){
    document.querySelector('#cantidad-pokemones').textContent = totalPokemones;
}
