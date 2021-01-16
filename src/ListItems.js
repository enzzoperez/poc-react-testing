import React from "react";

const ListItems = React.memo(({ listProjects, error, loading }) => {
    console.log('RENDER LISTTT')
    return (
        <>
            {listProjects && listProjects.length > 0 ? (
                listProjects.map((p, i) => <p key={p.id + i}>{p.name}</p>)
            ) : !listProjects && loading ? (
                <p>Cargando</p>
            ) : !listProjects && !error ? (
                <p>Esperando user</p>
            ) : (
                <div>Error: {error}</div>
            )}
        </>
    );
})

export default ListItems;
