import { sessions } from "../fixtures/sessions";
import { teachers } from "../fixtures/teachers";

describe('Session Creation spec', () => {
  it('should allow an admin to create a session', () => {
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

    cy.intercept('POST', '/api/session', {
      body: {
        id: 3,
        name: 'New Session',
        date: new Date(),
        teacher_id: 1,
        description: 'A newly created session.',
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }).as('createSession');

    cy.intercept('GET', '/api/teacher', {
        body: teachers,
      }).as('teachers');

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type('test!1234{enter}{enter}');

    cy.url().should('include', '/sessions');
    cy.get('button[routerLink="create"]').click();

    cy.url().should('include', '/sessions/create');
    cy.get('input[formControlName=name]').type('New Session');
    cy.get('input[formControlName=date]').type('2025-12-12');
    cy.get('mat-select[formControlName=teacher_id]').click().get('mat-option').first().click();
    cy.get('textarea[formControlName=description]').type('A newly created session.');
    cy.get('button[type=submit]').click();

    cy.wait('@createSession');
    cy.url().should('include', '/sessions');
  });
});
