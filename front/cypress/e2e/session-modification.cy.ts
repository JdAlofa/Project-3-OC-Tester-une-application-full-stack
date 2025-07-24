import { sessions } from "../fixtures/sessions";
import { teachers } from "../fixtures/teachers";

describe('Session Modification spec', () => {
  it('should allow an admin to modify a session', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true,
      },
    });

    cy.intercept('GET', '/api/session', {
      body: sessions,
    }).as('sessions');

    cy.intercept('GET', '/api/session/1', {
      body: sessions[0],
    }).as('session');

    cy.intercept('PUT', '/api/session/1', {
      body: {
        ...sessions[0],
        name: 'Updated Session Name',
      },
    }).as('updateSession');

    cy.intercept('GET', '/api/teacher', {
        body: teachers,
      }).as('teachers');

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type('test!1234{enter}{enter}');

    cy.url().should('include', '/sessions');
    cy.get('[data-cy=edit-button]').first().click();

    cy.url().should('include', '/sessions/update/1');
    cy.get('input[formControlName=name]').clear().type('Updated Session Name');
    cy.get('button[type=submit]').click();

    cy.wait('@updateSession');
    cy.url().should('include', '/sessions');
  });

  it('should show an error if a required field is missing', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true,
      },
    });

    cy.intercept('GET', '/api/session', {
      body: sessions,
    }).as('sessions');

    cy.intercept('GET', '/api/session/1', {
      body: sessions[0],
    }).as('session');
    
    cy.intercept('GET', '/api/teacher', {
        body: teachers,
      }).as('teachers');

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type('test!1234{enter}{enter}');

    cy.url().should('include', '/sessions');
    cy.get('[data-cy=edit-button]').first().click();

    cy.url().should('include', '/sessions/update/1');
    cy.get('input[formControlName=name]').clear();
    cy.get('button[type=submit]').should('be.disabled');
  });
});
