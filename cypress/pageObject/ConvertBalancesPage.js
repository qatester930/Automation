class ConvertBalancesPage {
  constructor() {
    // Define selectors used throughout this page object.
    this.selectors = {
      fromCurrency: "#fromCurrencySelect",
      toCurrency: "#toCurrencySelect",
      amountInput: "#amountInput",
      convertButton: "#btnConvert",
      conversionResult: "#conversionResult" // Assuming this element displays the conversion result.
    };
  }

  /**
   * Gets the "from currency" select element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  getFromCurrency() {
    return cy.get(this.selectors.fromCurrency);
  }

  /**
   * Gets the "to currency" select element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  getToCurrency() {
    return cy.get(this.selectors.toCurrency);
  }

  /**
   * Gets the amount input field.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  getAmountInput() {
    return cy.get(this.selectors.amountInput);
  }

  /**
   * Gets the convert button element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  getConvertButton() {
    return cy.get(this.selectors.convertButton);
  }

  /**
   * Gets the conversion result element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  getConversionResult() {
    return cy.get(this.selectors.conversionResult);
  }

  /**
   * Selects the desired option from the "from currency" dropdown.
   * @param {string} currency - The currency to be selected.
   */
  selectFromCurrency(currency) {
    this.getFromCurrency().select(currency);
  }

  /**
   * Selects the desired option from the "to currency" dropdown.
   * @param {string} currency - The currency to be selected.
   */
  selectToCurrency(currency) {
    this.getToCurrency().select(currency);
  }

  /**
   * Clears any existing value and enters a new amount.
   * @param {number|string} amount - The amount to be entered.
   */
  enterAmount(amount) {
    this.getAmountInput().clear().type(amount);
  }

  /**
   * Clicks on the convert button.
   */
  clickConvertButton() {
    this.getConvertButton().click();
  }

  /**
   * Verifies that the conversion result contains the expected text.
   * @param {string} expectedText - The text expected to appear in the conversion result.
   */
  verifyConversionResult(expectedText) {
    this.getConversionResult().should("contain.text", expectedText);
  }
}

export default ConvertBalancesPage;