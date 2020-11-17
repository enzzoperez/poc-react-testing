import React from "react";
import {
    render,
    screen,
    waitForElementToBeRemoved, waitForElement
} from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";
import { getProjects } from "./services/github";

jest.mock("./services/github");
const data = {
    id: 131356193,
    node_id: "MDEwOlJlcG9zaXRvcnkxMzEzNTYxOTM=",
    name: "apollo-react-test",
    full_name: "enzzoperez/apollo-react-test",
    owner: {
        login: "enzzoperez",
        id: 22937791,
    },
    default_branch: "master",
};

beforeEach(() => {
    document.body.innerHTML = "";
  });

// getProjects('ajksdkasd').then(res=>console.log('LCKDSD', res))
test("Test Call to api", async () => {
    getProjects.mockResolvedValue([data])
    render(<App />);
    expect(screen.getByText("Enter", { exact: false }));

    const input = screen.getByPlaceholderText("ingresa nombre", {
        exact: false,
    });
    const button = screen.getByRole("button", { name: "Buscar", exact: false });
    expect(button).toBeDisabled();
    user.type(input, "enzzoperez");
    expect(button).toBeEnabled();
    user.click(button);

    await waitForElementToBeRemoved(() => screen.getByText("cargando", { exact: false }));
    expect(getProjects).toHaveBeenCalledTimes(1);
    expect(getProjects).toHaveBeenCalledWith("enzzoperez");
    expect(screen.getByText("apollo-react-test", { exact: false })).toBeInTheDocument()
});

test('should error on screen', async () => {
    getProjects.mockResolvedValueOnce('eirirui')
    // getProjects('enzo').then(res=>console.log('LCKDSD', res))
    render(<App />);
    expect(screen.getByText("Enter", { exact: false }));

    const input = screen.getByPlaceholderText("ingresa nombre", {
        exact: false,
    });
    const button = screen.getByRole("button", { name: "Buscar", exact: false });
    expect(button).toBeDisabled();
    user.type(input, "res");
    expect(button).toBeEnabled();
    user.click(button);
    expect(getProjects).toHaveBeenCalledTimes(2);
    expect(getProjects).toHaveBeenCalledWith("res");
    await waitForElementToBeRemoved(() => screen.getByText("cargando", { exact: false }));
    expect(screen.getByText("error", { exact: false })).toBeInTheDocument()

})




