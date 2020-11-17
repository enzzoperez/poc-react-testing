import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import useSWR from "swr";
import FormSearch from "./formSearch";
import ListRepos from "./listItems";
import { getProjects } from "./services/github";

function App() {
    const [user, setUser] = useState('');

    const { isLoading, error, data } = useSWR(`${user || ''}`,getProjects);

    useEffect(() => {
        // console.log("REACT swr", isLoading, error, data);
    }, [isLoading, error, data]);

    const changeForm = (value) => {
        setUser(value);
    };

    if (isLoading) return <div>Cargando ...</div>;
    if (error || typeof data == 'string') return <div>Ups!, ocurrio un error</div>;

    return (
        <div style={{ padding: 80 }}>
            <FormSearch handleChange={changeForm} />
            {
                !user ?
                <h3>Enter a userName</h3> :
                data ?
                <ListRepos data={typeof data != 'string' && data}/> : 
                <p>Cargando ...</p>
            }
            <ListRepos />
        </div>
    );
}

export default App;
