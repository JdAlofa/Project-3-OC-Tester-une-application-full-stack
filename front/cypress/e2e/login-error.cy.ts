describe('Login spec', () => {
  it('should display an error message for incorrect credentials', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: {
        message: 'Unauthorized',
      },
    }).as('login');

    cy.get('input[formControlName=email]').type('wrong@studio.com');
    cy.get('input[formControlName=password]').type('wrongpassword{enter}{enter}');

    cy.get('.error').should('be.visible').and('contain', 'An error occurred');
  });

  it('should disable the submit button if a required field is missing', () => {
    cy.visit('/login');

    cy.get('button[type=submit]').should('be.disabled');

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('button[type=submit]').should('be.disabled');

    cy.get('input[formControlName=password]').type('test!1234');
    cy.get('button[type=submit]').should('be.enabled');

    cy.get('input[formControlName=email]').clear();
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should display an error on empty form submission', () => {
    cy.visit('/login');
    cy.get('button[type=submit]').should('be.disabled');
  });
});
