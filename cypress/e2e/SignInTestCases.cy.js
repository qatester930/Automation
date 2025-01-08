/// <reference types ="cypress"/>

import { SigninPage } from "../pageObject/SigninPage"

const signinPage = new SigninPage

describe('Sign in test cases', () => {
  beforeEach(()=>{
cy.visit('/login')
  })

  const userName = Cypress.config('users').user1.username
  const password = Cypress.config('users').user1.password
  

  it('TC_SIGN_001 - user is able to login with valid password or valid username', () => {
    cy.log(userName)
    signinPage.Signin(userName, password)
    signinPage.clickLogin()
    cy.url().should('include','/wallet/dashboard')
  })
  
  it('TC_SIGN_002 -clicking on forgot password,takes the user to expected page', () => {
    signinPage.Forgotpass()
    cy.url().should('include','/forgot-password')
  })
  const signup=new SigninPage
  it('TC_SIGN_003 -  click on the Signup Here button,takes the user to expected page.', () => {
    
   
    signup.Signup()
    cy.url().should('include','/signup/process.html?step=1.html')
  })

const text='random'
  it('TC_SIGN_004 - eye-icon is showing or hiding the password.', () => {
   
    signinPage.Eyeicon(password,text)
    
  })
})