import React, { useReducer, useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Axios from "axios";

export default function AddNewArticle() {

  // =====> VARIABLES DECLARATION <=====
  // const { addArticle } = useContext(); /* THIS NEEDS TO BE IMPLEMENTED before use */
  const articleHistory = createBrowserHistory();
  const [isArticleValid, setIsArticleValid] = useState(false); /* Used in onSubmit function */

  // ===== ARTTILCE AUTHOR =====
  const [articleTitle, dispatchArticleTitle] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_INPUT") {
        return {value: action.val, isValid: action.val.length > 5}
      }

      return {value: "", isValid: false}
    },

    {value: "", isValid: null}
  )

  const onArticleTitleChange = function (e) {
    dispatchArticleTitle({type: "ARTICLE_INPUT", val: e.target.value})
  }

  // =====> ARTICLE AUTHOR <=====
  const [articleAuthor, dispatchArticleAuthor] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_INPUT") {
        return {value: action.val, isValid: action.val.length > 5}
      }

      return {value: "", isValid: false}
    },

    {value: "", isValid: null}
  )

  const onArticleAuthorChange = function (e) {
    dispatchArticleAuthor({type: "ARTICLE_INPUT", val: e.target.value})
  }


  // =====> ARTICLE NAME <=====
  const [articleName, dispatchArticleName] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_INPUT") {
        return {value: action.val, isValid: action.val.length > 5}
      }

      return {value: "", isValid: false}
    },

    {value: "", isValid: null}
  )

  const onArticleNameChange = function (e) {
    dispatchArticleName({type: "ARTICLE_INPUT", val: e.target.value})
  }


  // =====> ARTICLE YEAR OF PUBLICATION  <=====
  const [articleYearOfPublication, dispatchArticleYearOfPublication] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_INPUT") {
        return {value: action.val, isValid: action.val.length > 5}
      }

      return {value: "", isValid: false}
    },

    {value: "", isValid: null}
  )

  const onArticleYearOfPublicationChange = function (e) {
    dispatchArticleYearOfPublication({type: "ARTICLE_INPUT", val: e.target.value})
  }


  // =====> ARTICLE NUMBER <=====
  const [articleVolume, dispatchArticleVolume] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_INPUT") {
        return {value: action.val, isValid: action.val.length > 5}
      }

      return {value: "", isValid: false}
    },

    {value: "", isValid: null}
  )

  const onArticleVolumeChange = function (e) {
    dispatchArticleVolume({type: "ARTICLE_INPUT", val: e.target.value})
  }

  // =====> ARTICLE NUMBER <=====
  const [articleNumber, dispatchArticleNumber] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_INPUT") {
        return {value: action.val, isValid: action.val.length > 5}
      }

      return {value: "", isValid: false}
    },

    {value: "", isValid: null}
  )

  const onArticleNumbereChange = function (e) {
    dispatchArticleNumber({type: "ARTICLE_INPUT", val: e.target.value})
  }

  // =====> ARTICPLE PAGES <===== 
  const [articlePages, dispatchArticlePages] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_INPUT") {
        return {value: action.val, isValid: action.val.length > 5}
      }

      return {value: "", isValid: false}
    },

    {value: "", isValid: null}
  )

  const onArticlePagesChange = function (e) {
    dispatchArticlePages({type: "ARTICLE_INPUT", val: e.target.value})
  }


  // =====> ARTICLE DOI <=====
  const [articleDOI, dispatchArticleDOI] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_INPUT") {
        return {value: action.val, isValid: action.val.length > 5}
      }

      return {value: "", isValid: false}
    },

    {value: "", isValid: null}
  )

  const onArticleDOIChange = function (e) {
    dispatchArticleDOI({type: "ARTICLE_INPUT", val: e.target.value})
  }

  // =====? ARTICLE ISVALID <===== 
  const { isValid: articleTitleIsValid } = articleTitle;
  const { isValid: artcleVolumeIsValid } = articleAuthor;
  const { isValid: articleNameIsValid } = articleName;
  const { isValid: articleYearOfPublicationIsValid } = articleYearOfPublication;
  const { isValid: articleVolumeIsValid } = articleVolume;
  const { isValid: articleNumberIsValid } = articleNumber;
  const { isValid: articlePagesIsValid } = articlePages;
  const { isValid: articleDOIIsValid } = articleDOI;

  // ===== USE EFFECT =====
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsArticleValid (
        articleTitleIsValid !== false
      );
    }, 1000)
    return () => {
      clearTimeout(timer)
    };
  },  [articleTitleIsValid, artcleVolumeIsValid, articleNameIsValid, articleYearOfPublicationIsValid,
    articleVolumeIsValid, articleNumberIsValid, articlePagesIsValid, articleDOIIsValid
  ]);

  // ===== ON SUBMIT  =====
  const onSubmit = function (e) {
    e.preventDefault()
    if (isArticleValid !== false) {

      const newArticle = {
        articleTitle: articleTitle.value,
        articleAuthor: articleAuthor.value,
        articleName: articleName.value,
        articleYearOfPublication: articleYearOfPublication.value,
        articleVolume: articleVolume.value,
        articleNumber: articleNumber.value,
        articlePages: articlePages.value,
        articleDOI: articleDOI.value,
      };

      Axios.post("http://localhost:3000/insert", { /* check the backened for insert method */
        articleTitle: articleTitle.value,
        articleAuthor: articleAuthor.value,
        articleName: articleName.value,
        articleYearOfPublication: articleYearOfPublication.value,
        articleVolume: articleVolume.value,
        articleNumber: articleNumber.value,
        articlePages: articlePages.value,
        articleDOI: articleDOI.value,
      });

        // addArticle(newArticle); /* NOT YET COMPLETED */
        articleHistory.push("/");
    }
  }

    // ===== ARTICLE FORM =====
    const ArticleFormField = (props) => {
      return (
        <>
          <div className="formControl">
            <label>{props.label}</label>
            <input 
              type={props.type}
              value={props.value}
              onChange={props.onChange}
              placeholder={props.placeholder}
              name={props.name}
              className={props.className}
            />
          </div>
        </>
      )
    }
  
  return (
    <>
      <AddNewArticleStyle>

        <form onSubmit={onSubmit}>

          {/* TITLE */}
          <ArticleFormField 
            label="Title"
            value={articleTitle}
            type="text"
            placeholder="enter article title"
            onChange={onArticleTitleChange}
            // className={`${articleTitle.isValid === false ?  'Invalid title name' : ``}`} 
          />

          {/*  AUTHOR */}
          <ArticleFormField 
            label="Author"
            value={articleAuthor}
            type="text"
            placeholder="enter article Author"
            onChange={onArticleAuthorChange}
            // className={`${articleTitle.isValid === false ?  'Invalid title name' : ``}`} 
          />
          
          {/* NAME */}
          <ArticleFormField 
            label="Name"
            value={articleName}
            type="text"
            placeholder="enter article Name"
            onChange={onArticleNameChange}
            // className={`${articleTitle.isValid === false ?  'Invalid title name' : ``}`} 
          />


          {/* YEAR of PUBLICATION */}
          <ArticleFormField 
            label="Year of Publication"
            value={articleYearOfPublication}
            type="text"
            placeholder="enter article Year of Publication"
            onChange={onArticleYearOfPublicationChange}
            // className={`${articleTitle.isValid === false ?  'Invalid title name' : ``}`} 
          />


          {/* VOLUME */}
          <ArticleFormField 
            label="Volume"
            value={articleVolume}
            type="text"
            placeholder="enter article Volume"
            onChange={onArticleVolumeChange}
            // className={`${articleTitle.isValid === false ?  'Invalid title name' : ``}`} 
          />


          {/* NUMBER */}
          <ArticleFormField 
            label="Number"
            value={articleNumber}
            type="text"
            placeholder="enter Article Number"
            onChange={onArticleNumbereChange}
            // className={`${articleTitle.isValid === false ?  'Invalid title name' : ``}`} 
          />


          {/* PAGES */}
          <ArticleFormField 
            label="Pages"
            value={articlePages}
            type="text"
            placeholder="enter article Pages"
            onChange={onArticlePagesChange}
            // className={`${articleTitle.isValid === false ?  'Invalid title name' : ``}`} 
          />


          {/* DOI */}
          <ArticleFormField 
            label="DOI"
            value={articleDOI}
            type="text"
            placeholder="enter article DOI"
            onChange={onArticleDOIChange}
            // className={`${articleTitle.isValid === false ?  'Invalid title name' : ``}`} 
          />

        </form>
      </AddNewArticleStyle>
    </>
  )
}


const AddNewArticleStyle = styled.div`

  form {
    width: 400px;
    margin: 0 auto;
    color: #525252;
  }

  .formControl {
    font-size: 16px;
    padding: 13px 10px;
    color: #525252;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .invalid {
    border: 1px solid red;
  }

`
