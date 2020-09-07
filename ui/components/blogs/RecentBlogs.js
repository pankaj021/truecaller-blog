import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import { loadRecentPosts, loadMorePosts } from '../../actions/async/blogActions';
import './Blogs.css';
import BlogSummary from './BlogSummary';

function RecentBlogs({blogs, nextPageUrl, loadRecentPosts, loadMorePosts}) {
    useEffect(() => {
        if (!blogs || !blogs.length) {
            loadRecentPosts();
        }
    }, []);

    return (
        <Fragment>
          { blogs.map((blog, index) => <BlogSummary key={ blog.id } index={ index } {...blog}/>) }
          { blogs.length >= 25 ? <div className='older-post' onClick={ () => loadMorePosts(nextPageUrl) }>Older Posts</div> : null }
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    blogs: state.blogs.items,
    nextPageUrl: state.blogs.nextPageUrl
});

const mapDispatchToProps = (dispatch) => ({
    loadRecentPosts: () => dispatch(loadRecentPosts()),
    loadMorePosts: (nextPageUrl) => dispatch(loadMorePosts(nextPageUrl))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentBlogs);


