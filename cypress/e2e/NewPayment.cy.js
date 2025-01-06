///<reference types="cypress"/>

import { SigninPage } from "../pageObject/SigninPage"
import { NewPaymentPage } from "../pageObject/NewPaymentPage";
import { RecipientListPage } from "../pageObject/RecipientListPage";
const signinpage = new SigninPage;
const newpayment= new NewPaymentPage;
const recipientlist = new RecipientListPage;
describe('New Payment Test Cases', () => {
    const userName = Cypress.config('users').user2.username
    const password = Cypress.config('users').user2.password


    beforeEach(() => {
        cy.visit('/login')
        signinpage.Signin(userName, password)
        signinpage.clickLogin()
        cy.url().should('include', '/wallet/dashboard')
    })
    it('TC_NP-001-Verify that user landed on the New Payment page', () => {
        newpayment.gotoNewPayment()
    })
    it('TC_NP-002-Verify that user can search the existing recipients in the search bar', () => {
        newpayment.gotoNewPayment()
        newpayment.ValidateSearchBar('sad')
        newpayment.validateRecipientData('sad')
    })
    it('TC_NP-003-Verify that user landed on Add Recipient page', () => {
        newpayment.gotoNewPayment()
       recipientlist.gotoRecipientList()
       recipientlist.gotoAddRecipient()
    })
    it('TC_NP-004-VVerify that user is able to navigate Create a Payment page', () => {
        newpayment.gotoNewPayment()
    })
    it.only('TC_NP-005-Verify that Funding Method Easy Transfer is not available for currencies other than GBP and Euro', () => {
        newpayment.gotoNewPayment()
        newpayment.ValidateSearchBar('sad')
        newpayment.ValidateFundingMethod('240')
    })
})