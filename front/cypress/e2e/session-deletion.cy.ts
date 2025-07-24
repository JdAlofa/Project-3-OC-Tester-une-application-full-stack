describe('Session Deletion spec', () => {
  it('should allow an admin to delete a session', () => {
    // Mock login response for an admin user
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'adminUser',
        firstName: 'Admin',
        lastName: 'User',
        admin: true,
      },
    });

    // Mock session list response
    cy.intercept('GET', '/api/session', {
      body: [
        {
          id: 1,
          name: 'Test Session to Delete',
          date: new Date(),
          teacher_id: 1,
          description: 'This is a test session created for deletion.',
          users: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }).as('sessions');

    // Mock session detail response
    cy.intercept('GET', '/api/session/1', {
      body: {
        id: 1,
        name: 'Test Session to Delete',
        date: new Date(),
        teacher_id: 1,
        description: 'This is a test session created for deletion.',
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }).as('sessionDetail');

    // Mock session deletion response
    cy.intercept('DELETE', '/api/session/1', {}).as('deleteSession');

    // Test execution
    cy.visit('/login');
    cy.get('input[formControlName=email]').type('admin@studio.com');
    cy.get('input[formControlName=password]').type('admin!1234{enter}{enter}');

    cy.url().should('include', '/sessions');
    cy.wait('@sessions');

    // Click the "Detail" button for our specific session
    cy.get('[data-cy=detail-button]').first().click();

    cy.url().should('include', '/sessions/detail/1');
    cy.wait('@sessionDetail');

    // Click the "Delete" button
    cy.get('[data-cy=delete-button]').click();

    // Assert the deletion request was sent and we are redirected
    cy.wait('@deleteSession');
    cy.url().should('eq', 'http://localhost:4200/sessions');
  });
});
