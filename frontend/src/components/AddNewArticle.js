import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Axios from "axios";

import React, { useReducer, useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();

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
        return {value: action.val, isValid: action.val.length > 0}
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

  // =====> ARTICLE SUMMARY <=====
  const [articleSummary, dispatchArticleSummary] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_SUMMARY") {
        return {value: action.val, isValid: action.val.length > 0}
      }

      return {value: "", isValid: false}
    },

    {value: "", isValid: null}
  )

  const onArticleSummaryChange = function (e) {
    dispatchArticleSummary({type: "ARTICLE_SUMMARY", val: e.target.value})
  }

  // =====> ARTICLE SOFTWARE ENGINEERING PRACTICE TYPE <=====
  const [articleSEType, dispatchArticleSEType] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_SETYPE") {
        return {value: action.val, isValid: action.val.length > 0}
      }

      return {value: "", isValid: false}
    },

    {value: "", isValid: null}
  )

  const onArticleSETypeChange = function (e) {
    dispatchArticleSEType({type: "ARTICLE_SETYPE", val: e.target.value})
  }

  // =====> ARTICLE ISVALID <===== 
  const { isValid: articleTitleIsValid } = articleTitle;
  const { isValid: artcleVolumeIsValid } = articleAuthor;
  const { isValid: articleNameIsValid } = articleName;
  const { isValid: articleYearOfPublicationIsValid } = articleYearOfPublication;
  const { isValid: articleVolumeIsValid } = articleVolume;
  const { isValid: articleNumberIsValid } = articleNumber;
  const { isValid: articlePagesIsValid } = articlePages;
  const { isValid: articleSummaryIsValid } = articleSummary;
  const { isValid: articleSETypeIsValid } = articleSEType;
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
        articleSummaryIsValid &&
        articleSETypeIsValid &&
        articleDOIIsValid !== false
      );
    }, 1000)

    return () => {
      clearTimeout(timer)
    };
  },  
    [articleTitleIsValid, artcleVolumeIsValid, articleNameIsValid, articleYearOfPublicationIsValid,
    articleVolumeIsValid, articleNumberIsValid, articlePagesIsValid, articleDOIIsValid, articleSummaryIsValid, articleSETypeIsValid]
  );

  // ===== ON SUBMIT  =====
  const onSubmit = () => {

    if (isArticleValid !== true) return 

    const newArticle = {
      articleTitle: articleTitle.value,
      articleAuthor: articleAuthor.value,
      articleName: articleName.value,
      articleYearOfPublication: articleYearOfPublication.value,
      articleVolume: articleVolume.value,
      articleNumber: articleNumber.value,
      articlePages: articlePages.value,
      articleSummary: articleSummary.value,
      articleSEType: articleSEType.value,
      articleDOI: searchParams.get("DOI") !== undefined ? searchParams.get("DOI") : articleDOI.value,
    };

    var data = { 
      title: articleTitle.value,
      authors: articleAuthor.value,
      journalName: articleName.value,
      publicationYear: articleYearOfPublication.value,
      volume: articleVolume.value,
      number: articleNumber.value,
      pages: articlePages.value,
      summary: articleSummary.value,
      practiceType: articleSEType.value,
      doi: searchParams.get("DOI") !== undefined ? searchParams.get("DOI") : articleDOI.value,
      collection: "SPEED",
    }

    Axios.get("/insert", {params : {data}});

    addArticle(newArticle);
    articleHistory.push("/");
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
          <div className={formStyle.form_control}>
            <label>Title</label>
            <input 
              type="text"
              value={articleTitle.value}
              placeholder="Enter article title"
              onChange={onArticleTitleChange}
              className={`${articleTitle.isValid === false ?  articleStyle.invalid : ``}`}
            />
          </div>

          {/*  AUTHOR */}
          <div className={formStyle.form_control}>
            <label>Author</label>
            <input 
              type="text"
              value={articleAuthor.value}
              placeholder="Enter article Author"
              onChange={onArticleAuthorChange}
              className={`${articleAuthor.isValid === false ?  articleStyle.invalid : ``}`} 
            />
          </div>
          
          {/* NAME */}
          <div className={formStyle.form_control}>
            <label>Name</label>
            <input 
              type="text"
              value={articleName.value}
              placeholder="Enter article Name"
              onChange={onArticleNameChange}
              label="Name"
              className={`${articleName.isValid === false ?  articleStyle.invalid : ``}`}  
            />
          </div>

          {/* YEAR of PUBLICATION */}
          <div className={formStyle.form_control}>
            <label>Year of Publication</label>
            <input 
              type="text"
              value={articleYearOfPublication.value}
              placeholder="Enter article Year of Publication"
              onChange={onArticleYearOfPublicationChange}
              className={`${articleYearOfPublication.isValid === false ?  articleStyle.invalid : ``}`}   
            />
          </div>

          {/* VOLUME */}
          <div className={formStyle.form_control}>
            <label>Volume</label>
            <input 
              type="text"
              value={articleVolume.value}
              placeholder="Enter article Volume"
              onChange={onArticleVolumeChange}
              className={`${articleVolume.isValid === false ?  articleStyle.invalid : ``}`}    
            />
          </div>

          {/* NUMBER */}
          <div className={formStyle.form_control}>
            <label>Number</label>
            <input 
              type="text"
              value={articleNumber.value}
              placeholder="Enter Article Number"
              onChange={onArticleNumbereChange}
              className={`${articleNumber.isValid === false ?  articleStyle.invalid : ``}`}    
            />
          </div>

          {/* PAGES */}
          <div className={formStyle.form_control}>
            <label>Pages</label>
            <input 
              type="text"
              value={articlePages.value}
              placeholder="Enter article Pages"
              onChange={onArticlePagesChange}
              className={`${articlePages.isValid === false ?  articleStyle.invalid : ``}`}     
            />
          </div>

          {/* SUMMARY */}
          <div className={formStyle.form_control}>
            <label>Summary</label>
            <input 
              type="text"
              value={articleSummary.value}
              placeholder="Enter article Summary"
              onChange={onArticleSummaryChange}
              className={`${articleSummary.isValid === false ?  articleStyle.invalid : ``}`}      
            />
          </div>

          {/* SETYPE */}
          <div className={formStyle.form_control}>
            <label>Software Engineering Practice Type</label>
            <input 
              type="text"
              value={articleSEType.value}
              placeholder="Enter article Software Engineering Practice Type"
              onChange={onArticleSETypeChange}
              label="Software Engineering Practice Type"
              className={`${articleSEType.isValid === false ?  articleStyle.invalid : ``}`}      
            />
          </div>

          {/* DOI */}
          <div className={formStyle.form_control}>
            <label>DOI</label>
            <input 
              type="text"
              value={searchParams.get("DOI") !== undefined ? searchParams.get("DOI") : articleDOI.value}
              placeholder="Enter article DOI"
              onChange={onArticleDOIChange}
              className={`${articleDOI.isValid === false ?  articleStyle.invalid : ``}`}
              readOnly={searchParams.get("DOI") !== undefined ? true : false}      
            />
          </div>

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
