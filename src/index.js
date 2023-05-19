import * as pokedex from './fetch.js'

const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;

pokedex.iniciar(url);
