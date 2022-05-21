import React from 'react'
import Axios from 'axios';

export default function ModeratorQueue() {

    Axios.get(`http://localhost:3000/getModerationQueue`)
    .then(res => {
        console.log(res.data.results)
    })

    return (
        <>
            ModeratorQueue Test
        </>
  )
}