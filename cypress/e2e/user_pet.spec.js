import { justFecha } from "../../src/Functions/utiities.js";

describe("Recorrido siendo un usuario", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Visita la página de inicio y navega a login", () => {
    cy.contains("Cuidamos a tus mascotas como parte de nuestra familia");

    cy.wait(500);
    cy.contains("Login").click();
    cy.url().should("include", "/auth/login");
  });

  it("Intenta iniciar sesion pero falla", () => {
    cy.visit("http://localhost:3000/auth/login");

    cy.contains("Login");
    cy.contains("¿No tienes una cuenta? ¡Crea Una!");

    cy.get('input[name="email"]').type("usuario_invalido@example.com");
    cy.get('input[name="password"]').type("contraseña_invalida");
    cy.wait(500);
    cy.get('input[name="password"]').clear();
    cy.wait(1500);
    cy.get('input[name="password"]').type("Password2");

    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="toast"]').should("be.visible");
    cy.contains("Usuario no encontrado").should("be.visible");
    cy.wait(500);
    cy.get('input[name="email"]').clear();
    cy.get('input[name="password"]').clear();
    cy.wait(1000);
  });

  it("Accede a su cuenta y realiza operaciones", () => {
    cy.visit("http://localhost:3000/auth/login");

    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("Password1");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/user/");

    cy.wait(2000);

    cy.contains("Mascotas").should("be.visible");
    cy.contains("Mascotas").click();
    cy.url().should("include", "/user/mascotas");

    cy.wait(2000);

    cy.get('[data-testid="sidebar"]').trigger("mouseover");
    cy.wait(500);
    cy.contains("Turno").should("be.visible").trigger("mouseenter");
    cy.wait(1000);
    cy.contains("Turno").click();

    cy.url().should("include", "/user/turno");

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);

    const formattedDate = justFecha(futureDate);
    console.log(formattedDate); 

    if (formattedDate) {
      cy.get('input[type="date"]').should("be.visible").type(formattedDate);
    }

    cy.wait(2500);

    cy.get('input[type="time"]').should("be.visible").type("14:30");
    cy.wait(500);
    cy.get("select").should("be.visible").select("Bati");
    cy.wait(500);
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.wait(500);

    cy.url().should("include", "/user/historial-atenciones");

    cy.contains("Se agendó correctamente el turno").should("be.visible");
    cy.wait(2000);
    cy.get(".toast_iconClose__k8rOo").click();
    cy.wait(500);

    cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").should("be.visible").type("Bati");

    cy.wait(500);
    cy.contains("Bati").click();
    cy.wait(2000);

    cy.get('[data-testid="sidebar"]').trigger("mouseover");
    cy.wait(500);
    cy.contains("Salir").should("be.visible").trigger("mouseenter");
    cy.wait(1500);

    cy.contains("Salir").click();

    cy.url().should("include", "/auth/login");
  });
});
