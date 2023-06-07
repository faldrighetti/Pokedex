const URL = 'http://192.168.0.23:8080/src/' || 'http://127.0.0.1:8080/src';
const CANTIDAD_PAGINAS = 65;
const POKEMONES_POR_PAGINA = 20;

describe('Pokedex', () => {

  beforeEach(() => {
    cy.visit(URL); 
  });

  /*it('Debería obtener los datos de la API correctamente', () => {
    cy.server();
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?offset=840&limit=20', { fixture: 'pokemonData.json' }).as('pokemonRequest');
    cy.wait('@pokemonRequest').then((interception) => {
      const response = interception.response.body;
      expect(response).to.have.property('count', 20);
      expect(response.results).to.have.length(20);
    });
  });*/

  /*it('Debería obtener los datos de la API correctamente', () => {
    cy.wait('@pokemonRequest').then((interception) => {
      const response = interception.response.body;
      expect(response).to.have.property('count', 20);
      expect(response.results).to.have.length(20);
    });
  });*/

  it('Asegura que se abra en la primera página', () => {
    const linkPrimeraPagina = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
    cy.window().then((ventana) => {
      ventana.fetch(linkPrimeraPagina)
      .then((respuesta) => respuesta.json())
      .then(() => revisarFetch(linkPrimeraPagina));
      });
  });

  it('Asegura que la lista tenga como máximo 20 elementos por página', () => {
    // --- Acá tiene que ir una aserción que haga la llamada a la API de la página, y ahí llamar a la función de abajo

    revisarElementosLista();
  });

  it('Asegura que los botones de anterior y siguiente funcionen', () => { // NO FUNCIONA
    // --- Acá tiene que ir una aserción que haga la llamada a la API de la página, y ahí llamar a la función de abajo
    const botonAnterior = cy.get('#pagina-anterior');
    const botonSiguiente = cy.get('#pagina-siguiente');

    revisarBoton(botonAnterior, 5);
    revisarBoton(botonSiguiente, 10);
  });

  /*
  Tests para hacer:
  Revisar que cada página tenga como máximo 20 elementos en la lista.
  Para eso tengo que:
  1-Chequear llamada a la API
  2-Revisar la lista después de la llamada
  Botones de anterior y siguiente
  */
})

function revisarElementosLista(){
  const listaPagina = cy.get(".list-group-item list-group-item-action");
  listaPagina.should('have.length', POKEMONES_POR_PAGINA); 
}

function revisarBoton(boton, pagina){
  const linkActual = `https://pokeapi.co/api/v2/pokemon?offset=${(pagina * 20) - 20}&limit=20`;
      cy.window().then((ventana) => {
        ventana.fetch(linkActual)
        .then((respuesta) => respuesta.json())
        .then(() => {
          if(boton === cy.get('#pagina-anterior')){
            pagina --;
          } else if(boton === cy.get('#pagina-siguiente')){
            pagina ++;
          }
          cy.get(boton).click();
          revisarFetch(linkActual);
        });
      });
}

function revisarFetch(linkFetch){
  cy.wait(linkFetch).then((interception) => {
    expect(interception.response.statusCode).to.equal(200);
  })
}