import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';

export default function Home() {
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
