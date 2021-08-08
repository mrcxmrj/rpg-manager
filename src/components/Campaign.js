import React from "react";
import { useParams } from "react-router-dom";

export const Campaign = () => {
    const { id } = useParams();

    return <>{id}</>;
};
