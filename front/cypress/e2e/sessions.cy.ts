describe('Sessions spec', () => {
  it('should display the list of sessions', () => {
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
    cy.get('.items .item').should('have.length', 1);
  });

  it('should allow an admin to create and delete a session', () => {
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
      body: [],
    }).as('sessions');

    cy.get('input[formControlName=email]').type('yoga@studio.com', { force: true });
    cy.get('input[formControlName=password]').type('test!1234{enter}{enter}', { force: true });

    cy.url().should('include', '/sessions');

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

    cy.get('input[formControlName=name]').type('New Session');
    cy.get('input[formControlName=date]').type('2025-08-20');
    cy.get('mat-select[formControlName=teacher_id]').click().get('mat-option').contains('Margot DELAHAYE').click();
    cy.get('textarea[formControlName=description]').type('New Description');

    cy.intercept('POST', '/api/session', {
      statusCode: 200,
      body: {
        id: 2,
        name: 'New Session',
        date: '2025-08-20T12:00:00.000+00:00',
        teacher_id: 1,
        description: 'New Description',
        users: [],
        createdAt: '2025-07-19T12:00:00.000+00:00',
        updatedAt: '2025-07-19T12:00:00.000+00:00',
      },
    }).as('createSession');

    cy.contains('Save').click();
    cy.url().should('include', '/sessions');

    cy.wait('@createSession');
    cy.wait('@sessions');
  });
});