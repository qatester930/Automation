export class RecipientListPage {
    gotoRecipientList() {
        cy.get('#Component_8_63').should('exist').click()
        cy.get('.ant-card-bordered.navbar-overlay').should('be.visible')
        cy.get('.ant-space-vertical.ant-space-align-center').eq(1).should('exist').and('contain.text', 'Payments').click()
        cy.url().should('include', '/payments/dashboard')
        cy.get('[id="rc-tabs-0-tab-/payments/recipient-list"]').should('exist').and('contain.text', 'Recipient List').click()

        cy.url().should('include', 'payments/recipient-list')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Recipient List')
    }
    ValidateSearchBar(name) {
        cy.get('.ant-input').should('exist').clear().type(name + '{enter}')
        cy.wait(3000)
        cy.get('.ant-empty-image').if().should('be.visible').and('contain.text', 'No Data')
            .else().then(() => {
                cy.get('[class="ant-table-tbody"] tr td:nth-child(1)').should('exist').and('contain.text', name)
            })
    }
    gotoAddRecipient() {
        cy.get('.ant-btn-primary.ant-btn-sm').should('exist').and('contain.text', 'Add Recipient').click()
        cy.url().should('include', '/payments/recipient-list/add-recipient')
        cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Recipient Details')
    }
    ValidateAddRecipient(country,currency) {
        cy.wait(6000)
        cy.get('.ant-col.ant-form-item-label').eq(0).should('be.visible').and('contain.text', 'Recipient Bank Country')
       cy.get('#recipientBankCountry').should('not.be.disabled').type(country +  '{enter}')
      // cy.get('.ant-select-dropdown').find('.ant-select-item-option-content').eq(index).contains(country).click({ force: true })
       cy.get('.ant-select-item-option-active').should('contain.text', country)
        cy.get('.ant-col.ant-form-item-label').eq(1).should('be.visible').and('contain.text', 'Recipient Currency')
        cy.get('#recipientCurrency').should('not.be.disabled').type(currency + '{enter}')
        cy.get('.ant-select-item-option-selected').eq(1).should('contain.text', currency)
    }
    /*SelectCountrybyIndex(index){
        cy.get('.ant-col.ant-form-item-label').eq(0).should('be.visible').and('contain.text', 'Recipient Bank Country')
        cy.get('#recipientBankCountry').should('not.be.disabled').type(country +  '{enter}')
        cy.get('.ant-select-item-option-active').should('contain.text', country)
        cy.get('.ant-select-selection-search').eq(0).click()
       cy.get('.ant-select-dropdown').find('.ant-select-item-option-content').contains(country).click({ force: true })
    }*/
    AddEmailAddress(email) {
        cy.get('.ant-col.ant-form-item-label').contains('Recipient Email Address')
        if (email != null) {
            cy.get('#iban').should('not.be.disabled').type(email)
            cy.get('#iban').should('have.value', email)
        }
    }
    AddIBAN(IBAN) {
        cy.get('.ant-col.ant-form-item-label').contains('IBAN')
        if (IBAN != null) {
            cy.get('#iban').should('not.be.disabled').type(IBAN)
            cy.get('#iban').should('have.value', IBAN)
        }
    }
    AddSwiftcodeBIC(Swiftcode) {
        cy.get('.ant-col.ant-form-item-label').contains('SWIFT Code/BIC')
        if (Swiftcode != null) {
            cy.get('#swift').should('not.be.disabled').type(Swiftcode)
        }
    }
    AddAccountNumber(accNumber) {
        cy.get('.ant-col.ant-form-item-label').contains('Account Number')
        if (accNumber != null) {
            cy.get('#accNumber').should('not.be.disabled').type(accNumber)
        }
    }
    AddSortcode(SortCode) {
        cy.get('.ant-col.ant-form-item-label').contains('Sort Code')
        if (SortCode != null) {
            cy.get('#sortCode').should('not.be.disabled').type(SortCode)
        }
    }
    AddBankCode(Bankcode) {
        cy.get('.ant-col.ant-form-item-label').contains('Bank Code')
        if (Bankcode != null) {
            cy.get('#bank_code').should('not.be.disabled').type(Bankcode)
        }
    }
    AddABAcode(ABAcode) {
        cy.get('.ant-col.ant-form-item-label').contains('ABA')
        if (ABAcode != null) {
            cy.get('#aba').should('not.be.disabled').type(ABAcode)
        }
    }
    AddCLABE(CLABE) {
        cy.get('.ant-col.ant-form-item-label').contains('CLABE')
        if (CLABE != null) {
            cy.get('#clabe').should('not.be.disabled').type(CLABE)
        }
    }
    AddIFSC(IFSC){
        cy.get('.ant-col.ant-form-item-label').contains('IFSC')
        if (IFSC != null) {
            cy.get('#clabe').should('not.be.disabled').type(IFSC)
        }
    }
    AddRecipientType() {
        cy.get('.ant-col-xs-24 > .ant-space-vertical >').eq(0).should('be.visible').and('contain.text', 'Recipient Type')
        cy.get('.ant-space > :nth-child(2) > .ant-card').should('exist').and('contain.text', 'Business').click()
    }
    AddRecipientTypeIndividual(){
        cy.get('.ant-col-xs-24 > .ant-space-vertical >').eq(0).should('be.visible').and('contain.text', 'Recipient Type')
        cy.get('[style=""] > .ant-card > .ant-card-body').should('exist').and('contain.text', 'Individual').click()
    }
    AddFirstName(FirstName){
        cy.get('.ant-col.ant-form-item-label').contains('First Name')
        cy.get('#firstName').should('not.be.disabled').type(FirstName)
    }
    AddLastName(LastName){
        cy.get('.ant-col.ant-form-item-label').contains('Last Name')
        cy.get('#lastName').should('not.be.disabled').type(LastName)
    }
    AddRecipientDescription(Description){
        cy.get('.ant-col.ant-form-item-label').contains('Recipient Nickname / Description')
        cy.get('#descriprion').should('not.be.disabled').type(Description)
    }
    AddBusinessname(businessName) {
        cy.get('.ant-col.ant-form-item-label').contains('Business Name / Description')
        cy.get('#businessName').should('not.be.disabled').type(businessName)
    }
    AddBusinessDescription(businessDescription) {
        cy.get('.ant-col.ant-form-item-label').contains('Business Description')
        cy.get('#businessDescription').should('not.be.disabled').type(businessDescription)
    }
    AddBusinessNature(businessNature) {
        cy.get('.ant-col.ant-form-item-label').contains('Business Nature')
        cy.get('#businessNature').should('not.be.disabled').type(businessNature)
    }
    AddAddress(address) {
        cy.get('.ant-col.ant-form-item-label').contains('Address')
        if (address != null) {
            cy.get('#address').should('not.be.disabled').type(address)
        }
    }
    AddPostCode(postcode) {
        cy.get('.ant-col.ant-form-item-label').contains('Postcode')
        if (postcode != null) {
            cy.get('#postcode').should('not.be.disabled').type(postcode)
        }
    }
    AddState(state) {
        cy.get('.ant-col.ant-form-item-label').contains('State')
        if (state != null) {
            cy.get('#state').should('not.be.disabled').type(state)
        }
    }
    AddCity(beneficiaryCity) {
        cy.get('.ant-col.ant-form-item-label').contains('City')
        if (beneficiaryCity != null) {
            cy.get('#beneficiaryCity').should('not.be.disabled').type(beneficiaryCity)
        }
    }
    SelectRecipientCountry(RecipientCountry) {
        cy.get('.ant-col.ant-form-item-label').contains('Recipient Country')
        if (RecipientCountry != null) {
            cy.get('#beneficiaryCountry').should('not.be.disabled').type(RecipientCountry + '{enter}')
        }
    }
    SelectPaymentPurpose(PaymentPurpose) {
        cy.get('.ant-typography.muli.semi-bold.fs-24px.dark-green').contains('Payment Purpose')
        if (PaymentPurpose != null) {
            cy.get('.ant-select-selection-search').eq(3).click()
            cy.get('.ant-select-dropdown').find('.ant-select-item-option-content').contains(PaymentPurpose).click({ force: true })
        }
    }
    clickAddRecipient() {
        cy.get('#submit').should('exist').and('contain.text', 'Add Recipient').click()
    }
    validateRecipientAdded() {

        cy.get('.ant-modal-body').should('exist').and('contain.text', 'Recipient Added')
        cy.get('.ant-btn-primary').contains('Return To Dashboard').click()
        cy.url().should('include', '/payments/dashboard')
    }
    gotoPayRecipient() {
        cy.get('.ant-modal-body').should('exist').and('contain.text', 'Recipient Added')
        cy.get('.ant-btn-primary').contains('Pay This Recipient').click()
        cy.url().should('include', 'payments/new-payment')
        cy.get('.ant-spin-dot').should('not.exist')
    }

    validateToast(message) {
        cy.get('.ant-notification-notice').should('be.visible').and('contain.text', message)
    }
    validateCityFieldError(message) {
        cy.get('#beneficiaryCity_help').should('be.visible').and('contain.text', message)

    }
    validateAddressFieldError(message) {
        cy.get('#address_help > ').should('be.visible').and('contain.text', message)

    }
    validateRecipientCountryFieldError(message) {
        cy.get('.ant-form-item-explain-error').should('be.visible').and('contain.text', message)

    }
    validateCLABEError() {
        cy.get('.ant-notification-notice-error.ant-notification-notice-closable').should('be.visible')
            .and('contain.text', 'Error Code: 451CLABE is missing')
    }
    ValidatePaymentPurposeError(message) {
        cy.get('#crossBorderPurposeCode_help > ').should('be.visible').and('contain.text', message)
    }
    ValidatePayButton() {
        cy.get('.ant-table-tbody > tr td:nth-child(5)').eq(0).should('exist')
        cy.get('.ant-btn-primary').eq(1).should('exist').and('contain.text', 'Pay').click()
        cy.get('.ant-spin-dot-spin').should('not.exist')
        cy.url().should('include', '/payments/new-payment')
    }
    ValidatePaginationArrow() {

        cy.get('.anticon-right').should('exist').click()
        cy.get('.anticon-left').should('exist').click()

    }
    ValidatePaginationFilter() {
        cy.get('.ant-pagination-item-1').should('exist').click()
        cy.get('.ant-pagination-item-2').should('exist').click()
    }
    ValidateNumberOfRecipientsPerPage() {
        cy.get('.ant-select-selection-item[title="10 / page"]').should('be.visible')
        cy.get('.ant-table-tbody > tr').should('have.length', 11);
    }
    ValidateViewHistory() {
        cy.get('tr.ant-table-row').eq(0).should('be.exist').click()
        cy.url().should('include', '/payments/recipient-list/recipient-details')
        cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Recipient Details')
        cy.get('.ant-btn-primary').eq(0).should('be.enabled').and('contain.text', 'View History').click()
        //cy.get('.ant-col-24.m-b-10').eq(1).should('be.visible').and('contain.text','Payment History')
        cy.get('.anticon-close.ant-modal-close-icon').should('be.visible').click()
    }
    ValidateRemoveButton() {
        cy.get('.ant-btn-primary.ant-btn-dangerous').should('be.enabled')
            .and('contain.text', 'Remove').click()
        cy.get('.ant-popover-inner-content').should('be.visible')
        cy.get('.ant-popover-message-title').should('be.visible').contains('Are you sure you want to delete this recipient?')
        cy.get('.ant-btn-primary.ant-btn-sm').should('be.enabled').and('contain.text', 'Yes').click()
        cy.url().should('include', '/payments/recipient-list')

    }
    gotoRecipientDetails() {
        cy.get('tr.ant-table-row').eq(0).should('be.exist').click()
        cy.url().should('include', '/payments/recipient-list/recipient-details')
        cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Recipient Details')
    }
    ValidateCity() {
        return cy.get('.ant-col.ant-form-item-label').contains('City').then(cityfield => {
            const cityindex = cityfield.toArray().findIndex(el => el === cityfield[0])
            return cityindex
        })
    }
    ValidateRecipientCountry() {
        return cy.get('.ant-col.ant-form-item-label').contains('Recipient Country').then(countryfield => {
            const countryindex = countryfield.toArray().findIndex(el => el === countryfield[1]);
            return countryindex
        })
    }
}


