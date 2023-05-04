function mostrarPokemon(pokemon){ 
    if(document.querySelector('#ayuda')){
        document.querySelector('#ayuda').remove();
    }
    const {name: nombre, sprites: {front_default : foto}} = pokemon
    const imagen = document.querySelector('#pokemon-imagen');
    imagen.setAttribute('src', foto);
    imagen.setAttribute('alt', `Imagen del pokemon ${nombre}`);
    document.querySelector('#pokemon-nombre').textContent = nombre;
    document.querySelector('#pokemon-id').textContent =`#${pokemon.id} `;
}

function cargarPokemon(nombre){
    const linkFetch = `https://pokeapi.co/api/v2/pokemon/${nombre}`
    console.log()
    fetch(linkFetch)
    .then((res) => res.json())
    .then((r) => {
        console.log(r)
        mostrarPokemon(r);
    })
    .catch((error) => console.log("ERROR" , error))
}

function mostrarListaPokemones(pokemones){
    const listaPokemones = document.querySelector('#lista-pokemones');
    pokemones.forEach(function (pokemon){
        const entrada = document.createElement('a');
        const {name: nombre, url} = pokemon
        entrada.setAttribute('href', '#');
        entrada.textContent = pokemon.name;
        entrada.addEventListener('click', () => {
            cargarPokemon(nombre)
        })
        entrada.className = 'list-group-item list-group-item-action';
        listaPokemones.append(entrada);
    })
}

function mostrarTotalPokemones(totalPokemones){
    document.querySelector('#cantidad-pokemones').textContent = totalPokemones;
}

function iniciar(){
    fetch("https://pokeapi.co/api/v2/pokemon")
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            const totalPokemones = respuesta.count;
            const pokemones = respuesta.results;
            mostrarTotalPokemones(totalPokemones);
            mostrarListaPokemones(pokemones);
        })
}

iniciar();