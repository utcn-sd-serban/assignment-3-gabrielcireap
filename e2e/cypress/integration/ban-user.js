describe("Banning a user", function () {

    beforeEach(function () {
        cy.request("http://localhost:8080/test/reseed")
            .its("status").should("be.equal", 200);
    });

    function login(username, password) {
        cy.visit("#/");
        cy.get('[data-cy="username"]').type(username);
        cy.get('[data-cy="password"]').type(password);
        cy.get('[data-cy="loginButton"]').click();
    }

    it("should ban 1 user", function () {
        login("user1", "pass1");
        cy.get('[data-cy="banUser2"]').click();
        login("user3", "pass3");
        cy.url().should('eq', 'http://localhost:3000/#/');
    });
});