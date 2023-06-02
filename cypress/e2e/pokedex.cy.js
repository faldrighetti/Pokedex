const URL = 'http://192.168.0.23:8080/src/' || 'http://127.0.0.1:8080/src';
const CANTIDAD_PAGINAS = 65;
const POKEMONES_POR_PAGINA = 20;

describe('Pokedex', () => {
  beforeEach(() => {
    cy.visit(URL); 
  });

    /*it('Asegura que ...', () => {
      cy.get('elemento').click();
      cy.get('elemento').should('have.text', 'Lorem ipsum');
    });*/

   it('Asegura que se abra en la primera página', () => {
      const linkPrimeraPagina = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
      cy.window().then((ventana) => {
        ventana.fetch(linkPrimeraPagina)
        .then((respuesta) => respuesta.JSON())
        .then(() => revisarFetch(linkPrimeraPagina));
      });
    });

    it('Asegura que la lista tenga como máximo 20 elementos por página', () => {
      const listaPagina = cy.get('ul-pokemones');
      listaPagina.should('have.lengthOf.most', POKEMONES_POR_PAGINA);
    });

    /*it('Asegura que los botones de anterior y siguiente funcionen', () => {

    });*/

  /*
  Tests para hacer:
  Verificar que se cargue la lista (ver cómo se verifica un fetch en cypress, o esperar que se cargue para testear)
  Verificar que la lista tenga un límite de 20 elementos por página
  Verificar que se inicie en la página 1: `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
  Botones de anterior y siguiente
  */
})

function revisarBoton(boton, pagina, paginaNueva){
  const elemento = cy.get(`#pagina-${pagina}`);
  const lista = cy.get('#ul-pokemones');
  cy.get(boton).click();
  //lista.child() should be paginaNueva

  //Despues para llamar la función hago
  //revisarBoton(botonAnterior, pagina, pagina - 1);
  //revisarBoton(botonSiguiente, pagina, pagina + 1);
}

function revisarFetch(linkFetch){
  cy.wait(linkFetch).then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
  })
}