import React from "react";
import { useParams } from "react-router-dom";

const DetailProject = ({match}) => {
    const {userName, repoName} = useParams()
    console.log("PROPSSS DETAIL", userName, repoName);
    return (
        <>
            <div style={{ padding: 80 }}>Detalle del proyecto: </div>
        </>
    );
};

export default DetailProject;
