describe('Me spec', () => {
  it('should display user information and allow logout', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: false,
      },
    });

    cy.intercept('GET', '/api/session', {
      statusCode: 200,
      body: [],
    }).as('sessions');

    cy.get('input[formControlName=email]').type('yoga@studio.com', { force: true })
    cy.get('input[formControlName=password]').type('test!1234{enter}{enter}', { force: true })

    cy.url().should('include', '/sessions');

    cy.intercept('GET', '/api/user/1', {
      statusCode: 200,
      body: {
        id: 1,
        email: 'yoga@studio.com',
        lastName: 'lastName',
        firstName: 'firstName',
        admin: false,
        createdAt: '2025-07-19T12:00:00.000+00:00',
        updatedAt: '2025-07-19T12:00:00.000+00:00',
      },
    }).as('user');

    cy.contains('Account').click();
    cy.url().should('include', '/me');

    cy.get('p').should('contain', 'Name: firstName LASTNAME');
    cy.get('p').should('contain', 'Email: yoga@studio.com');

    cy.contains('Logout').click();
    cy.url().should('include', '/');
  });
});