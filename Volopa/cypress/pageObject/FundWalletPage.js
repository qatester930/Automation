export class FundWalletPage {
    gotoFundWallet() {
        cy.get('[id="rc-tabs-0-tab-/wallet/fund"]').should('be.visible').and('contain.text', 'Fund Wallet').click()
        cy.url().should('include', '/wallet/fund')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Fund Your Company Wallet')
    }
    ValidateFundWallet(Currency) {

        cy.get('.ant-typography.medium.fs-18px.dark-green').eq(1).should('be.visible').and('contain.text', 'Company Wallet Balance').wait(10000)
        cy.get('.ant-btn-link.medium.fs-18px.right-align-text').should('be.visible').and('contain.text', 'View All Currencies').and('be.enabled').click()
        cy.get('.ant-card-body').eq(2).should('be.visible').contains(Currency)
    }
    ValidateEasyTransferFund(toCurrency, fromAmount, description, data) {
        cy.wait(3000)
        cy.get('.ant-typography.fs-18px.medium.dark-green').eq(0).should('be.visible').and('contain.text', 'Fund Wallet By Amount')
        cy.get('#currency').should('not.be.disabled').type(toCurrency + '{enter}')
        cy.get('#amount').should('not.be.disabled').type(fromAmount).and('contain.value', fromAmount).wait(1000)
        cy.get('.ant-col.ant-form-item-label').eq(1).should('be.visible').and('contain.text', 'Description')
        cy.get('#description').type(description).and('contain.value', description).wait(1000)
        cy.get(':nth-child(2) > .ant-btn > span').should('be.visible').click()
        cy.get('.ant-card-grid').should('be.visible').and('contain.text', 'Fund via Easy Transfer (Open Banking)')
        cy.get('.ant-typography > .ant-image > .ant-image-img').should('be.visible')
        cy.get('.ant-col-16 > .ant-space > :nth-child(2) > .ant-typography').should('be.visible').and('contain.text', data)
        cy.get('.ant-typography.muli.light.fs-18px.dark-green').eq(2).should('be.visible').and('contain.text', 'Easy Transfer')
        cy.get('.ant-btn-primary').contains('Confirm').click().wait(10000)


    }
    ValidateYapily(bank) {
        //yapily and ozone redirection url validation? did only text on that page 
        cy.origin('https://payments.yapily.com', { args: { bank } }, ({ bank }) => {
            cy.get('.search-input.wl-primary-text-color').should('not.be.disabled').type(bank + '{enter}')
            cy.get('.p-radiobutton.p-component').should('exist').click()
            cy.get('.p-button.p-component').should('not.be.disabled').and('contain.text', 'Accept and Continue').click().wait(10000)
            cy.get('.centerpiece-card').should('exist').and('contain.text', 'Approve your payment')
            cy.get('.link.font-size-16').should('be.visible').and('contain.text', 'Continue on desktop').click()
        })
    }
    gotoOzoneAPI(username, passWord) {
        cy.origin('https://auth1.obie.uk.ozoneapi.io/perry/login', { args: { username, passWord } }, ({ username, passWord }) => {
            cy.get('.w-72').should('be.visible') //logo
            cy.get('.card.flex.justify-center.flex-col.ozone-login-card').should('be.visible').and('contain.text', 'Login')
            if (username != null) {
                cy.get('.ozone-input').eq(0).should('exist').and('have.attr', 'placeholder', 'username').clear().type(username)
            }
            if (passWord != null) {
                cy.get('.ozone-input').eq(1).should('exist').and('have.attr', 'placeholder', '**********').clear().type(passWord)
            }
            cy.get('#loginButton > span').should('exist').and('contain.text', 'Login').click()//pop up change password inspect
            cy.get('.ozone-pis-heading-1').should('be.visible').and('contain.text', 'Single Domestic Payment Consents (PIS)')
            cy.get('.ozone-pis-heading-4').eq(0).should('be.visible').and('contain.text', 'Select Debitor Account')
            cy.get('.flex.flex-row.justify-between').eq(0).should('exist').and('contain.text', 'Luigi International').click()
            cy.get('[id="confirmButton"]').should('exist').and('contain.text', 'Confirm').click().wait(10000)
        })
    }
    validatePayment() {
        //redirect valdation on fund wallet
        cy.get('.purple').eq(1).should('be.visible').and('contain.text', 'Funds could take up to 2 hours to be posted')
        cy.get('.ant-btn-primary').eq(1).should('exist').and('contain.text', 'View Payment').click()
        cy.url().should('include', '/wallet/funding-history')
        cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Your Transaction History')
    }
    validateCurrentDate(type , daysToAdd = 0) {
        cy.formatedCurrentDate(type, daysToAdd).then((formattedDate) => {
        cy.get('.ant-table-tbody > tr td:nth-child(2)').should('be.visible').and('contain.text', formattedDate);
        });
    }

    ValidateManualPushFunds(toCurrency, Amount, description) {
        cy.wait(3000)
        cy.get('.ant-typography.fs-18px.medium.dark-green').eq(0).should('be.visible').and('contain.text', 'Fund Wallet By Amount')
        cy.get('.ant-select-selector').eq(0).should('not.be.disabled').type(toCurrency + '{enter}')
        cy.get('#amount').should('not.be.disabled').type(Amount).and('contain.value', Amount).wait(1000)
        cy.get('.fs-18px.muli.semi-bold').eq(0).should('be.visible').and('contain.text', 'Funding Method')
        cy.get('.ant-select-selector').eq(1).should('not.be.disabled').click()
        cy.get('.ant-select-item-option-content').eq(1).should('be.visible').and('contain.text', 'Manual Push Funds').click()
        cy.get('.ant-col.ant-form-item-label').eq(1).should('be.visible').and('contain.text', 'Description')
        cy.get('#description').type(description).and('contain.value', description).wait(1000)
        cy.get(':nth-child(2) > .ant-btn > span').should('be.visible').click()
       cy.get('.ant-modal-body').should('be.visible').and('contain.text','Funding Confirmation')
       cy.get('[type="submit"]').should('exist').and('contain.text','Confirm').click()
       cy.get('.ant-card-grid').should('be.visible')
       cy.get('.m-t-20 > .ant-col > .ant-space > [style=""] > .ant-btn').should('exist')
       .and('contain.text','Dashboard').click()
      
    }
}  