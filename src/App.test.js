import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";
import { getUser } from "./serviceGithub";

jest.mock("./serviceGithub");
const dataSuccess = {
    id: "2231231",
    name: "enzouu",
};

const dataError = {
    data: {
        message: "not found"
    }
};

afterEach(() => {
    jest.clearAllMocks()
  })

const renderInit = () => {
    const utils = render(<App />);
    const inputUser = utils.getByPlaceholderText("ingrese usuario", {
        exact: false,
    });
    const buttonSearch = utils.getByRole("button", { name: /buscar/i });

    return { utils, buttonSearch, inputUser };
};

test("should success request to api", async () => {
    getUser.mockResolvedValue([dataSuccess]);
    const { utils, buttonSearch, inputUser } = renderInit();
    expect(utils.getByText(/esperando/i)).toBeInTheDocument();
    expect(buttonSearch).toBeDisabled();
    user.type(inputUser, "enzzoperez");
    expect(buttonSearch).toBeEnabled();
    user.click(buttonSearch);
    await waitForElementToBeRemoved(() =>
        utils.getByText("cargando", { exact: false })
    );
    expect(getUser).toHaveBeenCalledWith("enzzoperez");
    expect(getUser).toHaveBeenCalledTimes(1);
    expect(utils.getByText("enzouu", { exact: false })).toBeInTheDocument();
});

test("should error request to api", async () => {
    getUser.mockRejectedValue(dataError)
    const { utils, buttonSearch, inputUser } = renderInit();
    expect(buttonSearch).toBeDisabled();
    user.type(inputUser, "i4334jnrkni43");
    expect(buttonSearch).toBeEnabled();
    user.click(buttonSearch)
    await waitForElementToBeRemoved(()=>utils.getByText(/cargando/i))
    expect(getUser).toHaveBeenCalledWith('i4334jnrkni43')
    expect(getUser).toHaveBeenCalledTimes(1)
    expect(utils.getByText('found', {exact: false})).toBeInTheDocument()
});
