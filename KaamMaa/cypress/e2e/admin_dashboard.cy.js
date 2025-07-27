describe("Admin Dashboard UI", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/test-admin-dashboard");
    });

    it("should render the dashboard header", () => {
        cy.contains("Dashboard Overview").should("exist");
        cy.contains("Live overview of user activity and service data").should("exist");
    });

    it("should display all stat cards", () => {
        [
            "Total Customers",
            "Total Workers",
            "Total Reviews",
            "Pending Verifications",
            "Total Professions",
            "Total Jobs",
        ].forEach(label => {
            cy.contains(label).should("exist");
        });
    });

    it("should render monthly charts", () => {
        cy.contains("Monthly New User Registrations").should("exist");
        cy.contains("Monthly Job Posts").should("exist");
        cy.get("svg").should("have.length.at.least", 2); // Charts are SVGs
    });
});