import { admin } from '../fixtures/users';

describe('Logout spec', () => {
  it('should log out a user', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'yoga@studio.com',
        firstName: 'Admin',
        lastName: 'Admin',
        admin: true
      },
    })

    cy.get('input[formControlName=email]').type(admin.username);
    cy.get('input[formControlName=password]').type(`${admin.firstName.toLowerCase()}!1234`);
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/sessions');

    cy.contains('span', 'Logout').click();

    cy.url().should('eq', 'http://localhost:4200/');
  });
});