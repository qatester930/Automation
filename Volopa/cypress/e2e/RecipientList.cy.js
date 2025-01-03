///<reference types="cypress"/>

import { SigninPage } from "../pageObject/SigninPage"
import { RecipientListPage } from "../pageObject/RecipientListPage";
const signinpage = new SigninPage;
const recipientlist= new RecipientListPage;

describe('Recipient List Test Cases', () => {
    const userName = Cypress.config('users').user2.username
    const password = Cypress.config('users').user2.password


    beforeEach(() => {
        cy.visit('/login')
        signinpage.Signin(userName, password)
        signinpage.clickLogin()
        cy.url().should('include', '/wallet/dashboard')
    })
    it('TC_RL-001-Verify that user landed on the Recipient List page', () => {
        recipientlist.gotoRecipientList()
    })
    it.only('TC_RL-002-Verify that serach bar is working accurately on "Recipient List" page', () => {
        recipientlist.gotoRecipientList()
        recipientlist.ValidateSearchBar('sad')
})
it('TC_RL-003-verify that user landed on Add Recipient page', () => {
    recipientlist.gotoRecipientList()
    recipientlist.gotoAddRecipient()
})
it('TC_RL-004-Verify that user is able to add recipient', () => {
    recipientlist.gotoRecipientList()
    recipientlist.gotoAddRecipient()
    recipientlist.ValidateAddRecipient('UN','G')
    
})

})