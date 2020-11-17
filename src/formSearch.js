import React, { useState } from "react";

const FormSearch = ({ handleChange }) => {
    const [userName, setUserName] = useState();

    const changeInput = (e) => {
        setUserName(e.target.value)
    }

    return (
        <div name="form-container">
            <input
                placeholder={"Ingresa nombre de usuario"}
                onChange={(e) => changeInput(e)}
                value={userName || ''}
                id="input-user"
            />
            <button
                disabled={!userName}
                onClick={() => handleChange && handleChange(userName)}
            >
                Buscar
            </button>
        </div>
    );
};

export default FormSearch;
