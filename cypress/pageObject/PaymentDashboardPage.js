export class PaymentDashboardPage {
    gotoPaymentDashboard(){
        cy.get('#Component_8_63').should('exist').click()
        cy.get('.ant-card-bordered.navbar-overlay').should('be.visible')
        cy.get('.ant-space-vertical.ant-space-align-center').eq(1).should('exist').and('contain.text','Payments').click()
            cy.url().should('include', '/payments/dashboard')
            cy.get('.ant-typography.dark-green.medium.fs-25px').eq(0).should('be.visible').and('contain.text', 'Recent Activity')
    }
    gotoRecipientList(){
        cy.get('.ant-card-hoverable.b-g.center-align-text.hover-no-border').eq(0).should('be.visible').and('contain.text', 'Add A Recipient').click()
        cy.url().should('include', '/payments/recipient-list/add-recipient')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text','Recipient Details') 
    }
    gotoNewPayment(){
        cy.get('.ant-card-hoverable.b-g.center-align-text.hover-no-border').eq(1).should('be.visible').and('contain.text', 'New Payment').click()
        cy.url().should('include', '/payments/new-payment')
        cy.get('.ant-spin-dot').should('not.exist')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text','Create a Payment') 

    }
    gotoBatchPayments(){
        cy.get('[id="rc-tabs-0-tab-/payments/batch-payments"]').should('exist').and('contain.text','Batch Payments').click()
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text','Batch Payments')
    }
    ValidateFrequentRecipients(name){
        cy.get('.ant-typography.dark-green.medium.fs-25px').eq(1).should('be.visible').and('contain.text', 'Frequent Recipients')
        cy.get('.ant-btn-link.fs-18px.medium.pointer').eq(0).should('be.visible').and('contain.text', 'View All').and('be.enabled').click()
        cy.url().should('include', '/payments/recipient-list')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text','Recipient List') 
        cy.get('.ant-input').should('not.be.disabled').type(name + '{enter}')
        cy.get('.ant-table-tbody > tr td:nth-child(1)').should('exist').and('contain.text',name)
    }
    validatePayButton(name){
        cy.get('.ant-table-tbody > tr td:nth-child(1)').eq(1).should('exist').and('contain.text',name)
        .parents('tr')
            .find('[class="ant-btn ant-btn-primary"]').should('contain.text', 'Pay').click()
            cy.url().should('include', '/payments/new-payment')
            cy.get('.ant-spin-dot').should('not.exist')
            cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text','Create a Payment')     
    }
    validateRecentPayments(){
        cy.get('.ant-typography.dark-green.medium.fs-25px').eq(2).should('be.visible').and('contain.text', 'Recent Payments')
        cy.get('.ant-btn-link.fs-18px.medium.pointer').eq(1).should('be.visible').and('contain.text', 'View All').and('be.enabled').click()
        cy.url().should('include', '/payments/payment-history')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text','Payment History')
    }

    ValidateRecentActivity(){
        cy.get('.ant-typography.dark-green.medium.fs-25px').eq(0).should('be.visible').and('contain.text', 'Recent Activity')
        cy.get('[class="ant-card ant-card-bordered bg-gradient big-rounded"] [class="ant-row m-t-5"]').should('be.visible').click()
        cy.get(':nth-child(1) > .ant-col > .ant-space > [style=""] > .ant-typography').should('be.visible').and('contain.text','Transaction Date')
        cy.get(':nth-child(2) > .ant-col > .ant-space-vertical > :nth-child(1) > .ant-typography').should('be.visible').and('contain.text','Converted To')
        cy.get('.ant-row-space-between > :nth-child(1) > .ant-space-vertical > :nth-child(1) > .ant-typography')
        .should('be.visible').and('contain.text','Converted From')
    }
    ValidateRepeatButton(){
        cy.get('.ant-typography.dark-green.medium.fs-25px').eq(2).should('be.visible').and('contain.text', 'Recent Payments')
       cy.get('.ant-table-row.ant-table-row-level-0.row-border.medium').eq(4)
        .find('[class="ant-btn ant-btn-primary"]').should('contain.text', 'Repeat').click() //Repeat
        cy.url().should('include', '/payments/new-payment')
        cy.get('.ant-spin-dot').should('not.exist')
        cy.get('.ant-col.ant-col-24.m-b-10').should('be.visible').and('contain.text','Create a Payment')
    
    }
}
