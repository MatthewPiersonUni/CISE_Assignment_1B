export const AppReducer = (state, action) => {

    switch(action.type) {
        
        case 'INITIAL_DATA':
            const data = []
            action.payload.forEach((app) => {
                data.unshift(app);
            })

            return {
                article: data
            }
        
        case 'REMOVE_ARTICLE':
            return {
                articles: state.articles.filter(article => {
                    return (
                        article._id !== action.payload
                    )
                })
            }

        case 'ADD_ARTICLE':
            return{
                articles: [action.payload, ...state.articles]
            }

        case 'EDIT_ARTICLE':
            const updateArticle = action.payload;
            const updateArticles = state.articles.map(article => {

                if (article._id === updateArticle._id) {
                    return updateArticle;
                }

                return article
            })

            return {
                articles: updateArticles
            }
            
        default:
            return state
    }
}