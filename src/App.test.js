import React from "react";
import {
    render,
    screen,
    cleanup,
    wait,
} from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";
import { getUser } from "./serviceGithub";

jest.mock("./serviceGithub");
getUser.mockResolvedValue([{
    data: {
        id: "2231231",
        name: "enzouu",
    },
}]);

const renderInit = () => {
    const utils = render(<App />);
    const inputUser = utils.getByPlaceholderText("ingrese usuario", {
        exact: false,
    });
    const buttonSearch = utils.getByRole("button", { name: /buscar/i });

    return { utils, buttonSearch, inputUser };
};

test("should success request to api", () => {
    const { utils, buttonSearch, inputUser } = renderInit();
    expect(utils.getByText(/esperando/i)).toBeInTheDocument();
    expect(buttonSearch).toBeDisabled();
    user.type(inputUser, "e");
    expect(buttonSearch).toBeEnabled();
    user.type(inputUser, "nzzoperez");
    user.click(buttonSearch);
    
});
