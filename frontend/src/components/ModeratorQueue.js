import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import ModeratorQueueStyle from "../styles/ModeratorQueue.module.css"

export default function ModeratorQueue() {

    const [moderatorQueue, setModeratorQueue] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const navigateTo = (path) =>
        navigate({
            pathname: path
        });
    
    const rejectArticle = (data) => {
        data['rejectName'] = "Moderator Name"
        Axios.get(`/moveArticleModeratorToReject`, {params: {data}})
        .then(res => {
            setRefresh(!refresh)
        })
    }

    const approveArticle = (data) => {
        data['moderatorName'] = "Moderator Name"
        data['moderatorEmail'] = "moderator@email.com"
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
            <button style={{width:"200px", height:"50px"}} onClick={() => navigateTo("/")}>Home</button>
            <button style={{width:"200px", height:"50px"}} onClick={() => navigateTo("/userSubmit")}>Submit Article for Moderation</button>
            <button style={{width:"200px", height:"50px"}} onClick={() => navigateTo("/analyst")}>Analyst Queue</button>
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