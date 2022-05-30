import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function AnalystQueue() {

    const [analystQueue, setAnalystQueue] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const rejectArticle = (data) => {
        Axios.get(`/moveArticleAnalystToReject`, {params: {data}})
        .then(res => {
            setRefresh(!refresh)
        })
    }

    useEffect(() => {    
        Axios.get(`/getAnalystQueue`)
        .then(res => {
            setAnalystQueue(res.data.results)
        })
    }, [refresh]);

    return (
        <>
            AnalystQueue Test
            <table>
                <thead>
                    <tr>
                        <th>DOI</th>
                        <th>Submitter Name</th>
                        <th>Submitter Email</th>
                        <th>Submission Date</th>
                        <th>Moderator Name</th>
                        <th>Moderator Email</th>
                    </tr>
                </thead>
                <tbody>
                    {analystQueue.map((element) => {
                        return <tr>
                            <td>{element.doi}</td>
                            <td>{element.submitterName}</td>
                            <td>{element.submitterEmail}</td>
                            <td>{element.submitDate}</td>
                            <td>{element.moderatorName}</td>
                            <td>{element.moderatorEmail}</td>
                            <button onClick={() => rejectArticle(element)}>Reject Article</button>
                            <button onClick={() => {
                                setRefresh(!refresh)
                                console.log("Add functionality here to approve and go to fill out page")
                                }}>Approve and fill out (reword)</button>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}