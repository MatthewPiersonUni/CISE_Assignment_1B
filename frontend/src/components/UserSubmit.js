import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function UserSubmit() {

    const [submitData, setSubmitData] = useState([]);
    const [rejectedDOIs, setRejectedDOIs] = useState({});
    const [refresh, setRefresh] = useState(false);

    const sendToModerationQueue = (data) => {
        data = {
            collection: "moderationQueue",
            doi: data[2],
            submitterName: data[0],
            submitterEmail: data[1],
        }
        Axios.get(`/insert`, {params: {data}})
        .then(res => {
            alert("Successfully added DOI to the moderation queue! Feel free to submit another article for moderation!")
            setRefresh(!refresh)
            window.location.reload(false);
        })
    }

    const handleSubmit = (event) => {
        var fail = 0
        rejectedDOIs.forEach(element => {
            if (element.doi.localeCompare(submitData[2]) == 0) {
                fail = 1
            }
        });
        if (fail == 1) {
            alert("Error: DOI has already been rejected previously, please submit a different article!")
            setRefresh(!refresh)
            window.location.reload(false);
            return;
        }
        sendToModerationQueue(submitData)
        event.preventDefault();
    }

    const handleChange = (event, index) => {
        var tempArray = submitData
        tempArray[index] = event.target.value
        setSubmitData(tempArray)
    }

    useEffect(() => {    
        Axios.get(`/getRejectedArticles`)
        .then(res => {
            setRejectedDOIs(res.data.results)
        })
    }, [refresh]);

    return (
        <>
            UserSubmit Test
            <form onSubmit={handleSubmit}>
                <label for='submitterName'>Name</label>
                <input type='text' id='submitterName' name='submitterName' value={submitData[0]} onChange={(e) => {handleChange(e, 0)}}/>
                <br/>
                <label for='submitterEmail'>Email</label>
                <input type='email' id='submitterEmail' name='submitterEmail'  value={submitData[1]} onChange={(e) => {handleChange(e, 1)}}/>
                <br/>
                <label for='doi'>DOI</label>
                <input type='text' id='doi' name='doi' value={submitData[2]} onChange={(e) => {handleChange(e, 2)}}/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}