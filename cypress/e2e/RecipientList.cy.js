///<reference types="cypress"/>

import { SigninPage } from "../pageObject/SigninPage"
import { RecipientListPage } from "../pageObject/RecipientListPage";
const signinpage = new SigninPage;
const recipientlist = new RecipientListPage;

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
    it('TC_RL-002-Verify that serach bar is working accurately on "Recipient List" page', () => {
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
        recipientlist.ValidateAddRecipient('UN', 'G', '')
        recipientlist.AddIBAN('GB06BARC20060513071472')
        recipientlist.AddSwiftcodeBIC('BARCGB22')
        recipientlist.AddAccountNumber('13071472')
        recipientlist.AddSortcode('200605')
        recipientlist.AddRecipientType()
        recipientlist.AddBusinessname('Test2')
        recipientlist.AddBusinessDescription('New business')
        recipientlist.AddBusinessNature('finance')
        recipientlist.AddAddress('H240')
        recipientlist.AddCity('Manchester')
        recipientlist.SelectRecipientCountry('United Kingdom')
        recipientlist.clickAddRecipient()

    })
    it('TC_RL-05-Verify that accurate error messages are apearing while adding a recipient', () => {
        recipientlist.gotoRecipientList()
        recipientlist.gotoAddRecipient()
        recipientlist.ValidateAddRecipient('UN', 'G', '')
        recipientlist.AddIBAN('GB06BARC20060513071472')
        recipientlist.AddSwiftcodeBIC('BARCGB22')
        recipientlist.AddAccountNumber('13071472')
        recipientlist.AddSortcode('200605')
        recipientlist.AddRecipientType()
        recipientlist.AddBusinessname('Test2')
        recipientlist.AddBusinessDescription('New business')
        recipientlist.AddBusinessNature('finance')
        recipientlist.AddAddress(null)
        recipientlist.AddCity(null)
        recipientlist.SelectRecipientCountry('United Kingdom')
        recipientlist.clickAddRecipient()
        recipientlist.validateCityFieldError('Please enter city')
        recipientlist.validateAddressFieldError('Please enter address')
    })
    it('TC_RL-06-Verify that missing the required fields, user is not able to add recipients.', () => {
        recipientlist.gotoRecipientList()
        recipientlist.gotoAddRecipient()
        recipientlist.ValidateAddRecipient('UN', 'G', '')
        recipientlist.AddIBAN(null)
        recipientlist.AddSwiftcodeBIC('BARCGB22')
        recipientlist.AddAccountNumber(null)
        recipientlist.AddSortcode(null)
        recipientlist.AddRecipientType()
        recipientlist.AddBusinessname('Test2')
        recipientlist.AddBusinessDescription('New business')
        recipientlist.AddBusinessNature('finance')
        recipientlist.AddAddress('H240')
        recipientlist.AddCity('Manchester')
        recipientlist.SelectRecipientCountry('United Kingdom')
        recipientlist.clickAddRecipient()
        recipientlist.validateToast('Please make sure you fill in the necessary fields')
    })
    it('TC_RL-007- clicking "Pay" button on Recipient List page, user navigates to New Payments page', () => {
        recipientlist.gotoRecipientList()
        recipientlist.ValidatePayButton()
    })
    it('TC_RL-08- Verify that "Recipient Country" fields location is after City field and it is required only for recipients with-SEK to Sweden-DKK to Denmark-NOK to Norway', () => {
        recipientlist.gotoRecipientList()
        recipientlist.gotoAddRecipient()
        recipientlist.ValidateAddRecipient('DENMARK', 'DKK', '')
        recipientlist.AddIBAN('GB06BARC20060513071472')
        recipientlist.AddSwiftcodeBIC('BARCGB22')
        recipientlist.AddAccountNumber('13071472')
        recipientlist.AddBankCode(null)
        recipientlist.AddRecipientType()
        recipientlist.AddBusinessname('Test2')
        recipientlist.AddBusinessDescription('New business')
        recipientlist.AddBusinessNature('finance')
        recipientlist.AddPostCode('11115')
        recipientlist.AddAddress('H25')
        recipientlist.AddCity('Lahore')
        recipientlist.SelectRecipientCountry(null)
        recipientlist.ValidateCity().then(cityindex => {
            recipientlist.ValidateRecipientCountry().then(countryindex => {
                expect(countryindex).to.be.lessThan(cityindex)

            })
        })


        recipientlist.clickAddRecipient()
        recipientlist.validateRecipientCountryFieldError('Please select recipient country')
    })
    it('TC_RL-09-Verify that "Recipient Country" is a mandatory field for the users-SEK to Sweden-DKK to Denmark-NOK to Norway', () => {
        recipientlist.gotoRecipientList()
        recipientlist.gotoAddRecipient()
        recipientlist.ValidateAddRecipient('DENMARK', 'DKK', '')
        recipientlist.AddIBAN('GB06BARC20060513071472')
        recipientlist.AddSwiftcodeBIC('BARCGB22')
        recipientlist.AddAccountNumber('13071472')
        recipientlist.AddBankCode(null)
        recipientlist.AddRecipientType()
        recipientlist.AddBusinessname('Test2')
        recipientlist.AddBusinessDescription('New business')
        recipientlist.AddBusinessNature('finance')
        recipientlist.AddPostCode('11115')
        recipientlist.AddAddress('H25')
        recipientlist.AddCity('Lahore')
        recipientlist.SelectRecipientCountry(null)
        recipientlist.clickAddRecipient()
        recipientlist.validateRecipientCountryFieldError('Please select recipient country')
    })
    it('TC_RL-10- Verify that clicking on a recipient, user is able to navigate to Recipient Details page', () => {
        recipientlist.gotoRecipientList()
        recipientlist.gotoRecipientDetails()

    })
    it('TC_RL-11- Verify that clicking "Remove" button, user is able to remove a recipient', () => {
        recipientlist.gotoRecipientList()
        recipientlist.ValidateViewHistory()
        recipientlist.ValidateRemoveButton()
    })
    it('TC_RL-12- clicking "View History" button,user should be on "Payment History" page. ', () => {
        recipientlist.gotoRecipientList()
        recipientlist.ValidateViewHistory()
    })
    it('TC_RL-13- Validate that the pagination arrow is working fine on "Recipient List" page', () => {
        recipientlist.gotoRecipientList()
        recipientlist.ValidatePaginationArrow()
    })
    it('TC_RL-14- Validate that the pagination filter is working fine on "Recipient List" page', () => {
        recipientlist.gotoRecipientList()
        recipientlist.ValidatePaginationFilter()
    })
    it('TC_RL-15- Verify that by default there should be 10 recipents in Recipients List page.', () => {
        recipientlist.gotoRecipientList()
        recipientlist.ValidateNumberOfRecipientsPerPage()
    })

})

