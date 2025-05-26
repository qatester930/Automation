"use strict";

class RecipientListPage {
  constructor() {
    // Define selectors using data attributes for stability.
    this.searchInput = () => cy.get('[data-test="recipient-search-input"]');
    this.addRecipientButton = () =>
      cy.get('[data-test="add-recipient-button"]');
    this.recipientTable = () =>
      cy.get('[data-test="recipient-table"]');
    // Returns the delete button for a specific recipient row.
    this.deleteButton = recipientName =>
      cy.contains('[data-test="recipient-row"]', recipientName)
        .find('[data-test="delete-recipient-button"]');
  }

  // Enters text into the search field to filter recipients.
  searchRecipient(recipientName) {
    this.searchInput().should('be.visible').clear().type(recipientName);
    return this;
  }

  // Clicks the button to add a new recipient.
  clickAddRecipient() {
    this.addRecipientButton().should('be.visible').click();
    return this;
  }

  // Verifies if the recipient appears in the list.
  verifyRecipientInList(recipientName) {
    this.recipientTable().should('contain', recipientName);
    return this;
  }

  // Deletes a recipient given its name.
  deleteRecipient(recipientName) {
    this.deleteButton(recipientName).should('be.visible').click();
    return this;
  }
}

export default new RecipientListPage();