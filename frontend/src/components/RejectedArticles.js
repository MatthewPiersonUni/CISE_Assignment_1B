import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function RejectArticles() {

    const [rejectedArticles, setRejectedArticles] = useState([]);

    useEffect(() => {    
        Axios.get(`/getRejectedArticles`)
        .then(res => {
            setRejectedArticles(res.data.results)
        })
    }, []);

    return (
        <>
            RejecetedArticles Test
            <table>
                <thead>
                    <tr>
                        <th>DOI</th>
                        <th>Rejecter Name</th>
                    </tr>
                </thead>
                <tbody>
                    {rejectedArticles.map((element) => {
                        return <tr>
                            <td>{element.doi}</td>
                            <td>{element.rejectName}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}