import { SigninPage } from "../pageObject/SigninPage"
const signinpage = new SigninPage

describe('Sign in test cases', () => {
  const userName = Cypress.config('users').user2.username
  const password = Cypress.config('users').user2.password

  beforeEach(() => {
    cy.visit('/login')
  })
  it('TC_SIGN_005 - unable to login with invalid password and username', () => {
    signinpage.Signin('invalidUsername', 'invalidPassword')
    signinpage.clickLogin()
    signinpage.validateToast('Login failed, please check your username and password')
  })

  it('TC_SIGN_006 - unable to login with valid password and invalid username', () => {

    signinpage.Signin('invalidUsername', password)
    signinpage.clickLogin()
    signinpage.validateToast('Login failed, please check your username and password')
  })

  it('TC_SIGN_007 - email or password is filled then the other filed show an error message', () => {
    signinpage.Signin(userName, null)
    signinpage.clickLogin()
    signinpage.validatePasswordError('Please Enter Your Password')
  })
  
  it('TC_SIGN_008 -Login with empty fields,it displays an error message below the field.', () => {
    signinpage.Signin(null, null)
    signinpage.clickLogin()
    signinpage.validateUsernameError('Please Enter Your Username/email')
    signinpage.validatePasswordError('Please Enter Your Password')
  })

})