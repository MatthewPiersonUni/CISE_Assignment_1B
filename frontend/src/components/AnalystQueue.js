import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function AnalystQueue() {

    const [analystQueue, setAnalystQueue] = useState([]);

    useEffect(() => {    
        Axios.get(`http://localhost:3000/getAnalystQueue`)
        .then(res => {
            setAnalystQueue(res.data.results)
        })
    }, []);

    return (
        <>
            AnalystQueue Test
            {analystQueue.map((element) => {
                return <div>
                    {element.doi}
                </div>
            })}
        </>
    )
}