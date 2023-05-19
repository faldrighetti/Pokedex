const POKEMONES_POR_PAGINA = 20;

export function mostrarPaginador(cantidadPokemones){
    const botonera = document.querySelector('#botones-numerados');
    let cantidadBotones = Math.ceil(cantidadPokemones/POKEMONES_POR_PAGINA);

    for(let i = 0; i < cantidadBotones; i++){
        const pagina = document.createElement('a');
        pagina.textContent = i+1;
        pagina.className = 'btn btn-info';
        pagina.onclick = function(){
            removerColor();
            pagina.classList.add('color-destacado');
            document.querySelector('#lista-pokemones').innerHTML = '';
            iniciar(`https://pokeapi.co/api/v2/pokemon?offset=${POKEMONES_POR_PAGINA*i}&limit=20`);
        }
        botonera.appendChild(pagina);
    }
}

export function removerColor(){
    let botonesPagina = document.getElementsByClassName('btn btn-info');
    let i = 0;
    while(i < botonesPagina.length){
        if(botonesPagina[i].classList.contains('color-destacado')){
            botonesPagina[i].classList.remove('color-destacado');
            break;
        };
        i++;
    }
}