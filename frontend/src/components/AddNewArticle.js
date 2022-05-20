import React, { useReducer } from 'react'
import styled from 'styled-components';

export default function AddNewArticle() {

  // article Title
  const [articleTitle, dispatchBookTitle] = useReducer (
    (state, action) => {
      if (action.type === "ARTICLE_INPUT") {
        return {value: action.val, isValid: action.val.length > 5}
      }
    }
  )

  const onArticleTitleChange = function (e) {
    dispatchBookTitle({type: "ARTICLE_INPUT", val: e.target.value})
  }



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
        <ArticleFormField 
          label="Title"
          value={articleTitle}
          type="text"
          placeholder="enter article title"
          onChange={onArticleTitleChange}
          // className={`${articleTitle.isValid === false ?  'Invalid title name' : ``}`} 
        />
      </AddNewArticleStyle>
    </>
  )
}

const AddNewArticleStyle = styled.div`

  .form {
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
