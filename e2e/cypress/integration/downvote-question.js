describe("The question list", function () {

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

    it("should show 3 questions", function () {
        login();
        cy.get('[data-cy="downvoteQuestion1"]').click({force: true});
        cy.get('table').contains('td', '-1');
    });
});