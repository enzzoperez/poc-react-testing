import React from "react";
import { render, screen, cleanup, wait } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";



const renderInit = () => {
    const utils = render(<App />);
    const inputUser = utils.getByPlaceholderText("ingrese usuario", {
        exact: false,
    });
    const buttonSearch = utils.getByRole("button",{name: /buscar/i});

    return ({utils, buttonSearch, inputUser})
};


test('should success request to api', () => {
    const {utils, buttonSearch, inputUser} = renderInit()
    expect(utils.getByText(/esperando/i)).toBeInTheDocument()
    expect(buttonSearch).toBeDisabled()
    user.type('e', inputUser)
    expect(buttonSearch).not.toBeDisabled()
    // user.type('nzzoperez', inputUser)
    // user.click(buttonSearch)

})
