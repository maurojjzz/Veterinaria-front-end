import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import LoginForm from "../index.jsx";
import { useDispatch } from "react-redux";

const mockStore = configureStore([]);
// const mockDispatch = vi.fn();
// let mockDispatch;

vi.mock("react-redux", async () => {
  const actualRedux = await vi.importActual("react-redux");
  return {
    ...actualRedux,
    useDispatch: vi.fn(),
  };
});

describe("Componente LoginForm", () => {
  let mockDispatch;
  let store;

  beforeEach(() => {
    mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);

    store = mockStore({
      auth: {
        error: null,
        authenticated: false,
      },
    });
  });

  it("Renderiza el formulario de login", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /LOGIN/i })).toBeInTheDocument();
  });

  it("Muestra errores de validación cuando los campos son inválidos", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "" },
    });

    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /LOGIN/i }));

    await waitFor(() => {
      expect(screen.getByText(/Este campo no puede estar vacio/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/La contraseña es un campo requerido/i)).toBeInTheDocument();
    });
  });

  it("No llama al dispatch si las validaciones no son correctas", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "" },
    });

    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "Password1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /LOGIN/i }));

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("Llama al dispatch cuando las validaciones son correctas", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "user@user.com" },
    });

    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "Password1" },
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /LOGIN/i })).not.toBeDisabled();
    });

    fireEvent.click(screen.getByRole("button", { name: /LOGIN/i }));

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });

});
