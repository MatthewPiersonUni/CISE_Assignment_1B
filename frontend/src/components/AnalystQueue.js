import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import AnalystQueueStyle from "../styles/AnalystQueue.module.css"

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
            <h1>SERL Analyst Queue</h1>
            <table className={AnalystQueueStyle["tableContent"]}>
                <thead>
                    <tr>
                        <th className={AnalystQueueStyle.doi}>DOI</th>
                        <th className={AnalystQueueStyle.name}>Submitter Name</th>
                        <th className={AnalystQueueStyle.name}>Submitter Email</th>
                        <th className={AnalystQueueStyle.name}>Submission Date</th>
                        <th className={AnalystQueueStyle.name}>Moderator Name</th>
                        <th className={AnalystQueueStyle.name}>Moderator Email</th>
                        <th className={AnalystQueueStyle.name}>Reject</th>
                        <th className={AnalystQueueStyle.name}>Approve</th>
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
                            <td><button onClick={() => rejectArticle(element)}>Reject Article</button></td>
                            <td><button onClick={() => {setRefresh(!refresh);console.log("Add functionality here to approve and go to fill out page");}}>Approve and fill out (reword)</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}