
import { nonAdmin } from '../fixtures/users';

describe('Session Participation', () => {
  it('should allow a non-admin user to participate in a session', () => {
    cy.intercept('POST', '/api/auth/login', {
      body: {
        token: 'jwt-token',
        type: 'Bearer',
        id: nonAdmin.id,
        username: nonAdmin.username,
        firstName: nonAdmin.firstName,
        lastName: nonAdmin.lastName,
        admin: nonAdmin.admin,
      },
    }).as('login');

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

    cy.intercept('GET', '/api/teacher/1', {
      body: { id: 1, firstName: 'John', lastName: 'Doe' },
    }).as('teacher');

    cy.intercept('GET', '/api/session/1', {
      body: {
        id: 1,
        name: 'Test Session',
        description: 'Test Session Description',
        date: new Date(),
        teacher_id: 1,
        users: [],
      },
    }).as('sessionDetail');

    cy.intercept('POST', '/api/session/1/participate/2', {}).as('participate');

    cy.visit('/login');
    cy.get('input[formControlName=email]').type(nonAdmin.username);
    cy.get('input[formControlName=password]').type(
      `${nonAdmin.firstName.toLowerCase()}!1234`
    );
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/sessions');

    cy.contains('button', 'Detail').click();

    cy.url().should('include', '/sessions/detail/1');
    cy.wait('@sessionDetail');

    cy.contains('button', 'Participate').click();

    cy.wait('@participate');

    cy.contains('button', 'Do not participate').should('be.visible');
  });

  it('should allow a non-admin user to un-participate from a session', () => {
    cy.intercept('POST', '/api/auth/login', {
      body: {
        token: 'jwt-token',
        type: 'Bearer',
        id: nonAdmin.id,
        username: nonAdmin.username,
        firstName: nonAdmin.firstName,
        lastName: nonAdmin.lastName,
        admin: nonAdmin.admin,
      },
    }).as('login');

    cy.intercept('GET', '/api/session', {
      body: [
        {
          id: 1,
          name: 'Test Session',
          description: 'Test Session Description',
          date: new Date(),
          teacher_id: 1,
          users: [2],
        },
      ],
    }).as('sessions');

    cy.intercept('GET', '/api/teacher/1', {
      body: { id: 1, firstName: 'John', lastName: 'Doe' },
    }).as('teacher');

    cy.intercept('GET', '/api/session/1', {
      body: {
        id: 1,
        name: 'Test Session',
        description: 'Test Session Description',
        date: new Date(),
        teacher_id: 1,
        users: [2], // User is already participating
      },
    }).as('sessionDetail');

    cy.intercept('DELETE', '/api/session/1/participate/2', {}).as(
      'unParticipate'
    );

    cy.visit('/login');
    cy.get('input[formControlName=email]').type(nonAdmin.username);
    cy.get('input[formControlName=password]').type(
      `${nonAdmin.firstName.toLowerCase()}!1234`
    );
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/sessions');

    cy.contains('button', 'Detail').click();

    cy.url().should('include', '/sessions/detail/1');
    cy.wait('@sessionDetail');

    cy.contains('button', 'Do not participate').click();

    cy.wait('@unParticipate');

    cy.contains('button', 'Participate').should('be.visible');
  });
});
