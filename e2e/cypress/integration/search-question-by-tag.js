describe("Searching for a question, by tag", function () {

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

    function addQuestion() {
        cy.get('[data-cy="askQuestion"]').click();
        cy.get('[data-cy="qtitle"]').type("cypress test");
        cy.get('[data-cy="qtext"]').type("cypress text");
        cy.get('[data-cy="qtags"]').type("cypress,testing");
        cy.get('[data-cy="createQuestion"]').click();

        cy.get('[data-cy="question"]').should("have.length", 4);
    }

    it("should search for one question", function () {
        login();
        addQuestion();
        cy.visit("#/index");
        cy.get('[data-cy="searchQuestionTitle"]').click();
        cy.get('[data-cy="qtitle"]').type("cypress");
        cy.get('[data-cy="searchQuestion"]').click();
        cy.get('[data-cy="question"]').should("have.length", 1);
    });
});