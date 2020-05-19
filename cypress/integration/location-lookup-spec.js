/// <reference types="cypress" />

describe("Location page market lookup", function () {
  beforeEach(function () {
    cy.visit(`/locations`);
  });

  it("grabs NYC zip code", function () {
    cy.get(".intro__form form input[name=zip]").type("10006"); // NYC zip
    cy.get('.intro__form form .submit input[type = "button"]').click();

    cy.get(".location-results .result h3").should("contain", "New York City");
  });

  it("grabs LI zip code", function () {
    cy.get(".intro__form form input[name=zip]").type("11703"); // LI zip
    cy.get('.intro__form form .submit input[type = "button"]').click();

    cy.get(".location-results .result h3").should("contain", "Long Island");
  });

  it("uses Online as fallback", function () {
    cy.get(".intro__form form input[name=zip]").type("80015"); // CO zip
    cy.get('.intro__form form .submit input[type = "button"]').click();

    cy.get(".location-results .result h3").should("contain", "Online");
  });
});
