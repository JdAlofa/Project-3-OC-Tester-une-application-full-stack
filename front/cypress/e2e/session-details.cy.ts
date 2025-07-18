import { admin } from '../fixtures/users';

describe('Session Details spec', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/session', {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: 'Session 1',
          date: '2025-07-20T12:00:00.000+00:00',
          teacher_id: 1,
          description: 'Description 1',
          users: [],
          createdAt: '2025-07-19T12:00:00.000+00:00',
          updatedAt: '2025-07-19T12:00:00.000+00:00',
        },
      ],
    }).as('sessions');

    cy.intercept('GET', '/api/session/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'Session 1',
        date: '2025-07-20T12:00:00.000+00:00',
        teacher_id: 1,
        description: 'Description 1',
        users: [],
        createdAt: '2025-07-19T12:00:00.000+00:00',
        updatedAt: '2025-07-19T12:00:00.000+00:00',
      },
    }).as('session');

    cy.intercept('GET', '/api/teacher/1', {
      statusCode: 200,
      body: {
        id: 1,
        lastName: 'DELAHAYE',
        firstName: 'Margot',
        createdAt: '2025-07-19T12:00:00.000+00:00',
        updatedAt: '2025-07-19T12:00:00.000+00:00',
      },
    }).as('teacher');

    cy.wait('@sessions');
    cy.login(admin);

    cy.url().should('include', '/sessions');
  });

  it('should display session details', () => {
    cy.get('button[routerLink*="detail"]').contains('Detail').click();

    cy.url().should('include', '/sessions/detail/1');

    cy.wait('@session');
    cy.wait('@teacher');

    cy.get('h1').should('contain', 'Session 1');
    cy.get('span').should('contain', 'Margot DELAHAYE');
    cy.get('.description').should('contain', 'Description 1');
  });

  it('should allow an admin to update a session', () => {
    cy.get('button[routerLink*="detail"]').contains('Detail').click();

    cy.url().should('include', '/sessions/detail/1');

    cy.intercept('PUT', '/api/session/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'Session 1 Updated',
        date: '2025-07-20T12:00:00.000+00:00',
        teacher_id: 1,
        description: 'Description 1 Updated',
        users: [],
        createdAt: '2025-07-19T12:00:00.000+00:00',
        updatedAt: '2025-07-19T12:00:00.000+00:00',
      },
    }).as('updateSession');

    cy.get('input[formControlName=name]').clear().type('Session 1 Updated');
    cy.get('textarea[formControlName=description]')
      .clear()
      .type('Description 1 Updated');

    cy.contains('Save').click();

    cy.wait('@updateSession');

    cy.url().should('include', '/sessions');
  });

  it('should allow an admin to delete a session', () => {
    cy.get('button[routerLink*="detail"]').contains('Detail').click();

    cy.url().should('include', '/sessions/detail/1');

    cy.intercept('DELETE', '/api/session/1', {
      statusCode: 200,
    }).as('deleteSession');

    cy.contains('Delete').click();

    cy.wait('@deleteSession');

    cy.url().should('include', '/sessions');
  });
});
