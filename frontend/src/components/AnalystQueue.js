import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import AnalystQueueStyle from "../styles/AnalystQueue.module.css"

export default function AnalystQueue() {

    const [analystQueue, setAnalystQueue] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const navigateToAddArticle = (DOI) =>
    navigate({
      pathname: '/add',
      search: '?DOI=' + DOI,
    });

    const rejectArticle = (data) => {
        Axios.get(`/moveArticleAnalystToReject`, {params: {data}})
        .then(res => {
            setRefresh(!refresh)
        })
    }

    const approveArticle = (data) => {
        data['collection'] = "analysisQueue"
        Axios.get(`/removeArticle`, {params: {data}})
        .then(res => {
            navigateToAddArticle(data['doi'])
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
                        <th className={AnalystQueueStyle.name}>Reject Article</th>
                        <th className={AnalystQueueStyle.name}>Approve Article</th>
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
                            <td><button onClick={() => approveArticle(element)}>Fill in Article Information</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}