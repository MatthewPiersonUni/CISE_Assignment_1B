import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function ModeratorQueue() {

    const [moderatorQueue, setModeratorQueue] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const rejectArticle = (data) => {
        data['rejectName'] ="Moderator Name"
        Axios.get(`/moveArticleModeratorToReject`, {params: {data}})
        .then(res => {
            setRefresh(!refresh)
        })
    }

    const approveArticle = (data) => {
        data['moderatorName'] ="Moderator Name"
        data['moderatorEmail'] ="moderator@email.com"
        Axios.get(`/moveArticleModeratorToAnalyst`, {params: {data}})
        .then(res => {
            setRefresh(!refresh)
        })
    }

    useEffect(() => {    
        Axios.get(`/getModerationQueue`)
        .then(res => {
            setModeratorQueue(res.data.results)
        })
    }, [refresh]);

    return (
        <>
            ModeratorQueue Test
            <table>
                <thead>
                    <tr>
                        <th>DOI</th>
                        <th>Submitter Name</th>
                        <th>Submitter Email</th>
                        <th>Submission Date</th>
                    </tr>
                </thead>
                <tbody>
                    {moderatorQueue.map((element) => {
                        return <tr>
                            <td>{element.doi}</td>
                            <td>{element.submitterName}</td>
                            <td>{element.submitterEmail}</td>
                            <td>{element.submitDate}</td>
                            <button onClick={() => rejectArticle(element)}>Reject Article</button>
                            <button onClick={() => approveArticle(element)}>Approve and move to Analyst Queue</button>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}