describe('Session Deletion spec', () => {
  it('should allow an admin to delete a session', () => {
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

    cy.intercept('DELETE', '/api/session/1', {
      statusCode: 200,
    }).as('deleteSession');

    cy.contains('Delete').click();
    cy.url().should('include', '/sessions');
  });
});
