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
                cy.get('.ant-col-md-12 > :nth-child(1) >').should('be.visible').and('contain.text', 'Recipient Details')

            })
    }
    validateRecipientData(name) {
        cy.get('.ant-typography.underline.muli.semi-bold.fs-18px.pointer').should('be.visible')
            .and('contain.text', 'View Details').click()
        cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Recipient Details')
        cy.get('[class="ant-table-tbody"] tr td:nth-child(1)').should('exist').and('contain.text', name)
    }
    ValidateFundingMethod(currency, sendAmount) {
        cy.get('.ant-row.m-t-20 > .ant-col-24 >').should('be.visible').and('contain.text', 'Payment Details')
        cy.get('.ant-select-selection-search').eq(0).click()
        cy.get('.ant-select-dropdown').find('.ant-select-item-option-content').contains(currency).click({ force: true })
        cy.get('#youSend').should('not.be.disabled').type(sendAmount).and('contain.value', sendAmount).wait(1000)
        cy.get('.ant-select-selector').eq(1).should('exist').and('not.be.disabled').click()
        cy.get('.ant-select-item-option-content').eq(1).should('not.be.visible')

    }
    ValidateFXRate() {
        cy.wait(3000)
        cy.get('.ant-progress-inner').should('be.visible')
        cy.wait(30000)
        cy.get('.ant-spin-dot').should('exist')
        cy.wait(5000)
        cy.get('.ant-progress-inner').should('be.visible')
        cy.wait(30000)
    }
    PayRecipient(reference) {
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Create a Payment')
        cy.get('.ant-spin-dot').should('exist')
        cy.wait(5000)
        cy.get('.ant-card.ant-card-bordered.ant-card-hoverable').eq(4).should('exist').and('contain.text', 'Payment Reference')
        cy.get('#paymentReference').should('not.be.disabled').type(reference)
        cy.get('.ant-typography.fs-18px.medium.dark-green').contains('Reason For Payment')
        cy.get(':nth-child(2).ant-select-selection-item').eq(2).should('not.be.disabled').click()
        cy.get('.ant-select-item-option').contains('Payment of Invoice(s)').click()
        cy.get('[type="submit"]').should('be.visible').and('not.be.disabled').and('contain.text', 'Proceed to Pay').click()
        cy.get('.ant-modal-body').should('be.visible').and('contain.text', 'Payment Confirmation')
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > :nth-child(2) > .ant-btn')
            .should('exist').and('not.be.disabled').and('contain.text', 'Pay Recipient').click()
        cy.get('.ant-modal-body').should('be.visible').and('contain.text', 'Payment Booked - Pending Funds')
    }
    ViewPayment() {
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > ').eq(1).should('exist').and('not.be.disabled').and('contain.text', 'View Payment').click()
        cy.url().should('include', 'payments/payment-history')
        cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Payment History')
    }
    NewPayment() {
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > ').eq(2).should('exist').and('not.be.disabled').and('contain.text', 'New Payment').click()
        cy.url().should('include', 'payments/new-payment')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Create a Payment')
    }
    ReturntoDashboard() {
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > ').eq(3).should('exist').and('not.be.disabled').and('contain.text', 'Dashboard').click()
        cy.url().should('include', 'payments/dashboard')
        cy.get('.ant-typography.dark-green.fs-25px.medium').should('be.visible').contains('Recent Payments')
    }
    EnabledPriorityButton() {
        cy.get('.ant-row.m-t-20 > .ant-col-24 >').should('be.visible').and('contain.text', 'Settlement Method')
        cy.get('.ant-btn-primary.warning').should('exist').and('be.enabled').and('contain.text', 'Priority').click()
    }
    DisabledRegularButton() {
        cy.get('.ant-row.m-t-20 > .ant-col-24 >').should('be.visible').and('contain.text', 'Settlement Method')
        cy.get('.ant-btn-primary.ant-btn-background-ghost').should('exist').and('be.disabled')
    }
    EnabledRegularButton() {
        cy.get('.ant-row.m-t-20 > .ant-col-24 >').should('be.visible').and('contain.text', 'Settlement Method')
        cy.get('.ant-btn-primary.ant-btn-background-ghost').should('exist').and('be.enabled')
    }
    gotoEasyTransfer() {
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > ').eq(0).should('exist').and('not.be.disabled').and('contain.text', 'Fund via Easy Transfer (Open Banking').click()

    }
    validatePayment() {
        //redirect valdation on fund wallet
        cy.get('.purple').eq(1).should('be.visible').and('contain.text', 'Funds could take up to 2 hours to be posted')
        cy.get('.ant-btn-primary').eq(1).should('exist').and('contain.text', 'View Payment').click()
        cy.url().should('include', 'payments/payment-history')
        cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Payment History')
    }
}






