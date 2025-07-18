describe('Login Non-Admin spec', () => {
  it('Login successful for non-admin and redirects to sessions', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: false,
      },
    }).as('login');

    cy.intercept('GET', '/api/session', {
      statusCode: 200,
      body: [],
    }).as('sessions');

    cy.get('input[formControlName=email]').type('yoga@studio.com', { force: true });
    cy.get('input[formControlName=password]').type(`${'test!1234'}{enter}{enter}`, { force: true });

    cy.wait('@login');
    cy.url().should('include', '/sessions');
  });
});