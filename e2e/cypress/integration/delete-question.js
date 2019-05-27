describe("Delete a question", function () {

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

    it("should delete 1 question", function () {
        login();
        cy.get('[data-cy="deleteQuestion0"]').click();
        cy.get('[data-cy="question"]').should("have.length", 2);
    });
});