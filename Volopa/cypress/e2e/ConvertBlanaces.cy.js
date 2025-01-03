///<reference types="cypress"/>

import { SigninPage } from "../pageObject/SigninPage"
import{ ConvertBalancesPage} from "../pageObject/ConvertBalancesPage"
import { WalletdashboardPage } from "../pageObject/WalletdashboardPage";

const signinpage = new SigninPage;
const balances= new ConvertBalancesPage;
const dashboard = new WalletdashboardPage;


describe('Convert Balances test cases', () => {
    const userName = Cypress.config('users').user2.username
    const password = Cypress.config('users').user2.password

    beforeEach(() => {
        cy.visit('/login')
        signinpage.Signin(userName, password)
        signinpage.clickLogin()
        cy.url().should('include', '/wallet/dashboard')
    })

    it('TC_CB-001- Clicking on "convert balance" from header navigates to the convert balances page', () => {
        balances.goToConvertBalances()
    })
    it('TC_CB-002- "Company Wallet balance" table should be displayed on convert balances page', () => {
        balances.goToConvertBalances()
       balances.ValidateConvertBalances('JPY')
    })
    it('TC_CB-003- "Clicking on "View all" from "Company Wallet balance" should expnad table with all currencies', () => {
        balances.goToConvertBalances()
       balances.ValidateConvertBalances('JPY')
    })
    it('TC_CB-004- verify that user can convert balances', () => {
        balances.goToConvertBalances()
        balances. CurencyConversion('USD','EUR','200')
        balances.EnabledConvertButton()
        balances.validatePopUp('Conversion Complete')
    })
    it('TC_CB-005-Balance shouldnot convert if the available balance is lower than the inputted amount ', () => {
        balances.goToConvertBalances()
        balances. CurencyConversion('USD','NZD','2,000')
        balances.EnabledConvertButton()
        balances.validatePopUp('Insufficient funds, please check your balance.')
    })
    it('TC_CB-006- convert button should be disabled it the user input the amount "0" ', ()=>{
        balances.goToConvertBalances()
        balances. CurencyConversion('USD','NZD','0')
       balances.DisaabledConvertButton()
    })
    it.only('TC_CB-007- Verify that "convert more" button updated the company Payment table', ()=>{
        balances.goToConvertBalances()
        balances. CurencyConversion('JPY','NZD','100')
        balances.EnabledConvertButton()
        balances.ValidateConvertMoreButton()
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
})