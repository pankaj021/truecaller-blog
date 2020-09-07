import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BlogHead from './BlogHead';
import RelatedBlogs from './RelatedBlogs';
import { loadPostBySlug } from '../../actions/async/blogActions';
import Error from '../error/Error';

function BlogPage({blog, loadPostBySlug}) {
    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0
        });
        if (!blog.id && !blog.slugMsg) {
            const slug = window.location.pathname.split('/blog/')[1];
            loadPostBySlug(slug)
        }
    }, []);

    if (blog.id) {
        return (
            <div className="blog-page">
              <BlogHead {...blog}/>
              <div className='blog-desc' dangerouslySetInnerHTML={ { __html: blog.content } }></div>
              <RelatedBlogs id={ blog.id } />
            </div>
        )
    }
    if (blog.slugMsg) {
        return <Error errMsg={ blog.slugMsg } />
    }
    return null;
}

const mapStateToProps = (state) => ({
    blog: state.currentBlog
})

const mapDispatchToProps = (dispatch) => ({
    loadPostBySlug: (slug) => dispatch(loadPostBySlug(slug))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
