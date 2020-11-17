import React from "react";
import { Link } from "react-router-dom";

const ListRepos = (props) => {
    const { data } = props;
    return (
        <div>
            {data &&
                data.map((r, i) => (
                    <div key={i}>
                    <a href={`/${r.name}`}>
                        {r.name} - {r.description}
                    </a>

                    </div>
                ))}
        </div>
    );
};

export default ListRepos;
