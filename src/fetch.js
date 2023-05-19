export function cargarPokemon(nombre){
    const linkFetch = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
    fetch(linkFetch)
    .then((res) => res.json())
    .then((respuesta) => {
        mostrarPokemon(respuesta);
    })
    .catch((error) => console.log("ERROR", error));
}

export function iniciar(link){
    fetch(link)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            const totalPokemones = respuesta.count;
            const pokemones = respuesta.results;
            const urlSiguiente = respuesta.next; 
            const urlAnterior = respuesta.previous;

            const botonAnterior = document.querySelector('#pagina-anterior');
            if(urlAnterior){
                botonAnterior.onclick = function(){
                    document.querySelector('#lista-pokemones').innerHTML = '';
                    iniciar(urlAnterior);
                }
            }

            const botonSiguiente = document.querySelector('#pagina-siguiente');
            if(urlSiguiente){
                botonSiguiente.onclick = function(){
                    document.querySelector('#lista-pokemones').innerHTML = '';
                    iniciar(urlSiguiente);
                }
            }

            if(!document.querySelector('#botones-numerados').innerHTML){
                mostrarPaginador(totalPokemones);
            }
            mostrarTotalPokemones(totalPokemones);
            mostrarListaPokemones(pokemones);
        }).catch((error) => console.log("ERROR", error));
}
