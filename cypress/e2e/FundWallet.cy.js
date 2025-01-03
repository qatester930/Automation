///<reference types="cypress"/>

import { SigninPage } from "../pageObject/SigninPage"
import{ FundWalletPage} from "../pageObject/FundWalletPage"
import { FundingHistoryPage } from "../pageObject/FundingHistoryPage";
import{WalletdashboardPage} from "../pageObject/WalletdashboardPage"
const signinpage = new SigninPage;
const fundwallet = new FundWalletPage;
const fundinghistory = new FundingHistoryPage;
const dashboard= new WalletdashboardPage;

describe('Fund Wallet Test Cases', () => {
    const userName = Cypress.config('users').user2.username
    const password = Cypress.config('users').user2.password
    const username = Cypress.config('ozoneAPIusers').Username
  const passWord = Cypress.config('ozoneAPIusers').Password

    beforeEach(() => {
        cy.visit('/login')
        signinpage.Signin(userName, password)
        signinpage.clickLogin()
        cy.url().should('include', '/wallet/dashboard')
    })

    it('TC_FW-001-Clicking on "Fund Wallet" from header navigate the user to "fund your company Payment page"', () => {
        fundwallet.gotoFundWallet()
})
it('TC_FW-002- "company Wallet balance" table is displayed on fund your company Wallet page', () => {
    fundwallet.gotoFundWallet()
})

it('TC_FW-003-Validate that clicking on "View all" from "company Wallet balance" table expands the table with all currencies ', () => {
    fundwallet.gotoFundWallet()
    fundwallet.ValidateFundWallet('NZD')
})

it('TC_FW-004-validate that the user is able to fund the company wallet with "euro" with easy transfer ', () => {
    fundwallet.gotoFundWallet()
    fundwallet.ValidateEasyTransferFund('EUR','120','yapily with modelo sandbox','EUR 120')
    fundwallet.ValidateYapily('Modelo Sandbox')
    fundwallet.gotoOzoneAPI(username,passWord)
    fundwallet.validatePayment()
    fundwallet.validateCurrentDate(5)
    
})

it('TC_FW-005-validate that the user is able to fund the company wallet with "GBP" with easy transfer ', () => {
    fundwallet.gotoFundWallet()
    fundwallet.ValidateEasyTransferFund('GBP','100','yapily with modelo sandbox','GBP 100')
    fundwallet.ValidateYapily('Modelo Sandbox')
    fundwallet.gotoOzoneAPI(username,passWord)
    fundwallet.validatePayment()
    fundwallet.validateCurrentDate(5)
})
it('TC_FW-006-validate that the user is able to fund the company wallet with "EUR" with manaul push funds  ', () => {
    fundwallet.gotoFundWallet()
    fundwallet.ValidateManualPushFunds('GBP','120','Manual Push Funds','yapily with modelo sandbox')
    dashboard.goToWalletDashboard()
    fundinghistory.gotoFundingHistory()
    fundinghistory.validateTransactionHistory()
    fundwallet.validateCurrentDate(5)

})



})









