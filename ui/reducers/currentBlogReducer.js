import * as actions from '../actions/action-type';
const initialState = {
    relatedBlogs: [],
    slugMsg: ""
};

export default function currentBlogReducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOAD_BLOG_DETAILS:
            return {
                ...state,
                ...action.payload,
                slugMsg: "Success",
                relatedBlogs: []
            }
        case actions.LOAD_BLOG_BY_SLUG_SUCCESS:
            return {
                ...state,
                ...action.payload.items[0],
                slugMsg: "Success",
                relatedBlogs: []
            }
        case actions.LOAD_RELATED_BLOGS_SUCCESS:
            return {
                ...state,
                slugMsg: "Success",
                relatedBlogs: action.payload
            }
        case actions.BLOG_BY_SLUG_NOT_FOUND:
            return {
                slugMsg: action.payload,
                relatedBlogs: []
            }
        default:
            return state;
    }
}