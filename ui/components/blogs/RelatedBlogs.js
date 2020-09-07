import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadRelatedPosts, loadPostBySlug } from '../../actions/async/blogActions';
import './Blogs.css';
import { getUserFriendlyDate } from '../../utils/helper';

function RelatedBlog(props) {
    let {postThumbnail, title, date, author, slug} = props.blog;
    return (
        <Link className='related-blog' to={ `/blog/${slug}` } onClick={ () => props.loadPostBySlug(slug) }>
        { (postThumbnail && postThumbnail.URL) ? <img className="thumbnail-img" src={ (postThumbnail && postThumbnail.URL) || "" } alt={ title } loading="lazy" /> : null }
        { title && <h6 className='blog-title'>{ title }</h6> }
        <div className='publish-detail'>
          <div className="blog-date">
            { getUserFriendlyDate(date) }
          </div>
          { author && author.name && <div className="blog-author">
                                       { `By ${author.name}` }
                                     </div> }
        </div>
        </Link>
    )
}

const mapDispatch = (dispatch) => ({
    loadPostBySlug: (slug) => dispatch(loadPostBySlug(slug))
})

const RelatedBlogHoc = connect(null, mapDispatch)(RelatedBlog);

function RelatedBlogs({id, relatedBlogs, loadRelatedPosts}) {
    useEffect(() => {
        if (!relatedBlogs || !relatedBlogs.length) loadRelatedPosts(id);
    }, []);

    if (!relatedBlogs || !relatedBlogs.length) return null;
    return (
        <div className='related-blogs'>
          <h3>Related Links -</h3>
          { relatedBlogs.map(blog => <RelatedBlogHoc key={ blog.id } blog={ blog } />) }
        </div>
    )
}

const mapStateToProps = (state) => ({
    relatedBlogs: state.currentBlog.relatedBlogs || []
})

const mapDispatchToProps = (dispatch) => ({
    loadRelatedPosts: (id) => dispatch(loadRelatedPosts(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RelatedBlogs);