Cypress.Commands.add('login', (user) => {
  cy.intercept('POST', '/api/auth/login', {
    body: {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      admin: user.admin,
    },
  }).as('login');

  cy.intercept('GET', '/api/session', {
    statusCode: 200,
    body: [],
  }).as('sessions');

  cy.visit('/login');
  cy.get('input[formControlName=email]').type(user.username);
  cy.get('input[formControlName=password]').type('password');
  cy.get('button[type=submit]').click();
  cy.url().should('include', '/sessions');
});