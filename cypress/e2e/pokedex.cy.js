const URL = 'http://192.168.0.23:8080/src/' || 'http://127.0.0.1:8080/src';
const CANTIDAD_PAGINAS = 65;
const POKEMONES_POR_PAGINA = 20;

describe('Pokedex', () => {

  /*beforeEach(() => {
    cy.visit(URL);
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?offset=840&limit=20', { fixture: 'pokemonData.json' }).as('pokemonRequest');
  })*/

  beforeEach(() => {
    cy.visit(URL); 
  });

  it('Debería obtener los datos de la API correctamente', () => {
    cy.wait('@pokemonRequest').then((interception) => {
      const response = interception.response.body;
      expect(response).to.have.property('count', 20);
      expect(response.results).to.have.length(20);
    });
  });

  it('Asegura que se abra en la primera página', () => {
    const linkPrimeraPagina = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
    cy.window().then((ventana) => {
      ventana.fetch(linkPrimeraPagina)
      .then((respuesta) => respuesta.json())
      .then(() => revisarFetch(linkPrimeraPagina));
      });
  });

  it('Asegura que la lista tenga como máximo 20 elementos por página', () => {
    const listaPagina = cy.get(".list-group-item list-group-item-action");
    listaPagina.should('have.length', POKEMONES_POR_PAGINA); 
  });

  it('Asegura que los botones de anterior y siguiente funcionen', () => {
    const botonAnterior = cy.get('#pagina-anterior');
    const botonSiguiente = cy.get('#pagina-siguiente');

    revisarBoton(botonAnterior, 5);
    revisarBoton(botonSiguiente, 10);
  });

  /*
  Tests para hacer:
  Revisar que cada página tenga como máximo 20 elementos en la lista.
  Botones de anterior y siguiente
  */
})

function revisarElementosLista(){
  const lista = cy.get('#lista-pokemones');
  lista.children().should('have.length', POKEMONES_POR_PAGINA);
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

  /*const elemento = cy.get(`#pagina-${pagina}`);
  const lista = cy.get('#ul-pokemones');
  cy.get(boton).click();
  lista.children().should ('be.equal.to', paginaNueva);*/

  //Despues para llamar la función hago
  //revisarBoton(botonAnterior, pagina, pagina - 1);
  //revisarBoton(botonSiguiente, pagina, pagina + 1);
}

function revisarFetch(linkFetch){
  cy.wait(linkFetch).then((interception) => {
    expect(interception.response.statusCode).to.equal(200);
  })
}