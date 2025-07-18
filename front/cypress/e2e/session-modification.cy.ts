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

    cy.get('input[formControlName=email]').type('yoga@studio.com', { force: true });
    cy.get('input[formControlName=password]').type('test!1234{enter}{enter}', { force: true });

    cy.url().should('include', '/sessions');
    cy.get('.items .item').should('be.visible');

    cy.wait('@sessions');

    cy.url().should('include', '/sessions');

    cy.url().should('include', '/sessions');
    cy.contains('Detail').click();

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

    cy.url().should('include', '/sessions/detail/1');
    cy.get('input[formControlName=name]').clear().type('New Session Name');
    cy.get('input[formControlName=date]').clear().type('2025-08-21');
    cy.get('mat-select[formControlName=teacher_id]').click().get('mat-option').contains('Margot DELAHAYE').click();
    cy.get('textarea[formControlName=description]').clear().type('New Session Description');

    cy.intercept('PUT', '/api/session/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'New Session Name',
        date: '2025-08-21T12:00:00.000+00:00',
        teacher_id: 1,
        description: 'New Session Description',
        users: [],
        createdAt: '2025-07-19T12:00:00.000+00:00',
        updatedAt: '2025-07-19T12:00:00.000+00:00',
      },
    }).as('updateSession');

    cy.contains('Save').click();
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

    cy.get('input[formControlName=email]').type('yoga@studio.com', { force: true });
    cy.get('input[formControlName=password]').type('test!1234{enter}{enter}', { force: true });

    cy.url().should('include', '/sessions');
    cy.get('.items .item').should('be.visible');

    cy.wait('@sessions');

    cy.url().should('include', '/sessions');

    cy.url().should('include', '/sessions');
    cy.contains('Detail').click();
    cy.url().should('include', '/sessions/detail/1');

    cy.get('input[formControlName=name]').clear();
    cy.contains('Save').should('be.disabled');
  });
});
