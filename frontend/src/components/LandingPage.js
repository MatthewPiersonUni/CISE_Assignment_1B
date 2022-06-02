import React  from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {

    const navigate = useNavigate();

    const navigateTo = (path) =>
        navigate({
            pathname: path
        });

  return (
    <>
        <h1>CISE Assignment1b</h1>
        <div style={{display: "flex", width: "100%", justifyContent: 'center', alignItems: 'center'}}>
            <button style={{width:"200px", height:"50px"}} onClick={() => navigateTo("/search")}>Search Articles</button>
            <button style={{width:"200px", height:"50px"}} onClick={() => navigateTo("/add")}>Add an Article</button>
        </div>
        <div style={{display: "flex", width: "100%", justifyContent: 'center', alignItems: 'center'}}>
            <button style={{width:"200px", height:"50px"}} onClick={() => navigateTo("/moderator")}>View Moderator Queue</button>
            <button style={{width:"200px", height:"50px"}} onClick={() => navigateTo("/analyst")}>View Analyst Queue</button>
            <button style={{width:"200px", height:"50px"}} onClick={() => navigateTo("/userSubmit")}>Submit an Article for Moderation</button>
        </div>
    </>
  )
}
