/// <reference types="cypress" />

describe("Login/logout testing", () => {
    beforeEach(() => {
        cy.visit('/authentication')
    })
    
    it('User can type in all login fields', () => {
        cy.get('#loginEmail').type('jake@test.com')
        cy.get('#loginPassword').type('test')
    })

    it("When user clicks the 'no account' span, the signup form is shown instead, can click the 'have an account' span and return to login" , () => {
        cy.get('#signupToggle').click()
        // Signup form id h2 visible
        cy.get("#signup").find("h2").contains("Let's get started!")
        cy.get("#signup").find("h2").should("be.visible")
        cy.get('#loginToggle').click()
        cy.get("#login").find("h2").contains("Welcome back!")
        cy.get("#login").find("h2").should("be.visible")
    })

    it("User can login, and will be directed to the messages screen", () => {
        cy.get('#loginEmail').type('jake@test.com')
        cy.get('#loginPassword').type('test')
        cy.get("#loginSubmit").click()
        // Should see toast
        cy.get(".Toastify").find(".Toastify__toast-container").should("be.visible")
        // Url should be /dashboard/messages
        cy.url().should('include', '/dashboard/messages')
        // User should see messages list item
        cy.contains("li", "Messages").should("be.visible")
    })

    it("User can click the logout button, and will be directed back to the authentication screen", () => {
        // Login
        cy.get('#loginEmail').type('jake@test.com')
        cy.get('#loginPassword').type('test')
        cy.get("#loginSubmit").click()
        // Click logout button
        cy.get('.nav-icon.logout').click()
        // Is the url '/authentication'
        cy.url().should('include', '/authentication')
        // Can you see 'welcome back'
        cy.get("#login").find("h2").contains("Welcome back!")
        cy.get("#login").find("h2").should("be.visible")
    })
})