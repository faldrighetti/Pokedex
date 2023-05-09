const POKEMONES_POR_PAGINA = 20;
const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;

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

    const botonera = document.querySelector('#botones-numerados');
    let cantidadBotones = Math.ceil(cantidadPokemones/POKEMONES_POR_PAGINA);

    for(let i = 0; i < cantidadBotones; i++){
        const pagina = document.createElement('a');
        pagina.textContent = i+1;
        pagina.className = 'btn btn-info';
        pagina.onclick = function(){
            removerColor();
            pagina.classList.add('active');
            document.querySelector('#lista-pokemones').innerHTML = '';
            iniciar(`https://pokeapi.co/api/v2/pokemon?offset=${POKEMONES_POR_PAGINA*i} &limit=20`);
        }
        botonera.appendChild(pagina);
    }  

}

function removerColor(){
    let botonesPagina = document.getElementsByClassName('btn btn-info');
    for(let i = 0; i < botonesPagina.length; i++){
        if(botonesPagina[i].classList.contains('color-destacado')){
            botonesPagina[i].classList.remove('color-destacado');
        }
    }
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
    const linkFetch = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
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

function iniciar(link){
    fetch(link)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            console.log(respuesta)
            const totalPokemones = respuesta.count;
            const pokemones = respuesta.results;
            const urlSiguiente = respuesta.next; 
            const urlAnterior = respuesta.previous;

            const botonAnterior = document.querySelector('#pagina-anterior');
            if(urlAnterior){
                botonAnterior.onclick = function(){
                    document.querySelector('#lista-pokemones').innerHTML = '';
                    iniciar(urlAnterior);
                    console.log(`${urlAnterior}`);
                }
            }

            const botonSiguiente = document.querySelector('#pagina-siguiente');
            if(urlSiguiente){
                botonSiguiente.onclick = function(){
                    document.querySelector('#lista-pokemones').innerHTML = '';
                    iniciar(urlSiguiente);
                    console.log(urlSiguiente);
                }
            }

            if(!document.querySelector('#botones-numerados').innerHTML){
                mostrarPaginador(totalPokemones);
            }
            mostrarTotalPokemones(totalPokemones);
            mostrarListaPokemones(pokemones);
        }).catch((error) => console.log("ERROR", error));
}

iniciar(url);
