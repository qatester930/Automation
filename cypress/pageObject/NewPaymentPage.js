export class NewPaymentPage {
    gotoNewPayment() {
        cy.get('#Component_8_63').should('exist').click()
        cy.get('.ant-card-bordered.navbar-overlay').should('be.visible')
        cy.get('.ant-space-vertical.ant-space-align-center').eq(1).should('exist').and('contain.text', 'Payments').click()
        cy.url().should('include', '/payments/dashboard')
        cy.get('[id="rc-tabs-0-tab-/payments/new-payment"]').should('exist').and('contain.text', 'New Payment').click()
        cy.url().should('include', 'payments/new-payment')
        cy.get('.ant-spin-dot').should('not.exist')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Create a Payment')
    }
    ValidateSearchBar(name) {
        cy.get('.ant-select-selection-search-input').should('exist').clear().type(name + '{enter}')
        cy.wait(3000)
        cy.get('.ant-empty-image').if().should('be.visible').and('contain.text', 'No Data')
            .else().then(() => {
                cy.get('.ant-col-md-12 > :nth-child(1) >').should('be.visible').and('contain.text','Recipient Details')
                
    })
}
    validateRecipientData(name){
    cy.get('.ant-typography.underline.muli.semi-bold.fs-18px.pointer').should('be.visible')
    .and('contain.text','View Details').click()
    cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Recipient Details')
    cy.get('[class="ant-table-tbody"] tr td:nth-child(1)').should('exist').and('contain.text', name) 
    }
    ValidateFundingMethod(sendAmount){
        cy.get('.ant-row.m-t-20 > .ant-col-24 >').should('be.visible').and('contain.text','Payment Details')
        cy.get('#currency').should('exist').and('not.be.disabled').click()
        cy.get('.ant-select-item-option-content').should('exist').contains('USD{enter}')
        cy.get('[class="ant-select-selection-item"]').eq(1).should('contain.text','USD')
        cy.get('#youSend').should('not.be.disabled').type(sendAmount).and('contain.value', sendAmount).wait(1000)
        cy.get('.ant-select-selector').eq(1).should('exist').and('not.be.disabled').click()
        cy.get('.ant-select-item-option-content').eq(1).should('not.be.visible')


    }
}