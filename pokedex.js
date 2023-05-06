function mostrarTipos(tipos){
    const $tipos = document.querySelector('#tipos-container');
    $tipos.innerHTML = '';

    tipos.forEach((tipo) => {
        const spanTipo = document.createElement('span');
        spanTipo.className = `badge ${tipo}`;
        spanTipo.textContent = tipo;
        $tipos.appendChild(spanTipo);
    })
}

function mostrarHabilidades(habilidades){
    const $habilidades = document.querySelector('#habilidades-container');
    $habilidades.innerHTML = '';

    habilidades.forEach((habilidad) => {
        const spanHabilidad = document.createElement('span');
        spanHabilidad.className = 'badge badge-info';
        spanHabilidad.style.color = 'violet';
        spanHabilidad.textContent = `${habilidad} `;
        $habilidades.appendChild(spanHabilidad);
    })
}

function mostrarMovimientos(movimientos){
    const $movimientos = document.querySelector('#movimientos-container');
    $movimientos.innerHTML = '';

    movimientos.forEach((movimiento) => {
        /*const spanMovimiento = document.createElement('span');
        spanMovimiento.className = 'badge-info';
        spanMovimiento.textContent = movimiento;
        $movimientos.appendChild(spanMovimiento);*/

        //Hay que crear una tabla

        //Hay que hacer una tabla con todos los movimientos que hay y sus versiones.
    })
}

function mostrarPokemon(pokemon){ 
    if(document.querySelector('#ayuda')){
        document.querySelector('#ayuda').remove();
    }
    const {name: nombre, sprites: {front_default: foto}, 
    types: tipos, abilities: habilidades, moves: movimientos} = pokemon;
    const imagen = document.querySelector('#pokemon-imagen');
    imagen.setAttribute('src', foto);
    imagen.setAttribute('alt', `Imagen del pokemon ${nombre}`);
    document.querySelector('#pokemon-nombre').textContent = nombre;
    document.querySelector('#pokemon-id').textContent =`#${pokemon.id} `;
    mostrarTipos(tipos.map((items) => items.type.name));
    mostrarHabilidades(habilidades.map((items) => items.ability.name));
    mostrarMovimientos(movimientos.map((items) => items.move.name));
}

function cargarPokemon(nombre){
    const linkFetch = `https://pokeapi.co/api/v2/pokemon/${nombre}`
    fetch(linkFetch)
    .then((res) => res.json())
    .then((r) => {
        console.log(r)
        mostrarPokemon(r);
    })
    .catch((error) => console.log("ERROR", error));
}

function mostrarListaPokemones(pokemones){
    const listaPokemones = document.querySelector('#lista-pokemones');
    pokemones.forEach(function (pokemon){
        const entrada = document.createElement('a');
        const {name: nombre} = pokemon;
        //entrada.setAttribute('href', '#');
        entrada.textContent = nombre;
        entrada.addEventListener('click', () => {
            cargarPokemon(nombre);
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
        }).catch((error) => console.log("ERROR", error));
}

iniciar();