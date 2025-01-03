export class RecipientListPage{
gotoRecipientList(){
    cy.get('#Component_8_63').should('exist').click()
    cy.get('.ant-card-bordered.navbar-overlay').should('be.visible')
    cy.get('.ant-space-vertical.ant-space-align-center').eq(1).should('exist').and('contain.text','Payments').click()
        cy.url().should('include', '/payments/dashboard')
        cy.get('[id="rc-tabs-0-tab-/payments/recipient-list"]').should('exist').and('contain.text','Recipient List').click()
       
        cy.url().should('include', 'payments/recipient-list')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text','Recipient List')     
}
ValidateSearchBar(name){
    cy.get('.ant-input').should('exist').clear().type(name + '{enter}')
cy.wait(3000)
cy.get('.ant-empty-image').if().should('be.visible').and('contain.text', 'No Data')
    .else().then(() => {
        cy.get('[class="ant-table-tbody"] tr td:nth-child(1)').should('exist').and('contain.text', name)
    }) 
}
gotoAddRecipient(){
    cy.get('.ant-btn-primary.ant-btn-sm').should('exist').and('contain.text','Add Recipient').click()
    cy.url().should('include', '/payments/recipient-list/add-recipient')
    cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text','Recipient Details')  
}
ValidateAddRecipient(country,currency){
    cy.get('.ant-col.ant-form-item-label').eq(0).should('be.visible').and('contain.text', 'Recipient Bank Country')
        cy.get('#recipientBankCountry').should('not.be.disabled').type(country + '{enter}')
        cy.get('.ant-select-item-option-active').should('contain.text', country)
        cy.get('.ant-col.ant-form-item-label').eq(1).should('be.visible').and('contain.text', 'Recipient Currency')
        cy.get('#recipientCurrency').should('not.be.disabled').type(currency + '{enter}')
        cy.get('.ant-select-item-option-selected').eq(0).should('contain.text', currency)


}
       
    }


