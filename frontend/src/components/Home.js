import {React, useEffect, useState }  from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import Axios from "axios";

export default function Home() {

  const [articleData, setArticleData] = useState([]);
  
  useEffect(() => {
    // Update the document title using the browser API
    articles();
  });

  // Getting Articles

const articles = function () {
  console.log("Function");
  Axios.get("https://cise-assignment2.herokuapp.com/getAllArticles")
      .then(response => {
                    setArticleData(response.data.results);
                    // console.log(articleData);
      })
  ;

}

  return (
    <>
      <HomeStyle>
        <header className="headerWrapper">
          <nav>
            <li>
              <Link className="linkWrapper" to="/add">
                <BiPlus />
                Add Article
              </Link>
            </li>
          </nav>
        </header>

        {/* ======================================================= */}

        <table className="tableWrapper">
          <thead>
            <tr>
              <th className="title">Title</th>
              <th className="author">Author</th>
              <th className="name">Article Name</th>
              <th className="yop">Year of Publication</th>
              <th className="volume">Volume</th>
              <th className="number">Number</th>
              <th className="pages">Pages</th>
              <th className="doi">DOI</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
               articleData.map(x => <tr><td> {x.title} </td>
                                    <td> {x.authors} </td>
                                    <td> {x.journalName} </td>
                                    <td> {x.publicationYear} </td>
                                    <td> {x.volume} </td>
                                    <td> {x.number} </td>
                                    <td> {x.practiceType} </td>
                                    <td> {x.doi} </td>
                                    <td> 
                                        <button style={{ color: "white", background: "green", border: "none" }}>Edit</button> 
                                        &nbsp;
                                        <button style={{ color: "white", background: "red", border: "none"  }}>DELETE</button> 
                                    </td>
                          </tr>)
            }
          </tbody>
        </table>
      </HomeStyle>
    </>
  )
}

const HomeStyle = styled.div`

  // Global style
  margin-top: 50px;
  margin-right: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // ===========> HEADER <=============== //

  .headerWrapper nav li {
    list-style: none;
  }

  .linkWrapper {
    margin-right: 43rem;
  }

  .headerWrapper nav li .linkWrapper {
    color: #FFF;
    text-decoration: none;
    padding: 8px 10px 8px 5px;
    border-radius: 5px;
    margin-bottom: 1px;
    background-color: teal;
  }

  .headerWrapper nav li .linkWrapper :first-child {
    margin-right: 5px;
    font-size: 16px;
  }

  // =====================> TABLE <============================= //

  .tableWrapper {
    margin-top: 20px;
    margin-left: 10rem;

    border-collapse: collapse;
    overflow: hidden;
    min-width: 500px;
    border-radius: 5px 5px 0 0;
  }
  
  
  .tableWrapper thead tr {
    background-color: black;
    color: #FFF;
    text-align: left;
    font-weight: bold;
  }

  .tableWrapper thead tr th {
    padding: 12px 25px;
  }


`
