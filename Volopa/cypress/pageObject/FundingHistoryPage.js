export class FundingHistoryPage {
    gotoFundingHistory() {
        cy.get('[id="rc-tabs-0-tab-/wallet/funding-history"]').should('be.visible').and('contain.text', 'Funding History').click()
        cy.url().should('include', '/wallet/funding-history')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Your Transaction History')
    }
    ValidateSearchFunctionality(search) {
        cy.get('.ant-input').should('not.be.disabled').type(search + '{enter}')//by admin name
        cy.get('tbody td:nth-child(4)').should('be.visible').and('contain.text', 'alexceaki+00111@gmail.com')
        cy.get('.ant-input').should('not.be.disabled').clear().type(search + '{enter}')//by description
        cy.get('tbody td:nth-child(5)').should('be.visible').and('contain.text', 'yapily')



    }
    ValidatePagination() {
        cy.get('.ant-pagination-item-1').should('exist').click()
        cy.get('.anticon-right').should('exist').click()
        cy.get('.ant-select-selection-item[title="20 / page"]').should('be.visible')
        cy.get('.ant-table-tbody > tr').should('have.length', 21);

    }
    ValidateCalenders(month, day, year) {
        cy.get('.ant-picker-input').should('be.visible').click() //Calendar Icon
        //Select year
        cy.get('.ant-picker-header-view').should('be.visible').click().wait(1000)
        //cy.get('[class="ant-picker-cell ant-picker-cell-in-view"]').contains(year).eq(3).click()
        cy.contains(".ant-picker-cell-in-view", year).scrollIntoView().should('be.visible').click() //Click year
        cy.get('[class="ant-picker-year-btn"]').should('contain.text', year) //Validate selection

        //Select Month
        cy.get('[class="ant-picker-month-btn"]').should('be.visible').click() //Month
        cy.contains('[class="ant-picker-cell ant-picker-cell-in-view"]', month).scrollIntoView().should('be.visible').click()
        //cy.get('.ant-picker-cell-in-view').eq(Number(monthNumber)-1).click()
        //Select Day
        cy.contains(".ant-picker-cell-in-view", day).scrollIntoView().should('be.visible').click()
        cy.wait(3000)
        cy.get('[class="ant-empty-description"]').if().should('be.visible').and('contain.text', 'No Data')
            .else().then(() => {
                cy.get('[class="ant-table-tbody"] tr td:nth-child(2)').should('exist').and('contain.text', month).and('contain.text', (day + ', ' + year))
            })
    }
    ValidateCancellations() {
        cy.wait(8000)
        cy.get('.ant-table-tbody > tr td:nth-child(8)').contains('Awaiting Funds').click()
        cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Funding Details')
        cy.get('.ant-btn-danger').should('be.enabled').and('contain.text', 'Cancel Funding').click()
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-typography.center').should('be.visible').contains('Are you sure you wish to cancel this funding?')
        cy.get('.ant-btn-danger').eq(1).should('be.enabled').and('contain.text', 'Cancel Funding').click()
        cy.get('.ant-modal-body').should('be.visible').and('contain.text', 'Funding Cancelled')
        cy.get('.ant-btn-primary').eq(1).should('be.enabled').and('contain.text', 'Return to Funding History').click()
    }
    DisabledCancelButton() {
        cy.get('.ant-table-tbody > tr td:nth-child(8)').contains('Complete').click()
        cy.get('.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Funding Details')
        cy.get('.ant-btn-danger').should('be.disabled')
        cy.get('.ant-btn-primary').should('be.enabled').and('contain.text', 'Return').click()
        cy.url().should('include', '/wallet/funding-history')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text', 'Your Transaction History')
    }
    RepeatManualPushFunds() {
        cy.get('.ant-table-tbody > tr td:nth-child(7)').contains('Manual Push Funds').parents('tr')
            .find('[class="ant-btn ant-btn-primary"]').should('contain.text', 'Repeat').click() //Repeat
        cy.get('.ant-popover-inner-content').should('be.visible').and('contain.text', 'Are you sure you want to repeat this transaction?')
        cy.get('.ant-btn-primary.ant-btn-sm').should('exist').and('contain.text', 'Yes').click().wait(3000)
        cy.get('.ant-card-grid-hoverable').should('be.visible').and('contain.text', 'Funding Confirmation')
        cy.get('button[type="submit"]').should('exist').and('contain.text', 'Confirm').click()
    }
    validateTransactionHistory(){
        cy.get('.ant-table-tbody > tr td:nth-child(7)').contains('Manual Push Funds')
    }
RepeatEasyTransferFunds(){
    cy.get('.ant-table-tbody > tr td:nth-child(7)').contains('Easy Transfer').parents('tr')
            .find('[class="ant-btn ant-btn-primary"]').should('contain.text', 'Repeat').click() //Repeat
        cy.get('.ant-popover-inner-content').should('be.visible').and('contain.text', 'Are you sure you want to repeat this transaction?')
        cy.get('.ant-btn-primary.ant-btn-sm').should('exist').and('contain.text', 'Yes').click().wait(3000)
        cy.get('.ant-card-grid-hoverable').should('be.visible')
        cy.get('.ant-space > :nth-child(2) > .ant-btn > span').should('exist').and('contain.text', 'Confirm').click()
    }
}

