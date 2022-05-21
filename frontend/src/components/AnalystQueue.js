import React from 'react';
import Axios from 'axios';

export default function AnalystQueue() {

    Axios.get(`http://localhost:3000/getAnalystQueue`)
    .then(res => {
        console.log(res.data.results)
    })

    return (
        <>
            AnalystQueue Test
        </>
    )
}