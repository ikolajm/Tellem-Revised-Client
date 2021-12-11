/// <reference types="cypress" />

describe('Friends screen testing', () => {
    beforeEach(() => {
        cy.visit('/authentication')
        cy.get('#loginEmail').type('jake@test.com')
        cy.get('#loginPassword').type('test')
        cy.get("#loginSubmit").click()
        cy.get("#friendsRoute").click()
    })

    // Is the friends list item active
    it('Correctly navigated to the friends screen', () => {
        cy.get('.director-switch.active').should("have.text", "Friends")
    })

    // If I click pending does the screen and active state change
    it('Screen switches when clicking links',() => {
        cy.get('.director-switch').contains("Pending").click()
        cy.get('.director-switch.active').should("have.text", 'Pending')
        cy.get('.labels').find('.type').should('be.visible')
    })
})