let indice = 1;

function mostrarPokemon(pokemon){ //No reconoce al parámetro como objeto, sino como undefined.
    const nombre = pokemon.name;
    document.querySelector('#nombre-pokemon').textContent = nombre;
    document.querySelector('#id-pokemon').textContent =`#${pokemon.id}`;
    const imagen = document.createElement('img');
    imagen.setAttribute('src', pokemon.front_default);
    //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png
    imagen.setAttribute('alt', `Imagen del pokemon ${nombre}`);

    const tarjeta = document.querySelector('#tarjeta-pokemon');
    tarjeta.appendChild(imagen);
}

// El fetch inicial se lo hago a api/v2/pokemon/nombre, hasta ahí bien.
// Pero después tengo que hacer un fetch al pokemon cuando lo llamo: a https://pokeapi.co/api/v2/pokemon/4/
//Pero si llamo a https://pokeapi.co/api/v2/pokemon/pikachu, respuesta.id = 25.
// https://pokeapi.co/api/v2/pokemon/pikachu y https://pokeapi.co/api/v2/pokemon/25 son equivalentes
// Es decir, tengo que tomar el id y no el nombre en el fetch para la función cargarPokemon
// En el fetch inicial, la respuesta da este objeto:
/* {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'}
name
: 
"bulbasaur"
url
: 
"https://pokeapi.co/api/v2/pokemon/1/"

*/

function cargarPokemon(pokemon){
    console.log(pokemon)
    fetch(`${pokemon.url}`) //Acá tiene que ir el id del pokemon
    .then((respuesta) => {respuesta.json()})
    .then((pokemon) => {
        console.log(pokemon)
        //mostrarPokemon(pokemon); //No interpreta a pokemon como objeto, sino como undefined.
    })
}

function crearEntrada(pokemon){
    const entrada = document.createElement('p');
    entrada.textContent = "#" + indice + " " + pokemon.name;
    entrada.addEventListener('click', () => {
        cargarPokemon(pokemon);
    })

    entrada.classList.add('list-group-item');
    entrada.classList.add('list-group-item-action');

    const listaPokemones = $("#lista-pokemones");
    listaPokemones.append(entrada);
    
    return entrada;
}

fetch("https://pokeapi.co/api/v2/pokemon")
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        document.querySelector('#cantidad-pokemones').textContent = respuesta.count;
        const pokemones = respuesta.results;
        pokemones.forEach(pokemon => {
            //console.log(pokemon) //devuelve el objeto con name y url
            //name: bulbasaur, url: "https://pokeapi.co/api/v2/pokemon/1/"
            crearEntrada(pokemon);
            indice++;
        });
    })
