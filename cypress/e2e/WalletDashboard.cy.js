///<reference types="cypress"/>

import { WalletdashboardPage } from "../pageObject/WalletdashboardPage"
import { SigninPage } from "../pageObject/SigninPage"

const dashboard = new WalletdashboardPage;
const signinpage = new SigninPage;



describe('Wallet Dashboard test cases', () => {
    const userName = Cypress.config('users').user1.username
    const password = Cypress.config('users').user1.password

    beforeEach(() => {
        cy.visit('/login')
        signinpage.Signin(userName, password)
        signinpage.clickLogin()
        cy.url().should('include', '/wallet/dashboard')
    })
    it('TC_WD-001 - Validate Payment Dashboard Content', () => {
        dashboard.goToWalletDashboard()
        dashboard.viewAllFundingHistory()

    })
    it('TC_WD-002 - Validate Total Company Balance on Dashboard', () => {
        dashboard.goToWalletDashboard()
        dashboard.getTotalCompanyBalance().then(totalBalance => {
            dashboard.getWalletBalance().then(walletBalance => {
                dashboard.getCardsBalance().then(cardBalance => {
                    expect(totalBalance).to.be.eq((parseFloat(walletBalance) + parseFloat(cardBalance)).toFixed(2))
                })
            })
        })


    })
    it('TC_WD-003- Validate clicking on Cards Balance, it should navigate to Cards Dashboard', () => {
        dashboard.goToWalletDashboard()
        dashboard.cardsBalanceDashboard()

    })
    it('TC_WD-004- Validate clicking on Mark all as read,it should display No Recent Activities', () => {
        dashboard.goToWalletDashboard()
    })
    it('TC_WD-005 - Validate Rate Checker from Wallet Dashboard', () => {
        dashboard.goToWalletDashboard()
        dashboard.GotoConvertBalances()
        //Get balance value for currencies
        dashboard.getAvailableToSpend('EUR').then(oldEURBalance => {
            dashboard.getAvailableToSpend('USD').then(oldUSDBalance => {
                let oldEURBalanceAmount = parseFloat(oldEURBalance.replace(/,/g, ''))
                let oldUSDBalanceAmount = parseFloat(oldUSDBalance.replace(/,/g, ''))
                //Convert the currencies
                dashboard.goToWalletDashboard()
                dashboard.RateChecker('EUR', 'USD', '120')
                //Get the balance values again
                dashboard.getAvailableToSpend('EUR').then(newEURBalance => {
                    dashboard.getAvailableToSpend('USD').then(newUSDBalance => {
                        let newEURBalanceAmount = parseFloat(newEURBalance.replace(/,/g, ''))
                        let newUSDBalanceAmount = parseFloat(newUSDBalance.replace(/,/g, ''))
                        expect(newEURBalanceAmount).to.be.greaterThan(oldEURBalanceAmount)
                        expect(newUSDBalanceAmount).to.be.lessThan(oldUSDBalanceAmount)
                    })
                })
            })
        })
    })
    it('TC_WD-006 - Validate convert balances,fund card,fund Payment navigations from Payment dashboard', () => {
        dashboard.goToWalletDashboard()
        dashboard.gotoFundWallet()
        dashboard.goToWalletDashboard()
        dashboard.GotoConvertBalances()
        dashboard.goToWalletDashboard()
        dashboard.gotoFundCard()

    })
    it('TC_WD-007 - Verify that when user click on the "X" icon the fun card screen get closed.', () => {
        dashboard.goToWalletDashboard()
        dashboard.validateCrossIcon()
    })
    it('TC_WD-008 - Verify that user click on confirm button, it redirects the user to New Fund card', () => {
        dashboard.goToWalletDashboard()
        dashboard.gotoFundCard()
        dashboard.NewCardfund()
    })
    it('TC_WD-009 -clicking on the slider arrow icons on recent activity section, the card gets slide to the left or right', () => {
        dashboard.goToWalletDashboard()
        dashboard.ValidateSliderArrowIcons()
    })
    it('TC_WD_010-  clicking on recent activity section, it gets minimize or maximize', () => {
        dashboard.goToWalletDashboard()
        dashboard.validateRecentActivity()
    })
    it('TC_WD_010-  Verify that user is able to remove the selected currency ', () => {
        dashboard.goToWalletDashboard()
        dashboard.RemoveCurrencies('EUR', 'USD')
    })
})
