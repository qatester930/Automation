Below is an example of a refactored cypress/support/commands.js file that organizes common selectors, adds basic logging and error handling, and defines a few custom commands. This version makes the code easier to maintain and extend over time:

"use strict";

// Define reusable selectors in one place.
const selectors = {
  emailInput: 'input[name="email"]',
  passwordInput: 'input[name="password"]',
  submitButton: 'button[type="submit"]',
  logoutButton: '[data-test="logout"]'
};

// Custom command to perform a login action.
// It waits for input fields to be visible, clears any existing text,
// types the new values, and asserts the submit button is enabled before clicking.
Cypress.Commands.add("login", (email, password) => {
  cy.log("Executing login command");
  cy.get(selectors.emailInput)
    .should("be.visible")
    .clear()
    .type(email);

  cy.get(selectors.passwordInput)
    .should("be.visible")
    .clear()
    .type(password);

  cy.get(selectors.submitButton)
    .should("be.enabled")
    .click();
});

// Custom command to perform a logout action.
// It waits for the logout button to be visible before clicking.
Cypress.Commands.add("logout", () => {
  cy.log("Executing logout command");
  cy.get(selectors.logoutButton)
    .should("be.visible")
    .click();
});

// Custom command to get elements by a data-test attribute.
// This helps in selecting elements specifically marked for testing.
Cypress.Commands.add("getByTestId", (testId) => {
  return cy.get(`[data-test="${testId}"]`);
});

// Additional custom commands can be added below following the above pattern.
// This structure keeps selectors and command logic separate, easing future maintenance.
