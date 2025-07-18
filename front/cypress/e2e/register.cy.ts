describe('Register spec', () => {
  it('Register successfull', () => {
    cy.visit('/register');

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200,
    }).as('register');

    cy.get('input[formControlName=firstName]').type('firstName', { force: true });
    cy.get('input[formControlName=lastName]').type('lastName', { force: true });
    cy.get('input[formControlName=email]').type('yoga@studio.com', { force: true });
    cy.get('input[formControlName=password]').type('test!1234', { force: true });
    cy.get('button[type=submit]').should('be.enabled');
    cy.get('button[type=submit]').click({ force: true });

    cy.url().should('include', '/login');
  });

  it('should disable the submit button if a required field is missing', () => {
    cy.visit('/register');

    cy.get('button[type=submit]').should('be.disabled');

    cy.get('input[formControlName=firstName]').type('firstName', { force: true });
    cy.get('input[formControlName=lastName]').type('lastName', { force: true });
    cy.get('input[formControlName=email]').type('yoga@studio.com', { force: true });
    cy.get('button[type=submit]').should('be.disabled');

    cy.get('input[formControlName=password]').type('test!1234', { force: true });
    cy.get('button[type=submit]').should('be.enabled');

    cy.get('input[formControlName=firstName]').clear({ force: true });
    cy.get('button[type=submit]').should('be.disabled');
  });
});
