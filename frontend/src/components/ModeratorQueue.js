import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function ModeratorQueue() {

    const [moderatorQueue, setModeratorQueue] = useState([]);

    useEffect(() => {    
        Axios.get(`http://localhost:3000/getModerationQueue`)
        .then(res => {
            setModeratorQueue(res.data.results)
        })
    }, []);

    return (
        <>
            ModeratorQueue Test
            {moderatorQueue.map((element) => {
                return <div>
                    {element.doi}
                </div>
            })}
        </>
    )
}