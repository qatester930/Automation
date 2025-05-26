// Improved Cypress tests for Wallet Dashboard
describe('Wallet Dashboard', () => {
  // Runs before each test to visit the dashboard page.
  beforeEach(() => {
    // Adjust the URL as needed for your application
    cy.visit('/wallet-dashboard');
  });

  // Verify that the wallet overview renders correctly
  it('should display the wallet overview', () => {
    cy.contains('Wallet Overview').should('be.visible');
    cy.get('.wallet-balance')
      .should('exist')
      .and('not.be.empty');
  });

  // Test the deposit functionality
  it('should allow the user to deposit funds', () => {
    // Click on the Deposit button and fill out the deposit form
    cy.get('button').contains('Deposit').click();
    cy.get('input[name="amount"]').type('100');
    cy.get('button').contains('Confirm').click();

    // Validate that the deposit action was successful
    cy.contains('Deposit successful').should('be.visible');
  });

  // Test the withdrawal functionality
  it('should allow the user to withdraw funds', () => {
    // Click on the Withdraw button and fill out the withdraw form
    cy.get('button').contains('Withdraw').click();
    cy.get('input[name="amount"]').type('50');
    cy.get('button').contains('Confirm').click();

    // Validate that the withdraw action was successful
    cy.contains('Withdrawal successful').should('be.visible');
  });

  // Verify that the transaction history is visible and contains at least one record
  it('should show transaction history', () => {
    cy.get('.transaction-history')
      .should('be.visible')
      .within(() => {
        // Assumes that the history is rendered in table rows
        cy.get('tr').its('length').should('be.gte', 1);
      });
  });

  // Test error handling for deposit with no amount
  it('should prevent deposit when no amount is entered', () => {
    cy.get('button').contains('Deposit').click();
    // Directly clicking confirm without entering an amount
    cy.get('button').contains('Confirm').click();

    // Validation for proper error message
    cy.contains('Please enter an amount').should('be.visible');
  });

  // Test error handling for withdrawing more than the available balance
  it('should show an error when attempting to withdraw more than the available balance', () => {
    cy.get('button').contains('Withdraw').click();
    // Type an excessively high number to simulate insufficient funds
    cy.get('input[name="amount"]').type('1000000');
    cy.get('button').contains('Confirm').click();

    // Validate that the error message is displayed
    cy.contains('Insufficient funds').should('be.visible');
  });
});