export class WalletdashboardPage {
    goToWalletDashboard() {
        cy.get('[id="rc-tabs-0-tab-/wallet/dashboard"]').should('be.visible').and('contain.text', 'Wallet Dashboard').click()
        cy.url().should('include', '/wallet/dashboard')
    }
    validateWalletDashboard() {
        cy.get('.ant-typography.light-green.medium.fs-28px').should('be.visible').and('contain.text', 'Total Company Balance')
        cy.get(':nth-child(2) > :nth-child(1) > .ant-col > .ant-typography').eq(0).should('be.visible').and('contain.text', 'Wallet Balance')
        cy.get(':nth-child(3) > :nth-child(1) > .ant-col > .ant-typography').should('be.visible').and('contain.text', 'Cards Balance')
        cy.get('.ant-typography.dark-green.medium.fs-25px').eq(0).should('be.visible').and('contain.text', 'Recent Activity')
        cy.get('.ant-typography.dark-green.medium.fs-25px').eq(1).should('be.visible').and('contain.text', 'Wallet Breakdown')
        cy.get('.ant-typography.dark-green.medium.fs-25px').eq(2).should('be.visible').and('contain.text', 'Rate Checker')
        cy.get('.ant-typography.dark-green.medium.fs-25px').eq(3).should('be.visible').and('contain.text', 'Recent Funding History')
        cy.get('.ant-col-21 > .medium').should('be.visible').and('contain.text', 'Mark all as read').click()
        cy.get('.ant-typography.muli.semi-bold.fs-18px').eq(3).should('be.visible').and('contain.text', 'No Recent Activities')


    }
    viewAllFundingHistory() {
        cy.get('.ant-col-md-18.ant-col-xxl-7 .ant-btn-link').should('be.visible').and('contain.text', 'View All').and('be.enabled').click()
        cy.url().should('include', '/wallet/funding-history')
        cy.get(':nth-child(1) > .ant-col > .ant-typography').should('be.visible').and('contain.text', 'Your Transaction History')

    }
    getTotalCompanyBalance() {
        cy.get('[class="ant-typography light-green medium fs-28px"]').should('be.visible').and('contain.text', 'Total Company Balance')  //Heading
        return cy.get('.ant-typography.bold.fs-28px').eq(0).should('be.visible').invoke('text').then(text => { //Total Company Balance
            const totalBalance = text.replace(/[€,]/g, '').split(" ")[1].trim()
            return totalBalance
        })
    }
    getWalletBalance() {
        cy.get('.ant-typography.dark-green.medium.fs-28px').eq(0).should('be.visible').and('contain.text', 'Wallet Balance')  //Wallet Balance
        return cy.get('.ant-typography.bold.fs-28px').eq(1).should('be.visible').invoke('text').then(text => {
            const walletBalance = text.replace(/[€,]/g, '').split(" ")[1].trim()
            return walletBalance
        })
    }
    getCardsBalance() {
        cy.get('.ant-typography.dark-green.medium.fs-28px').eq(1).should('be.visible').and('contain.text', 'Cards Balance')  //Cards Balance
        return cy.get('.ant-typography.bold.fs-28px').eq(2).should('be.visible').invoke('text').then(text => {
            const cardBalance = text.replace(/[€,]/g, '').split(" ")[1].trim()
            return cardBalance
        })
    }
    CalculateSum(numerictotalamount) {
        let sum = 0

        cy.get('.ant-typography.dark-green.medium.fs-28px')
            .each($e1 => { //to iterate every iteration
                const amount = Number($e1.text().replace(/[€,]/g, '').split(" ")[1].trim());
                //const amount = Number($e1.text().split(" ")[1].trim())//€ 383,538.86
                sum = sum + amount//€ 383,538.86+€ 60,516.93
            }).then(function () { //to wait the above steps complete we used then so that it wait before it proceeds to next step
                expect(sum).to.be.equal(numerictotalamount)

            })
    }
    cardsBalanceDashboard() {
        cy.get(':nth-child(3) > :nth-child(1) > .ant-col > .ant-typography').should('be.visible').and('contain.text', 'Cards Balance').click()
        cy.url().should('include', '/cards/dashboard')
        cy.get(':nth-child(1) > .ant-row-space-between > :nth-child(1) > .ant-typography').should('be.visible').and('contain.text', 'Frequently Used Cards')
    }
    RateChecker(toCurrency, fromCurrency, toAmount) {
        cy.wait(3000)
        //cy.get('.ant-typography.dark-green.medium.fs-25px').eq(2).should('be.visible').and('contain.text', 'Rate Checker')
        cy.get('.ant-form > :nth-child(1)').should('be.visible').and('contain.text', 'Convert To')
        cy.get('#convertToCurrency').should('not.be.disabled').type(toCurrency + '{enter}')
        cy.get('[class="ant-select-selection-item"]').eq(0).should('contain.text', toCurrency)
        cy.get('#convertFromCurrency').should('not.be.disabled').type(fromCurrency + '{enter}')
        cy.get('[class="ant-select-selection-item"]').eq(1).should('contain.text', fromCurrency)
        cy.wait(1000)
        cy.get('#convertToValue').should('not.be.disabled').type(toAmount).and('contain.value', toAmount).wait(1000)
        cy.get('#convertFromValue').should('not.be.disabled').then(($input) => {
            const value = $input.attr('value')
            cy.wrap(value).as('convertedAmount')
        })

        
        cy.get('.ant-row-bottom > :nth-child(1) ')
            .should('exist')
            .and('contain.text', 'FX Rate')
            .should('exist')
        cy.wait(3000)
        cy.get('[type="submit"]').should('be.visible').and('contain.text', 'Convert').click().wait(2000)
        cy.get('[type="submit"]').should('be.visible').and('contain.text', 'Convert').click()
        cy.get('.ant-modal-body').should('be.visible').and('contain.text', 'Conversion Complete')
        cy.get('.ant-space > :nth-child(2) > .ant-btn').should('be.visible').and('contain.text', 'Convert More').click()
        cy.wait(2000)
    }
    GotoConvertBalances() {
        cy.get('.ant-tabs-tab-btn').eq(2).should('be.visible').and('contain.text', 'Convert Balances').click()
        cy.url().should('include', '/wallet/convert-balances')
        cy.get('.ant-typography.medium.dark-green.fs-28px').should('be.visible').and('contain.text', 'Convert Balances')

    }
    getAvailableToSpend(currency) {
        if (currency == 'EUR') {
            return cy.get('[data-row-key="EUR_12"] td:nth-child(2) [class="ant-space-item"]').should('exist').invoke('text')
        }
        if (currency == 'GBP') {
            return cy.get('[data-row-key="GBP_11"] td:nth-child(2) [class="ant-space-item"]').should('exist').invoke('text')
        }
        if (currency == 'USD') {
            return cy.get('[data-row-key="USD_0"] td:nth-child(2) [class="ant-space-item"]').should('exist').invoke('text')
        }
        if (currency == 'AUD') {
            return cy.get('[data-row-key="AUD_1"] td:nth-child(2) [class="ant-space-item"]').should('exist').invoke('text')
        }
        if (currency == 'CAD') {
            return cy.get('[data-row-key="CAD_2"] td:nth-child(2) [class="ant-space-item"]').should('exist').invoke('text')
        }
        if (currency == 'DKK') {
            return cy.get('[data-row-key="DKK_3"] td:nth-child(2) [class="ant-space-item"]').should('exist').invoke('text')
        }

    }
    gotoFundCard() {
        cy.get('.ant-typography.muli.semi-bold.fs-18px').eq(1).should('exist').and('contain.text', 'Fund Card').click()
        cy.get('.ant-col.ant-col-24.m-b-10').should('exist').and('contain.text', 'Fund Card Selection')
        cy.get('[data-row-key="1725"] > :nth-child(6) > .ant-btn > span').should('exist').and('contain.text', 'Confirm').click()
    }
    validateCrossIcon() {
        cy.get('.ant-typography.muli.semi-bold.fs-18px').eq(1).should('exist').and('contain.text', 'Fund Card').click()
        cy.get('.anticon.anticon-close.ant-modal-close-icon').should('exist').click()//croos the page by x
    }
    gotoFundWallet() {

        cy.get('.ant-typography.muli.semi-bold.fs-18px').eq(2).should('exist').and('contain.text', 'Fund Wallet').click()
        cy.url().should('include', '/wallet/fund')
        cy.get('.ant-col.ant-col-24.m-b-10').should('exist').and('contain.text', 'Fund Your Company Wallet')
    }
    NewCardfund() {
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'New Card Fund')
    }

    RemoveCurrencies(toCurrency, fromCurrency) {
        cy.get('#convertToCurrency').should('not.be.disabled').type(toCurrency + '{enter}')
        cy.get('[class="ant-select-selection-item"]').eq(0).should('contain.text', toCurrency)
        cy.get('#convertFromCurrency').should('not.be.disabled').type(fromCurrency + '{enter}')
        cy.get('[class="ant-select-selection-item"]').eq(1).should('contain.text', fromCurrency)


    }

    validateRecentActivity() {
        cy.get('.ant-typography.dark-green.medium.fs-25px').eq(0).should('be.visible').and('contain.text', 'Recent Activity')
        cy.get('[class="ant-card ant-card-bordered bg-gradient big-rounded"] [class="ant-row m-t-5"]').should('be.visible').click()
        cy.get(':nth-child(1) > .ant-col > .ant-space > [style=""] > .ant-typography').should('be.visible').and('contain.text', 'Transaction Date')
        cy.get(':nth-child(2) > .ant-col > .ant-space-vertical > :nth-child(1) > .ant-typography').should('be.visible').and('contain.text', 'Converted To')
        cy.get('.ant-row-space-between > :nth-child(1) > .ant-space-vertical > :nth-child(1) > .ant-typography')
            .should('be.visible').and('contain.text', 'Converted From')
        cy.get('[class="ant-row m-t-5"]').eq(0).should('be.visible').click()

    }
    ValidateSliderArrowIcons() {
        cy.get('.ant-col.ant-col-3 [class="ant-space-item"]').eq(0).should('exist').click()
        cy.get('.ant-col.ant-col-3 [class="ant-space-item"]').eq(1).should('exist').click()
    }


};



