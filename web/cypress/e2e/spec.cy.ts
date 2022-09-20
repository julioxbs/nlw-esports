describe("Should visit website", () => {
  it("Should create an advertisement", () => {
    cy.visit('http://localhost:5173/')

    cy.contains('Publicar anúncio').click();
    cy.get('select').select('3d824972-3c71-4482-912b-5bd703c161d5');
    cy.get('input[name="name"]').type('cypress');
    cy.get('input[name="yearsPlaying"]').type(12);
    cy.get('input[name="discord"]').type('@cypress');
    cy.get('.Domingo').click();
    cy.get('input[name="hourStart"]').type('12:34');
    cy.get('input[name="hourEnd"]').type('14:50');
    cy.get('button[type="submit"]').click();
    cy.get('form').submit();
  })
});

