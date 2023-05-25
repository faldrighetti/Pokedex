import * as pokedex from './fetch.js'

const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;

pokedex.iniciar(url);

//Recordar: hay que abrir esto en http-server siempre para poder verlo bien. Sino va a dar error de CORS.

/*Errores: 
-No muestra en qué página se está. Debería hacerlo al hacer clic en una página, y en la página 1 al empezar.
-Cuando esto se arregle, deshabilitar el botón < al estar en la página 1, y el botón > al estar en la última página.
-Los botones de página clickeados se quedan con un color celeste que no se va al hacer clic en otra página (ver active)
*/

//PROBLEMA: por alguna razón, parece que los cambios no se reflejan en el html, aunque guarde los archivos .js
//SOLUCIÓN: aparentemente se soluciona yendo a inspeccionar, Network, y marcando la opción "Disable cache".
