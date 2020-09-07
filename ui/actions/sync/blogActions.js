import * as actions from '../action-type';

export function loadBlogPage(blog) {
    return {
        type: actions.LOAD_BLOG_DETAILS,
        payload: blog
    }
}