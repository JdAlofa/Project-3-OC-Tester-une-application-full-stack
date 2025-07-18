
import { admin, nonAdmin as user } from '../fixtures/users';

describe('Session Buttons Visibility', () => {
  it('should show the detail button but not the create button for a non-admin user', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: user,
    });

    cy.intercept('GET', '/api/session', {
      body: [
        {
          id: 1,
          name: 'Test Session',
          description: 'Test Session Description',
          date: new Date(),
          teacher_id: 1,
          users: [],
        },
      ],
    }).as('sessions');

    cy.get('input[formControlName=email]').type(user.username);
    cy.get('input[formControlName=password]').type(
      `${user.firstName.toLowerCase()}!1234`
    );
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/sessions');

    cy.contains('button', 'Detail').should('be.visible');
    cy.contains('button', 'Create').should('not.exist');
  });

  it('should show the detail and create buttons for an admin user', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: admin,
    });

    cy.intercept('GET', '/api/session', {
      body: [
        {
          id: 1,
          name: 'Test Session',
          description: 'Test Session Description',
          date: new Date(),
          teacher_id: 1,
          users: [],
        },
      ],
    }).as('sessions');

    cy.get('input[formControlName=email]').type(admin.username);
    cy.get('input[formControlName=password]').type(
      `${admin.firstName.toLowerCase()}!1234`
    );
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/sessions');

    cy.contains('button', 'Detail').should('be.visible');
    cy.contains('span', 'Create').should('be.visible');
  });
});
