/// <reference types="cypress" />

describe('Profile testing suite', () => {
    beforeEach(() => {
        cy.visit('/authentication')
        cy.get('#loginEmail').type('jake@test.com')
        cy.get('#loginPassword').type('test')
        cy.get("#loginSubmit").click()
        cy.get("#profileRoute").click()
        cy.get('.head').find('h1').should("be.visible")
    })

    it('Modifying any aspect of the edit profile card will be reflected in the user preview', () => {
        // Username
        cy.get('#username').type('a')
        cy.get('#username').type('jmi')
        cy.get('.profile-preview').find('.name').contains('jmi')
        // IDcode
        cy.get('#idCode').type(12345)
        cy.get('.profile-preview').find('.idCode').contains(12345)
        // Email
        cy.get('#email').type('badtest')
        cy.get('#email').type('jake@test.com')
        // Preferred Color
        cy.get('.color-option.blue').click()
        cy.get('.color-option.blue').should('have.class', 'selected')
    })

    it('Clicking the edit password button brings down a modal', () => {
        cy.get('.edit-password').find('button').click()
        cy.get('.modal-title').should('be.visible')
    })

    it('User can type in all edit password fields', () => {
        cy.get('.edit-password').find('button').click()
        cy.get('.modal-title').should('be.visible')
        cy.get('#password').type('test')
        cy.get('#newPassword').type('test')
        cy.get('#confirmNewPassword').type('test')
    })

    it('On cancel button click the modal closes', () => {
        cy.get('.edit-password').find('button').click()
        cy.get('.modal-title').should('be.visible')
        cy.get('#cancelButton').click()
        cy.get('#cancelButton').should('not.exist')
    })
    
    it('On submit button (fail) the user sees an error toast', () => {
        cy.get('.edit-password').find('button').click()
        cy.get('.modal-title').should('be.visible')
        cy.get('#password').type('testing')
        cy.get('#newPassword').type('test')
        cy.get('#confirmNewPassword').type('test')
        cy.get('.save-password').click()
        cy.contains('Provided password does not match our records').should('be.visible')
    })

    it('On submit button click (success) user will see a success toast and closed modal', () => {
        cy.get('.edit-password').find('button').click()
        cy.get('.modal-title').should('be.visible')
        cy.get('#password').type('test')
        cy.get('#newPassword').type('test')
        cy.get('#confirmNewPassword').type('test')
        cy.get('.save-password').click()
        cy.contains('Password successfully updated!').should('be.visible')
    })

})