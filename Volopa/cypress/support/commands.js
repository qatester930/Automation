// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('formatedCurrentDate', (type, daysToAdd = 0) => {
    const currentDate = new Date()
    // Add days if needed
    currentDate.setDate(currentDate.getDate() + daysToAdd)
    let formattedDate = null

    if (type === 1) {
        formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) // e.g., '18 September 2024'
    }
    if (type === 2) {
        formattedDate = currentDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) // e.g., '18 Sep'
    }
    if (type === 3) {
        formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) // e.g., '18 Sep 2024'
    }
    if (type === 4) {
        formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }); 
        // e.g., 'December 31, 2024'
    }
    if (type === 5) {
        formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); 
        // e.g., 'January 1, 2025'
    }
    
    
    // Wrap the result to make it chainable in Cypress
    return cy.wrap(formattedDate)
})