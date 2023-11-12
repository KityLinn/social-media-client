/// <reference types="cypress" />

const url = "http://127.0.0.1:5500/index.html";

describe("LOGING TESTING", () => {
  it("logs in and checks profile", () => {
    cy.visit(url);
    cy.wait(1000);
    cy.get("#registerForm > .modal-footer > .btn.btn-outline-success").click();
    cy.wait(1000);
    cy.get("#loginEmail").type("testKit2@noroff.no");
    cy.get("#loginPassword").type("testtestybleh");
    cy.get("#loginForm > .modal-footer > .btn-success").click();
    cy.wait(1000);
    cy.get(".profile-name").should("have.text", "testKit2");
  });
  it("it tries to login with invalid credentials", () => {
    cy.visit(url);
    cy.wait(1000);
    cy.get("#registerForm > .modal-footer > .btn.btn-outline-success").click();
    cy.wait(1000);
    cy.get("#loginEmail").type("testKit2.error@noroff.no");
    cy.get("#loginPassword").type("errorerror");
    cy.get("#loginForm > .modal-footer > .btn-success").click();
    cy.on("window:alert", (t) => {
      expect(t).to.contain(
        "Either your username was not found or your password is incorrect",
      );
    });
  });
  it("logs out of account", () => {
    cy.visit(url);
    cy.wait(1000);
    cy.get("#registerForm > .modal-footer > .btn.btn-outline-success").click();
    cy.wait(1000);
    cy.get("#loginEmail").type("testKit2@noroff.no");
    cy.get("#loginPassword").type("testtestybleh");
    cy.get("#loginForm > .modal-footer > .btn-success").click();
    cy.wait(1000).then(() => {
      expect(localStorage.getItem("token").length).to.be.greaterThan(3);
    });
    cy.get('button[data-auth="logout"]').click();
    cy.wait(1000).then(() => {
      expect(localStorage.getItem("token")).to.equals(null);

      cy.get("#registerModalLabel").should("exist");
    });
  });
});
