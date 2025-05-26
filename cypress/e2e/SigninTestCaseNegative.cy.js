// cypress/e2e/SigninTestCaseNegative.cy.js

describe('Sign In - Negative Test Cases', () => {
  // Define selectors in a centralized object for easier maintenance.
  const selectors = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    errorMessage: '.error-message' // Adjust this selector to match the UI's error feedback element.
  };

  // Navigate to the login page before each test.
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display an error message when an invalid username or password is provided', () => {
    const invalidUsername = 'invalidUser';
    const invalidPassword = 'invalidPass';

    // Ensure the username field is visible and type the invalid username.
    cy.get(selectors.usernameInput)
      .should('be.visible')
      .type(invalidUsername);

    // Ensure the password field is visible and type the invalid password.
    cy.get(selectors.passwordInput)
      .should('be.visible')
      .type(invalidPassword);

    // Ensure the login button is enabled before clicking.
    cy.get(selectors.loginButton)
      .should('be.enabled')
      .click();

    // Verify that the error message becomes visible and contains the appropriate feedback.
    cy.get(selectors.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Invalid username or password');
  });

  // Additional negative test cases can be added below if needed.
});