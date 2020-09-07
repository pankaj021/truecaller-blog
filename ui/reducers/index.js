import { combineReducers } from 'redux';
import blogReducer from '../reducers/blogReducer';
import errorReducer from '../reducers/errorReducer';
import loaderReducer from '../reducers/loaderReducer';
import currentBlogReducer from '../reducers/currentBlogReducer';
import categoryReducer from '../reducers/categoryReducer';

const rootReducer = combineReducers({
    blogs: blogReducer,
    error: errorReducer,
    loader: loaderReducer,
    currentBlog: currentBlogReducer,
    categories: categoryReducer
});

export default rootReducer;
