import * as actions from '../action-type';
import axios from 'axios';

export function loadRecentPosts() {
    return async (dispatch) => {
        dispatch({
            type: actions.LOADING_DATA,
            payload: "Loading recent posts for you..."
        })
        try {
            const {data} = await axios.get('/blogs');
            dispatch({
                type: actions.LOAD_RECENT_BLOGS_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: actions.ERROR_OCCURRED,
                payload: "Something went wrong..."
            })
        }
    }
}
export function loadMorePosts(nextPage) {
    return async (dispatch) => {
        dispatch({
            type: actions.LOADING_DATA,
            payload: "Loading more posts for you..."
        })
        try {
            const {data} = await axios.get(`/blogs?page_handle=${encodeURIComponent(nextPage)}`);
            dispatch({
                type: actions.LOAD_MORE_BLOGS_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: actions.ERROR_OCCURRED,
                payload: "Something went wrong..."
            })
        }
    }
}
export function loadRelatedPosts(blogId) {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`/blogs/related/${blogId}`);
            dispatch({
                type: actions.LOAD_RELATED_BLOGS_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: actions.ERROR_OCCURRED,
                payload: "Something went wrong..."
            })
        }
    }
}
export function loadPostBySlug(slug) {
    return async (dispatch) => {
        dispatch({
            type: actions.LOADING_DATA,
            payload: "Loading post for you..."
        })
        try {
            const {data} = await axios.get(`/blogs/slug/${slug}`);
            if (!data || !data.items || !data.items[0]) {
                dispatch({
                    type: actions.BLOG_BY_SLUG_NOT_FOUND,
                    payload: "Post does not exist."
                })
            } else {
                dispatch({
                    type: actions.LOAD_BLOG_BY_SLUG_SUCCESS,
                    payload: data
                })
            }
        } catch (error) {
            dispatch({
                type: actions.ERROR_OCCURRED,
                payload: "Something went wrong..."
            })
        }
    }
}
export function loadPostsByTag(type, slug) {
    return async (dispatch) => {
        let tagType = "tag"
        if (type === 'C') {
            tagType = 'category';
        }
        dispatch({
            type: actions.LOADING_DATA,
            payload: `Loading ${slug} posts for you...`
        })
        try {
            const {data} = await axios.get(`/blogs?${tagType}=${slug}`);
            dispatch({
                type: actions.LOAD_RECENT_BLOGS_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: actions.ERROR_OCCURRED,
                payload: "Something went wrong..."
            })
        }
    }
}

