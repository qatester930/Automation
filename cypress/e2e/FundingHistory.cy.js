///<reference types="cypress"/>

import { SigninPage } from "../pageObject/SigninPage"
import { FundingHistoryPage } from "../pageObject/FundingHistoryPage";
import { FundWalletPage } from "../pageObject/FundWalletPage";
const signinpage = new SigninPage;
const fundinghistory = new FundingHistoryPage;
const fundwallet = new FundWalletPage;
const month = "Mar";
const day = "10";
const year = "2021";

describe('Funding History Test Cases', () => {
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
    it('TC_FH-001-clicking on "funding history" from header navigate the user to "your transaction history" page"', () => {
        fundinghistory.gotoFundingHistory()
    })
    it('TC_FH-002-Validate that search functionality is working fine on "Your transaction history" page by Admin name', () => {
        fundinghistory.gotoFundingHistory()
        fundinghistory.ValidateSearchFunctionality('alexceaki')
    })
    it('TC_FH-003-Validate that search functionality is working fine on "Your transaction history" page by Description', () => {
        fundinghistory.gotoFundingHistory()
        fundinghistory.ValidateSearchFunctionality('yapily')
    })
    it('TC_FH-004-Pagination is working fine on your Funding History page ', () => {
        fundinghistory.gotoFundingHistory()
        fundinghistory.ValidatePagination()
    })
    it('TC_FH-005-Pagination filter is working fine on your Funding History page ', () => {
        fundinghistory.gotoFundingHistory()
        fundinghistory.ValidatePagination()
    })
    it('TC_FH-006-Verify that the calendar filter gives the accurate result ', () => {
        fundinghistory.gotoFundingHistory()
        fundinghistory.ValidateCalenders(month, day, year)
    })
    it('TC_FH-006-Verify that user is able to cancel the funding from funding details page', () => {
        fundinghistory.gotoFundingHistory()
        fundinghistory.ValidateCancellations()
    })
    it('TC_FH-007-Verify that the user cannot cancel the transaction that has a "Complete" status', () => {
        fundinghistory.gotoFundingHistory()
        fundinghistory.DisabledCancelButton()
    })
    it('TC_FH-008-clicking "return" should navigate to the your transaction history page ', () => {
        fundinghistory.gotoFundingHistory()
        fundinghistory.DisabledCancelButton()
    })
    it('TC_FH-009-Verify that the user can repeat the transaction if it has "Manual Push fund" status ', () => {
        fundinghistory.gotoFundingHistory()
        fundinghistory.RepeatManualPushFunds()
    })
    it('TC_FH-10-Verify that the user can repeat the transaction if it has "Easy Transfer" status ', () => {
        fundinghistory.gotoFundingHistory()
        fundinghistory.RepeatEasyTransferFunds()
        fundwallet.ValidateYapily('Modelo Sandbox')
        fundwallet.gotoOzoneAPI(username, passWord)
        fundwallet.validatePayment()
        fundwallet.validateCurrentDate(5)

    })
})