describe("Editing a question", function () {

    beforeEach(function () {
        cy.request("http://localhost:8080/test/reseed")
            .its("status").should("be.equal", 200);
    });

    function login() {
        cy.visit("#/");
        cy.get('[data-cy="username"]').type("user1");
        cy.get('[data-cy="password"]').type("pass1");
        cy.get('[data-cy="loginButton"]').click();
    }

    it("should add a question and edit it", function () {
        login();
        cy.get('[data-cy="askQuestion"]').click();
        cy.get('[data-cy="qtitle"]').type("cypress test");
        cy.get('[data-cy="qtext"]').type("cypress text");
        cy.get('[data-cy="qtags"]').type("cypress,testing");
        cy.get('[data-cy="createQuestion"]').click();

        cy.get('[data-cy="qtitle"]').type("edited");
        cy.get('[data-cy="qtext"]').type("edited");
        cy.get('[data-cy="qtags"]').type("9");
        cy.get('[data-cy="editQuestion"]').click();
        cy.get('[data-cy="qtable"]').contains('td', 'edited');
    });
});