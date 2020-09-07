import * as actions from '../actions/action-type';
const initialState = []

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOAD_BLOG_DETAILS:
        case actions.LOAD_BLOG_BY_SLUG_SUCCESS:
            const item = action.payload.items ? action.payload.items[0] : action.payload;
            return Object.values(item.categories).map(category => ({
                id: category.ID,
                slug: category.slug,
                name: category.name
            }));
        case actions.LOAD_RECENT_BLOGS_SUCCESS:
        case actions.LOAD_MORE_BLOGS_SUCCESS:
            return initialState;
        default:
            return state;
    }
}