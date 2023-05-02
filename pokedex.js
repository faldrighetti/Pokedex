const header = $("h1");
const listaPokemones = $("#lista-pokemones");
let indice = 1;

function crearEntrada(nombre, url){
    const entrada = document.createElement('p');
    nombre[0] = nombre[0].toUpperCase();
    entrada.textContent = "#" + indice + " " + nombre;
    indice++;
    entrada.addEventListener('click', () => {
        console.log("La info está en " + url);
    })
    listaPokemones.append(entrada);
    entrada.classList.add('list-group-item');
    entrada.classList.add('list-group-item-action');
    return entrada;
}

fetch("https://pokeapi.co/api/v2/pokemon")
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        console.log(respuesta)
        document.querySelector('#cantidad-pokemones').textContent = respuesta.count;
        const pokemones = respuesta.results;
        pokemones.forEach(pokemon => {
            crearEntrada(pokemon.name, pokemon.url);
        });
})
