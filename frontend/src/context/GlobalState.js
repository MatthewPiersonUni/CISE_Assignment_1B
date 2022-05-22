import React , { createContext, useReducer, useEffect } from 'react';
import Axios from "axios";
import { AppReducer } from './AppReducer';

// initial State
const initialState = {
    articles: []
}

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = (({children}) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        Axios.get("http://localhost:3000/read").then((response) => {
            dispatch({type: 'INITIAL_DATA', payload: response.data})
        });
    }, []);

    // actions
    const removeArticle = (id) => {
        dispatch({
            type: 'REMOVE_ARTICLE',
            payload: id
        })
    }

    const addArticle = (article) => {
        dispatch({
            type: 'ADD_ARTICLE',
            payload: article
        })

        setTimeout(() => {
            Axios.get("http//localhost:3000/read").then((response) => {
                dispatch({type: 'INITIAL_DATA', payload: response.data})
            })
        }, 500);
    }

    const editArticle = (article) => {
        dispatch({
            type: 'EDIT_ARTICLE',
            payload: article
        })
    }

    return(
        <GlobalContext.Provider value={{
            books: state.books,
            removeArticle,
            addArticle,
            editArticle,
        }}>
            {children}
        </GlobalContext.Provider>
    )
});