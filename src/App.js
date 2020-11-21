import React, { useState } from "react";
import "./App.css";
import { getUser } from "./serviceGithub";

function App() {
    const [user, setUser] = useState();
    const [listProjects, setListProjects] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const searchProjects = () => {
        setListProjects()
        setError();
        setLoading(true);
        getUser(user)
            .then((res) => {
                console.log("RESSS", res);
                setListProjects(res);
                setLoading(false);
            })
            .catch((e) => {
                console.log("ERRO FRONTT", e);
                setError(`Error: ${e.data.message}`);
                setLoading(false);
            });
    };

    return (
        <div style={{ padding: 30 }}>
            <label htmlFor="user-input">Usuario: </label>
            <input
                id="user-input"
                placeholder={"ingrese usuario"}
                value={user || ""}
                onChange={(e) => setUser(e.target.value)}
            />
            <button disabled={!user} onClick={searchProjects}>
                Buscar
            </button>

            {listProjects && listProjects.length > 0 ? (
                listProjects.map((p) => <p key={p.id}>{p.name}</p>)
            ) : !listProjects && loading ? (
                <p>Cargando</p>
            ) : !listProjects && !error ? (
                <p>Esperando user</p>
            ) : (
                <div>{error}</div>
            )}
        </div>
    );
}

export default App;
