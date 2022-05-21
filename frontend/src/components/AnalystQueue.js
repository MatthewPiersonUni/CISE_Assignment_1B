import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function AnalystQueue() {

    const [analystQueue, setAnalystQueue] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const rejectArticle = (data) => {
        Axios.get(`http://localhost:3000/moveArticleAnalystToReject`, {params: {data}})
        .then(res => {
            setRefresh(!refresh)
        })
    }

    useEffect(() => {    
        Axios.get(`http://localhost:3000/getAnalystQueue`)
        .then(res => {
            setAnalystQueue(res.data.results)
        })
    }, [refresh]);

    return (
        <>
            AnalystQueue Test
            {analystQueue.map((element) => {
                return <div>
                    {element._id}
                    <button onClick={() => rejectArticle(element)}>Reject Article</button>
                </div>
            })}
        </>
    )
}