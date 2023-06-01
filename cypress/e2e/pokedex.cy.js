const URL = 'http://192.168.0.23:8080/src/' || 'http://127.0.0.1:8080/src';

describe('Pokedex', () => {
  beforeEach(() => {
    cy.visit(URL); 
  });

  /*it('Asegura que ...', () => {
    cy.get('elemento').click();
    cy.get('elemento').should('have.text', 'Por favor seleccione una opción para la fecha de conversión.');
  });*/
})