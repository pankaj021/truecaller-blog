import * as actions from '../actions/action-type';
const initialState = {
    items: [],
    nextPageUrl: null,
    topTags: []
};

export default function blogReducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOAD_RECENT_BLOGS_SUCCESS:
        case actions.LOAD_BLOG_BY_SLUG_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case actions.LOAD_MORE_BLOGS_SUCCESS:
            return {
                ...state,
                items: [...state.items, ...action.payload.items],
                topTags: action.payload.topTags,
                nextPageUrl: action.payload.nextPageUrl,
            }
        default:
            return state;
    }
}