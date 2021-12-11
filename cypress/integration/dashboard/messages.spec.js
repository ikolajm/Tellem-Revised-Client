/// <reference types="cypress" />

describe('Messages screen testing', () => {
    beforeEach(() => {
        cy.visit('/authentication')
        cy.get('#loginEmail').type('jake@test.com')
        cy.get('#loginPassword').type('test')
        cy.get("#loginSubmit").click()
    })

    // Is the friends list item active
    it('Correctly navigated to the friends screen', () => {
        cy.get('.director-switch.active').should("have.text", "Messages")
    })

    // If I click pending does the screen and active state change
    it('Screen switches when clicking links',() => {
        cy.get('.director-switch').contains("Archive").click()
        cy.get('.director-switch.active').should("have.text", 'Archive')
    })
})