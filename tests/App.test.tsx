import React from "react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("<App/>", () => {
  // test("should work", () => {
  //   render(<App />)

  //   expect(
  //     screen.getByText("Prueba técnica")
  //   ).toBeDefined()
  // })

  test("should add items and remove them", async () => {
    const user = userEvent.setup();
    render(<App />);

    //buscar el input
    const input = screen.getByRole("textbox");
    expect(input).toBeDefined();

    //buscar el formulario
    const form = screen.getByRole("form");
    expect(form).toBeDefined();

    //buscar el botón
    const button = form.querySelector("button");
    expect(button).toBeDefined();

    //acciones usuario
    await user.type(input, "hola");
    await user.click(button!);

    //asegurar de que el elemento se ha agregado
    const list = screen.getByRole("list");
    expect(list).toBeDefined();

    //solo un elemento
    expect(list.childNodes.length).toBe(1);

    //otro elemento aleatorio
    const randomText = crypto.randomUUID();
    await user.type(input, randomText);
    await user.click(button!);

    expect(list.childNodes.length).toBe(2);

    //se puede borrar
    const item = screen.getByText(randomText);
    const removeButton = item.querySelector("button");
    expect(removeButton).toBeDefined();
    await user.click(removeButton!);

    //solo un elemento
    expect(list.childNodes.length).toBe(1);

    //borramos todo
    const initialItem = screen.getByText("hola");
    const initialRemoveButton = initialItem.querySelector("button");
    expect(initialRemoveButton).toBeDefined();
    await user.click(initialRemoveButton!);

    const noResults = screen.getByText("No hay elementos");
    expect(noResults).toBeDefined();
  });
});
