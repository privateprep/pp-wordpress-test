describe("capture and handle utms from url", () => {
  const utms = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  var utmSelector = {
    utm_source: ".user-analytics-utm-source-wrap",
    utm_medium: ".user-analytics-utm-medium-wrap",
    utm_campaign: ".user-analytics-utm-campaign-wrap",
    utm_term: ".user-analytics-utm-term-wrap",
    utm_content: ".user-analytics-utm-content-wrap",
  };

  beforeEach(() => {
    //cookies cleared on each test
    cy.visit(
      `/?utm_source=cs_summer_mail&utm_medium=Eblast&utm_campaign=coding_space_summer&utm_term=test_term&utm_content=test_content`
    );
  });

  it("visits site with utms in url", () => {
    cy.visit(
      `/?utm_source=cs_summer_mail&utm_medium=Eblast&utm_campaign=coding_space_summer&utm_term=test_term&utm_content=test_content`
    );
  });

  it("successfully stores utms as cookies", () => {
    for (let utm of utms) {
      cy.getCookie(utm).should("exist");
    }
  });

  it("visits contact page", () => {
    cy.visit(`/contact`);
  });

  it("Set utm inputs to stored cookies", () => {
    cy.visit(`/contact`);
    for (let utm in utmSelector) {
      cy.getCookie(utm)
        .should("exist")
        .then((c) => {
          cy.get(
            `${utmSelector[utm]}>.nf-field-element>.ninja-forms-field`
          ).should("have.value", c.value);
        });
    }
  });

  it("Should clear cookies on thank-you page", () => {
    for (let utm of utms) {
      cy.getCookie(utm).should("exist");
    }
    cy.visit(`/thank-you-contact`);
    for (let utm of utms) {
      cy.getCookie(utm).should("be.null");
    }
  });
});
