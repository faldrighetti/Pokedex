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

function mostrarPaginador(cantidadPokemones){
    // Acá tengo que mostrar la lista de páginas en el inicio, pero además
    // cuando haga clic en una página, tiene que llamar a una función que
    // le haga un fetch a esa página, que tome su next y su previous en sus
    // respuesta.json y le asigne esos valores al onclick de los botones de
    // < y >

    //MEJOR: poner la actual y las anteriores y siguientes 4 a los costados. 

    //La función sería
    /*fetch('link').then(respuesta => respuesta.json())
    .then(respuesta => {
            const urlAnterior = respuesta.previous
            const urlSiguiente = respuesta.next
            if(urlAnterior){
                botonAnterior.addEventListener('click', irAPagina(pagina anterior))
            }
            if(urlSiguiente){
                botonSiguiente.addEventListener('click', irAPagina(pagina siguiente))
            }            
        })

    function irAPagina(pagina){
        windows.location.href(pagina);
    }
    */

    const POKEMONES_POR_PAGINA = 20
    const paginacion = document.querySelector('#paginacion');
    const botonera = document.querySelector('#botones-numerados');
    const botonAnterior = document.querySelector('#pagina-anterior');
    //botonAnterior.addEventListener('click', '');
    const botonSiguiente = document.querySelector('#pagina-siguiente');
    //botonSiguiente.addEventListener('click', '');
    let cantidadBotones = Math.trunc(cantidadPokemones/POKEMONES_POR_PAGINA) + 1

    for(let i = 1; i <= cantidadBotones; i++){
        const pagina = document.createElement('a');
        pagina.textContent = i;
        pagina.className = 'btn btn-info';
        pagina.setAttribute('href', '#');
        botonera.appendChild(pagina);
    }  
    
    // ver numeroPagina, links para la next page, botones página anterior y siguiente
    // < 1 2 3 4 5 6 7 ... 64> 
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
    .then((respuesta) => {
        mostrarPokemon(respuesta);
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
            console.log(respuesta)
            const totalPokemones = respuesta.count;
            const pokemones = respuesta.results;
            const urlSiguiente = respuesta.next
            mostrarTotalPokemones(totalPokemones);
            mostrarListaPokemones(pokemones);
            mostrarPaginador(totalPokemones);
        }).catch((error) => console.log("ERROR", error));
}

iniciar();