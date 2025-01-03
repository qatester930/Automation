export class ConvertBalancesPage {
    goToConvertBalances() {
        cy.get('[id="rc-tabs-0-tab-/wallet/convert-balances"]').should('be.visible').and('contain.text', 'Convert Balances').click()
        cy.url().should('include', '/wallet/convert-balances')
        cy.get('.ant-typography.medium.dark-green.fs-28px').should('be.visible').and('contain.text', 'Convert Balances')

    }
    ValidateConvertBalances(currency) {
        
        cy.get('.ant-typography.medium.fs-18px.dark-green').eq(1).should('be.visible').and('contain.text', 'Company Wallet Balance').wait(10000)
        cy.get('.ant-btn-link.medium.fs-18px.right-align-text').should('be.visible').and('contain.text', 'View All Currencies').and('be.enabled').click()
        cy.get('.ant-card-body').eq(2).should('be.visible').contains(currency)
        cy.get('.ant-btn-link.medium.fs-18px.right-align-text').should('be.visible').and('contain.text', 'View Less Currencies')
    }
    CurencyConversion(toCurrency, fromCurrency, fromAmount) {
        cy.wait(3000)
        cy.get('.ant-typography.fs-18px.medium.dark-green').eq(0).should('be.visible').and('contain.text', 'Currency Conversion')
        cy.get('.ant-form > :nth-child(1)').should('be.visible').and('contain.text', 'Convert To')
        cy.get('#convertToCurrency').should('not.be.disabled').type(toCurrency + '{enter}')
        cy.get('[class="ant-select-selection-item"]').eq(0).should('contain.text', toCurrency)
        cy.get('#convertFromCurrency').should('not.be.disabled').type(fromCurrency + '{enter}')
        cy.get('[class="ant-select-selection-item"]').eq(1).should('contain.text', fromCurrency)
        cy.wait(1000)
        cy.get('#convertFromValue').should('not.be.disabled').type(fromAmount).and('contain.value', fromAmount).wait(1000)
        cy.get('#convertToValue').should('not.be.disabled').then(($input) => {
            const value = $input.attr('value')
            cy.wrap(value).as('convertedAmount')
        })

       
        cy.get('.ant-typography.muli.semi-bold.light-green').should('be.visible').and('contain.text', 'FX Rate').should('exist')
    }
    EnabledConvertButton(){
        cy.get('.ant-btn-primary').should('be.visible').and('contain.text', 'Convert').click().wait(2000)
    }
    validatePopUp(message){
        cy.get('.ant-modal-body').should('be.visible').and('contain.text', message)
        cy.get('.ant-btn-primary').eq(1).should('exist').and('contain.text', 'Dashboard').click()
        cy.url().should('include', '/wallet/dashboard')
        cy.get('.ant-typography.dark-green.medium.fs-25px').eq(0).should('be.visible').and('contain.text', 'Recent Activity')
    }
    DisaabledConvertButton(){
        cy.get('.ant-btn-primary').should('be.disabled')
    }
ValidateConvertMoreButton(){
    cy.get('.ant-btn-primary').eq(2).should('exist').and('contain.text', 'Convert More').click()
    cy.url().should('include', '/wallet/convert-balances')
    cy.get('.ant-typography.medium.dark-green.fs-28px').should('be.visible').and('contain.text', 'Convert Balances')

}


}