describe("Adding an answer", function () {

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

    it("should add 1 answer", function () {
        login();
        cy.get('[data-cy="addAnswer0"]').click();
        cy.get('[data-cy="atext"]').type("cypress test");
        cy.get('[data-cy="createAnswer"]').click();

        cy.get('[data-cy="answer"]').should("have.length", 1);
    });
});