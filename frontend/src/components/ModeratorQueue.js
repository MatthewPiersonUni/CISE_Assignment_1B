import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function ModeratorQueue() {

    const [moderatorQueue, setModeratorQueue] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const rejectArticle = (data) => {
        Axios.get(`http://localhost:3000/moveArticleModeratorToReject`, {params: {data}})
        .then(res => {
            setRefresh(!refresh)
        })
    }

    const approveArticle = (data) => {
        Axios.get(`http://localhost:3000/moveArticleModeratorToAnalyst`, {params: {data}})
        .then(res => {
            setRefresh(!refresh)
        })
    }

    useEffect(() => {    
        Axios.get(`http://localhost:3000/getModerationQueue`)
        .then(res => {
            setModeratorQueue(res.data.results)
        })
    }, [refresh]);

    return (
        <>
            ModeratorQueue Test
            {moderatorQueue.map((element) => {
                return <div>
                    {element._id}
                    <button onClick={() => rejectArticle(element)}>Reject Article</button>
                    <button onClick={() => approveArticle(element)}>Approve and move to Analyst Queue</button>
                </div>
            })}
        </>
    )
}