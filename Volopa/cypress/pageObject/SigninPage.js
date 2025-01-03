export class SigninPage {
    Signin(userName, password) {
        cy.get('[class="ant-image-img"]').should('be.visible') //logo
        cy.get('[class="ant-typography fs-18px medium"]').should('be.visible').and('contain.text', 'Welcome Back!')
        if (userName != null) {
            cy.get('[id="username"]').should('exist').and('have.attr', 'placeholder', 'Username/email').clear().type(userName)
        }
        if (password != null) {
            cy.get('[id="password"]').should('exist').and('have.attr', 'placeholder', 'Enter Password').clear().type(password)
        }
    }
    clickLogin() {
        cy.get('[type="submit"]').should('be.visible').and('contain.text', 'Login').click() //Login
    }
    validateToast(message){
        cy.get('[class="ant-message-notice-content"]').should('be.visible').and('contain.text', message)
    }
    validateUsernameError(message) {
        cy.get('[id="username_help"][role="alert"]').should('be.visible').and('contain.text', message)
    }
    validatePasswordError(message) {
        cy.get('[id="password_help"][role="alert"]').should('be.visible').and('contain.text', message)
    }
    Forgotpass() {
        cy.get('.m-t-10 > .ant-col > .dark-green').should('be.visible').and('contain.text', 'Forgot password').click()
        cy.get('.ant-typography').should('be.visible').and('contain.text', 'Please enter your email to receive a link to reset your password')
    }

    Signup() {
        cy.get('.m-t-5 > .ant-col > .dark-green').should('be.visible').and('contain.text', 'Signup here').click()
    }

    Eyeicon(password, text) {
        cy.get('[id="password"]').should('exist').and('have.attr', 'placeholder', 'Enter Password').clear().type(password)
        cy.get('.ant-input-suffix').should('be.visible').click()
        cy.get('[id="password"]').should('exist').and('have.attr', 'type', 'text').clear().type(text)
        cy.get('.ant-input-suffix').click()
    }
}

