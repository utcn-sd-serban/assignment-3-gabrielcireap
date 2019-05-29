describe("Downvoting an answer", function () {

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

    it("should downvote 1 answer", function () {
        login("user1", "pass1");
        cy.get('[data-cy="addAnswer0"]').click();
        cy.get('[data-cy="atext"]').type("cypress test");
        cy.get('[data-cy="createAnswer"]').click();

        cy.get('[data-cy="answer"]').should("have.length", 1);
        login("user2", "pass2");
        cy.get('[data-cy="addAnswer0"]').click();
        cy.get('[data-cy="downvoteAnswer0"]').click({ force: true });
        cy.get('table').contains('td', '-1');
    });
});