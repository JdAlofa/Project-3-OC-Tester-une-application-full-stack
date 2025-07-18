describe('Not Found spec', () => {
  it('should display the not found page', () => {
    cy.visit('/404');
    cy.contains('Page not found !');
  });
});