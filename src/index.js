import * as pokedex from './fetch.js'

const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;

pokedex.iniciar(url);

/*Errores: 
-No cambia el active de botón al presionar en siguiente
*/

//Recordar: hay que abrir esto en http-server siempre para poder verlo bien. Sino va a dar error de CORS.
//PROBLEMA: por alguna razón, parece que los cambios no se reflejan en el html, aunque guarde los archivos .js
//SOLUCIÓN: aparentemente se soluciona yendo a inspeccionar, Network, y marcando la opción "Disable cache".
