import React from 'react';
import "./style.css";
import { useParams } from 'react-router-dom';

const SinglePage = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Mongoose ID:{id}</h1>
        </div>
    )
}

export default SinglePage
