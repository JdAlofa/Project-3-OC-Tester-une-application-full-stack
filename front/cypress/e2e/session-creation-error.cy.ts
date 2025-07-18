import { admin } from "../fixtures/users";

describe('Session Creation spec', () => {
  it('should show an error if a required field is missing', () => {
    cy.login(admin);

    cy.intercept('GET', '/api/teacher', {
      statusCode: 200,
      body: [
        {
          id: 1,
          lastName: 'DELAHAYE',
          firstName: 'Margot',
          createdAt: '2025-07-19T12:00:00.000+00:00',
          updatedAt: '2025-07-19T12:00:00.000+00:00',
        },
      ],
    }).as('teachers');

    cy.contains('Create').click();

    cy.url().should('include', '/sessions/create');

    cy.get('button[type=submit]').should('be.disabled');

    cy.get('input[formControlName=name]').type('New Session');
    cy.get('input[formControlName=date]').type('2025-08-20');
    cy.get('textarea[formControlName=description]').type('New Description');

    cy.get('button[type=submit]').should('be.disabled');

    cy.get('mat-select[formControlName=teacher_id]').click();
    cy.wait('@teachers');
    cy.get('mat-option').contains('Margot DELAHAYE').click();

    cy.get('button[type=submit]').should('be.enabled');
  });
});