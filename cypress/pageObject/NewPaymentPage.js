class NewPaymentPage {
  // Getter methods to access page elements
  get payeeSelect() {
    return cy.get('#sp_payee');
  }

  get accountSelect() {
    return cy.get('#sp_account');
  }

  get amountInput() {
    return cy.get('#sp_amount');
  }

  get dateInput() {
    return cy.get('#sp_date');
  }

  get descriptionInput() {
    return cy.get('#sp_description');
  }

  get submitButton() {
    return cy.get('#pay_saved_payees');
  }

  get successMessage() {
    return cy.get('#alert_content > span');
  }

  // Action methods
  selectPayee(payeeName) {
    this.payeeSelect.select(payeeName);
    return this; // Enable method chaining
  }

  selectAccount(accountName) {
    this.accountSelect.select(accountName);
    return this;
  }

  enterAmount(amount) {
    this.amountInput.clear().type(amount);
    return this;
  }

  enterDate(date) {
    this.dateInput.clear().type(date);
    return this;
  }

  enterDescription(description) {
    this.descriptionInput.clear().type(description);
    return this;
  }

  submitPayment() {
    this.submitButton.click();
    return this;
  }

  verifySuccessMessage(expectedText) {
    this.successMessage.should('have.text', expectedText);
    return this;
  }

  /**
   * Fills the new payment form and submits it.
   *
   * @param {Object} paymentDetails - The payment information.
   * @param {string} paymentDetails.payee - The payee to select.
   * @param {string} paymentDetails.account - The account to select.
   * @param {string|number} paymentDetails.amount - The amount to be paid.
   * @param {string} paymentDetails.date - The payment date.
   * @param {string} paymentDetails.description - Payment description.
   */
  submitNewPayment(paymentDetails) {
    this.selectPayee(paymentDetails.payee)
      .selectAccount(paymentDetails.account)
      .enterAmount(paymentDetails.amount)
      .enterDate(paymentDetails.date)
      .enterDescription(paymentDetails.description)
      .submitPayment();
    return this;
  }
}

export default NewPaymentPage;