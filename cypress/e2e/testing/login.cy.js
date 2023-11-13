/// <reference types="cypress" />

import "dotenv/config";

const url = "https://kitylinn.github.io/social-media-client/";

const wait = 6000;

describe("LOGING TESTING", () => {
  it("logs in and checks profile", () => {
    cy.visit(url);
    cy.wait(wait);
    cy.get("#registerForm > .modal-footer > .btn.btn-outline-success").click();
    cy.wait(wait);
    cy.get("#loginEmail").type(Cypress.env("LOGINEMAIL"));
    cy.get("#loginPassword").type(Cypress.env("LOGINPASSWORD"));
    cy.get("#loginForm > .modal-footer > .btn-success").click();
    cy.wait(wait);
    cy.get(".profile-name").should("have.text", "testKit2");
  });
  it("it tries to login with invalid credentials", () => {
    cy.visit(url);
    cy.wait(wait);
    cy.get("#registerForm > .modal-footer > .btn.btn-outline-success").click();
    cy.wait(wait);
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
    cy.wait(wait);
    cy.get("#registerForm > .modal-footer > .btn.btn-outline-success").click();
    cy.wait(wait);
    cy.get("#loginEmail").type(Cypress.env("LOGINEMAIL"));
    cy.get("#loginPassword").type(Cypress.env("LOGINPASSWORD"));
    cy.get("#loginForm > .modal-footer > .btn-success").click();
    cy.wait(wait).then(() => {
      expect(localStorage.getItem("token").length).to.be.greaterThan(3);
    });
    cy.get('button[data-auth="logout"]').click();
    cy.wait(wait).then(() => {
      expect(localStorage.getItem("token")).to.equals(null);

      cy.get("#registerModalLabel").should("exist");
    });
  });
});
