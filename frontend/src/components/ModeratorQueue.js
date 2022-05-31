import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import ModeratorQueueStyle from "../styles/ModeratorQueue.module.css"

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
            <h1>Moderator Queue</h1>
            <table className={ModeratorQueueStyle["tableContent"]}>
                <thead>
                    <tr>
                        <th className={ModeratorQueueStyle.doi}>DOI</th>
                        <th className={ModeratorQueueStyle.name}>Submitter Name</th>
                        <th className={ModeratorQueueStyle.name}>Submitter Email</th>
                        <th className={ModeratorQueueStyle.name}>Submission Date</th>
                        <th className={ModeratorQueueStyle.name}>Reject</th>
                        <th className={ModeratorQueueStyle.name}>Approve</th>
                    </tr>
                </thead>
                <tbody>
                    {moderatorQueue.map((element) => {
                        return <tr>
                            <td>{element.doi}</td>
                            <td>{element.submitterName}</td>
                            <td>{element.submitterEmail}</td>
                            <td>{element.submitDate}</td>
                            <td><button onClick={() => rejectArticle(element)}>Reject Article</button></td>
                            <td><button onClick={() => approveArticle(element)}>Approve and move to Analyst Queue</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}