class SigninPage {
  get emailInput() {
    return cy.get('input[name="email"]');
  }

  get passwordInput() {
    return cy.get('input[name="password"]');
  }

  get signInButton() {
    return cy.get('button[type="submit"]');
  }

  /**
   * Signs in the user using the provided credentials.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   */
  signIn(email, password) {
    this.emailInput.clear().type(email);
    this.passwordInput.clear().type(password);
    this.signInButton.click();
    return this;
  }
}

export default new SigninPage();