import React, {useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { BsPencil } from 'react-icons/bs'
import { GiCancel } from 'react-icons/gi'
import ButtonStyles from '../styles/Button.module.css'
import ArticleEditStyle from '../styles/ArticleEdit.module.css';
import formStyle from '../styles/ArticleFormField.module.css'


const EditArticle = (props) =>  {

  const [selectedArticle, setSelectedArticle] = useState({
    articleTitle: '',
    articleAuthor: '',
    articleName: '',
    articleYearOfPublication: '',
    articleVolume: '',
    articleNumber: '',
    articlePages: '',
    articleDOI: '',
  });

  const [articles, editArticle] = useContext(GlobalContext);
  const history = createBrowserHistory();
  const theArticleID = props.match.params.id;

  // ====> USE EFFECT <====
  useEffect(() => {
    const articleID = theArticleID;
    const selectedArticle = articles.find(article => article._id === articleID)
    setSelectedArticle(selectedArticle);
  }, [theArticleID, articles])

  // ====> UPDATE ARTICLE FUNCTION <=====
  const updateArticle = function (id) {
    const {articleTitle, articleAuthor, articleName, articleYearOfPublication, articleVolume,
              articleNumber, articlePages, articleDOI } = selectedArticle
    
    Axios.put("https://cise-assignment2.herokuapp.com/update", {
      id: id,
      articleTitle: articleTitle,
      articleAuthor: articleAuthor,
      articleName: articleName,
      articleYearOfPublication: articleYearOfPublication,
      articleVolume: articleVolume,
      articleNumber: articleNumber,
      articlePages: articlePages,
      articleDOI: articleDOI
    });
  }; // close updateArticle

  // ====> ON SUBMIT <======
  const onSubmit = function(e) {
    editArticle(selectedArticle)
    history.push('/')
    updateArticle(theArticleID)
  } // close onSubmit

  // ====> ON CHANGE <=====
  const onArticleTitleChange = function (e) {
    setSelectedArticle({...selectedArticle, [e.target.name]: e.target.value})
  }

  const onArticleAuthorChange = function (e) {
    setSelectedArticle({...selectedArticle, [e.target.name]: e.target.value})
  }

  const onArticleNameChange = function (e) {
    setSelectedArticle({...selectedArticle, [e.target.name]: e.target.value})
  }

  const onArticleYearOfPublicationChange = function (e) {
    setSelectedArticle({...selectedArticle, [e.target.name]: e.target.value})
  }

  const onArticleVolumeChange = function (e) {
    setSelectedArticle({...selectedArticle, [e.target.name]: e.target.value})
  }

  const onArticleNumbereChange = function (e) {
    setSelectedArticle({...selectedArticle, [e.target.name]: e.target.value})
  }

  const onArticlePagesChange = function (e) {
    setSelectedArticle({...selectedArticle, [e.target.name]: e.target.value})
  }

  const onArticleDOIChange = function (e) {
    setSelectedArticle({...selectedArticle, [e.target.name]: e.target.value})
  }

  // =====> FORM FIELD <====
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

  // =====> Submit Button <=====
  const Button = (props) => {
    return (
      <button
        type={props.type}
        className={`${ButtonStyles.button} ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    )
  }
  
  return (
    <>
      <form  onSubmit={onSubmit}  className={ArticleEditStyle.form}>

          {/* TITLE */}
          <ArticleFormField
                label="Article Title"
                name="articleTitle"
                value={selectedArticle.articleTitle}
                type="text"
                placeholder="Enter article title"
                onChange={onArticleTitleChange}
          />

           {/* AUTHOR */}
           <ArticleFormField
                label="Article Author"
                name="articleAuthor"
                value={selectedArticle.articleAuthor}
                type="text"
                placeholder="Enter article author"
                onChange={onArticleAuthorChange}
          />

           {/* NAME */}
           <ArticleFormField
                label="Article Name"
                name="articleName"
                value={selectedArticle.articleName}
                type="text"
                placeholder="Enter article name"
                onChange={onArticleNameChange}
          />

           {/* YEAR OF PUBLICATION */}
           <ArticleFormField
                label="Author Year of Publication"
                name="articleYOP"
                value={selectedArticle.articleYearOfPublication}
                type="text"
                placeholder="Enter article Year of Publication"
                onChange={onArticleYearOfPublicationChange}
          />

           {/* VOLUME */}
           <ArticleFormField
                label="Article Volume"
                name="articleVolume"
                value={selectedArticle.articleVolume}
                type="text"
                placeholder="Enter article volume"
                onChange={onArticleVolumeChange}
          />

           {/* NUMBER */}
           <ArticleFormField
                label="Article Number"
                name="articleNumber"
                value={selectedArticle.articleNumber}
                type="text"
                placeholder="Enter article number"
                onChange={onArticleNumbereChange}
          />

           {/* PAGES */}
           <ArticleFormField
                label="Article Pages"
                name="articlePages"
                value={selectedArticle.articlePages}
                type="text"
                placeholder="Enter article pages"
                onChange={onArticlePagesChange}
          />

           {/* DOI */}
           <ArticleFormField
                label="Article DOI"
                name="articleDOI"
                value={selectedArticle.articleDOI}
                type="text"
                placeholder="Enter article DOI"
                onChange={onArticleDOIChange}
          />

          <div className={ArticleEditStyle.buttons} >
            <Button
              type="submit"
              className={ArticleEditStyle.edit_Article}>
              <BsPencil/>Done
              
            </Button>

            <Link
              to="/"
              className={ArticleEditStyle.link}
            >
              <GiCancel/> Cancel
            </Link>
          </div>
      </form>
    </>
  )
};

export default EditArticle;