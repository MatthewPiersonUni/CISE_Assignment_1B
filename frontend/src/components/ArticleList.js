import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

import Axios from "axios";
import ArticleListStyle from "../styles/ArticleLists.module.css"
import Button from "../styles/Button.module.css"

import { BsPencil } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md"

const ArticleList = () => {

    const { articles, removeArticle } = useContext(GlobalContext);

    const removeHandler = (id) => {
        removeArticle(id);

        Axios.delete(`http://localhost:3000/delete/${id}`);
    };

    return (
        <table className={ArticleListStyle["tableContent"]} >
            <thead>
                <tr>
                    <th className={ArticleListStyle.title}>Article Title</th>
                    <th className={ArticleListStyle.author}>Author</th>
                    <th className={ArticleListStyle.name}>Name</th>
                    <th className={ArticleListStyle.yop}>Year of Publication</th>
                    <th className={ArticleListStyle.volume}>Volume</th>
                    <th className={ArticleListStyle.number}>Number</th>
                    <th className={ArticleListStyle.pages}>Pages</th>
                    <th className={ArticleListStyle.doi}>DOI</th>
                    <th className={ArticleListStyle.doi}>Actions</th>
                </tr>
            </thead>
            {articles.length > 0 && (
                <tbody>
                    {articles.map((article) => {
                        return (
                            <tr key={article._id} >
                                <td>{article.articleTitle}</td>
                                <td>{article.articleAuthor}</td>
                                <td>{article.articleName}</td>
                                <td>{article.articleYop}</td>
                                <td>{article.articleVolume}</td>
                                <td>{article.articleNumber}</td>
                                <td>{article.articlePages}</td>
                                <td>{article.articleDOI}</td>
                                <td>
                                    <div className="Actions">
                                        <Link
                                            to = {`/edit/${article._id}`}
                                            id = {ArticleListStyle.link}
                                            className = { ArticleListStyle.link}
                                        >
                                            <BsPencil />
                                            Edit
                                        </Link>

                                        <Button
                                            onClick={() => 
                                                removeHandler(article._id)
                                            }

                                            className={ArticleListStyle.button}
                                        >
                                            <MdDeleteForever />
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            )}
        </table>
    )
}

export default ArticleList;

