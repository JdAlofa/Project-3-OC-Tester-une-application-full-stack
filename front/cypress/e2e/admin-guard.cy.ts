import { admin, nonAdmin } from "../fixtures/users";

describe('Admin Guard', () => {
  it('should not show the create button for a non-admin user', () => {
    cy.login(nonAdmin);
    cy.contains('Create').should('not.exist');
  });

  it('should show the create button for an admin user', () => {
    cy.login(admin);
    cy.contains('Create').should('exist');
  });
});