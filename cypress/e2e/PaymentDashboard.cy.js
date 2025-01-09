//<reference types="cypress"/>

import { SigninPage } from "../pageObject/SigninPage"
import { PaymentDashboardPage } from "../pageObject/PaymentDashboardPage"
const signinpage = new SigninPage;
const payment = new PaymentDashboardPage;

describe('Payment Dashboard Test Cases', () => {
    const userName = Cypress.config('users').user2.username
    const password = Cypress.config('users').user2.password

    beforeEach(() => {
        cy.visit('/login')
        signinpage.Signin(userName, password)
        signinpage.clickLogin()
        cy.url().should('include', '/wallet/dashboard')
    })

    it('TC_PD-001-Verify that user landed on the Payments Dashboard page"', () => {
        payment.gotoPaymentDashboard()
    })
    it('TC_PD-002-Verify that user is redirecting to "Recipient List screen"', () => {
        payment.gotoPaymentDashboard()
        payment.gotoRecipientList()
    })
    it('TC_PD-003-Verify that user is redirecting to "New Payment screen"', () => {
        payment.gotoPaymentDashboard()
        payment.gotoNewPayment()
    })
    it('TC_PD-004- Verify that user is redirecting to "Batch Payment" screen', () => {
        payment.gotoPaymentDashboard()
        payment.gotoBatchPayments()
    })
    it('TC_PD-005-Verify that recent activities is appearing in the "Recent Activity" section', () => {
        payment.gotoPaymentDashboard()
    })
    it('TC_PD-006-Verify that repeated recipients are appearing in the "Frequent Recipients" section', () => {
        payment.gotoPaymentDashboard()
        payment.ValidateFrequentRecipients('sad')
    })
    it('TC_PD-007- "Pay" button present in Frequent Recipients section is diecting to New Payment page', () => {
        payment.gotoPaymentDashboard()
        payment.ValidateFrequentRecipients('sad')
        payment.validatePayButton('sad')
    })
    it('TC_PD-008- Verify that recent payments are appearing in "Payment History" section', () => {
        payment.gotoPaymentDashboard()
        payment.validateRecentPayments()
    })
    it('TC_PD-009- Verify that information on the Recent Activity section are accurate', () => {
        payment.gotoPaymentDashboard()
        payment.ValidateRecentActivity()
    })
    it('TC_PD-10- "Repeat" button present on Payment Dashboard page  is diecting to New Payment page', () => {
        payment.gotoPaymentDashboard()
        payment.ValidateRepeatButton()
    })
})



