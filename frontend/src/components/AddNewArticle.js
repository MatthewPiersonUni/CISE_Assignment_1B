import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Axios from "axios";

import React, { useReducer, useState, useEffect, useContext } from "react";
import { GlobalContext } from '../context/GlobalState';

import articleStyle from  '../styles/AddNewArticle.module.css';
import formStyle from '../styles/ArticleFormField.module.css';
import buttonStyle from '../styles/Button.module.css';
import { GiCancel } from "react-icons/gi";

export default function AddNewArticle() {

  // =====> VARIABLES DECLARATION <=====
  const { addArticle } = useContext(GlobalContext);
  const articleHistory = createBrowserHistory();
  const [isArticleValid, setIsArticleValid] = useState(false); /* Used in onSubmit function */

  // =====> ARTTILCE TITLE <=====
  const [articleTitle, dispatchArticleTitle] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_INPUT") {
        return { value: action.val, isValid: action.val.length > 3 }
      }

      return { value: "", isValid: false }
    },

    { value: "", isValid: null }
  )

  const onArticleTitleChange = function (e) {
    dispatchArticleTitle({type: "ARTICLE_INPUT", val: e.target.value})
  }

  // =====> ARTICLE AUTHOR <=====
  const [articleAuthor, dispatchArticleAuthor] = useReducer (
    (state, action) => {

      if (action.type === "ARTICLE_INPUT") {
        return {value: action.val, isValid: action.val.length > 3}
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
        return {value: action.val, isValid: action.val.length > 3}
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
        return {value: action.val, isValid: action.val.length > 3}
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
        return {value: action.val, isValid: action.val.length > 1}
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
        return { value: action.val, isValid: action.val.length > 1 }
      }

      return { value: "", isValid: false }
    },

    { value: "", isValid: null }
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

      return { value: "", isValid: false }
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

  // =====> ARTICLE ISVALID <===== 
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
        articleTitleIsValid &&
        artcleVolumeIsValid &&
        articleNameIsValid &&
        articleYearOfPublicationIsValid &&
        articleVolumeIsValid &&
        articleNumberIsValid &&
        articlePagesIsValid &&
        articleDOIIsValid !== false
      );
    }, 1000)

    return () => {
      clearTimeout(timer)
    };
  },  
    [articleTitleIsValid, artcleVolumeIsValid, articleNameIsValid, articleYearOfPublicationIsValid,
    articleVolumeIsValid, articleNumberIsValid, articlePagesIsValid, articleDOIIsValid]
  );

  // ===== ON SUBMIT  =====
  const onSubmit = function (e) {
    e.preventDefault()

    if (isArticleValid !== true) return 

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

    Axios.post("https://cise-assignment2.herokuapp.com/insert", { /* DON'T for get to implement insert method in the backend */
      articleTitle: articleTitle.value,
      articleAuthor: articleAuthor.value,
      articleName: articleName.value,
      articleYearOfPublication: articleYearOfPublication.value,
      articleVolume: articleVolume.value,
      articleNumber: articleNumber.value,
      articlePages: articlePages.value,
      articleDOI: articleDOI.value,
    });

    addArticle(newArticle);
    articleHistory.push("/");
  };

    // ===== ARTICLE FORM =====
    const ArticleFormField = (props) => {
      return (
        <>
          <div className={formStyle.form_control}>
            <label>{props.label}</label>
            <input 
              type={props.type}
              value={props.value}
              placeholder={props.placeholder}
              onChange={props.onChange}
              name={props.name}
              className={props.className}
            />
          </div>
        </>
      )
    };

    // =====> BUTTON <=====
    const Button = (props) => {
      return (
          <button type={props.type} className={`${buttonStyle.button} ${props.className}`} onClick={props.onClick} >
              {props.children}
          </button>
      )
  };
  
  return (
    <>

        <form onSubmit={onSubmit} className={`${articleStyle.form}`} >

          {/* TITLE */}
          <ArticleFormField 
            type="text"
            value={articleTitle.value}
            placeholder="Enter article title"
            onChange={onArticleTitleChange}
            label="Title"
            className={`${articleTitle.isValid === false ?  articleStyle.invalid : ``}`}
          />

          {/*  AUTHOR */}
          <ArticleFormField 
            type="text"
            value={articleAuthor.value}
            placeholder="Enter article Author"
            onChange={onArticleAuthorChange}
            label="Author"
            className={`${articleAuthor.isValid === false ?  articleStyle.invalid : ``}`} 
          />
          
          {/* NAME */}
          <ArticleFormField 
            type="text"
            value={articleName.value}
            placeholder="Enter article Name"
            onChange={onArticleNameChange}
            label="Name"
            className={`${articleName.isValid === false ?  articleStyle.invalid : ``}`} 
          />


          {/* YEAR of PUBLICATION */}
          <ArticleFormField 
            type="text"
            value={articleYearOfPublication.value}
            placeholder="Enter article Year of Publication"
            onChange={onArticleYearOfPublicationChange}
            label="Year of Publication"
            className={`${articleYearOfPublication.isValid === false ?  articleStyle.invalid : ``}`} 
          />


          {/* VOLUME */}
          <ArticleFormField 
            type="text"
            value={articleVolume.value}
            placeholder="Enter article Volume"
            onChange={onArticleVolumeChange}
            label="Volume"
            className={`${articleVolume.isValid === false ?  articleStyle.invalid : ``}`} 
          />

          {/* NUMBER */}
          <ArticleFormField 
            type="text"
            value={articleNumber.value}
            placeholder="Enter Article Number"
            onChange={onArticleNumbereChange}
            label="Number"
            className={`${articleNumber.isValid === false ?  articleStyle.invalid : ``}`} 
          />

          {/* PAGES */}
          <ArticleFormField 
            type="text"
            value={articlePages.value}
            placeholder="Enter article Pages"
            onChange={onArticlePagesChange}
            label="Pages"
            className={`${articlePages.isValid === false ?  articleStyle.invalid : ``}`} 
          />


          {/* DOI */}
          <ArticleFormField 
            type="text"
            value={articleDOI.value}
            placeholder="Enter article DOI"
            onChange={onArticleDOIChange}
            label="DOI"
            className={`${articleDOI.isValid === false ?  articleStyle.invalid : ``}`} 
          />

          <div className={articleStyle.buttons}>
            <Button type='submit' className={`${isArticleValid ? articleStyle.submit : articleStyle.disabled}`}>
              Submit
            </Button>
            
            <Link to="/" className={articleStyle.link}>
              <GiCancel /> Cancel
            </Link>
          </div>

        </form>
    </>
  )
}
