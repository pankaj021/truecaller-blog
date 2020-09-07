import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BlogHead from './BlogHead';
import { loadBlogPage } from '../../actions/sync/blogActions';

function BlogSummary(props) {
  const {excerpt, slug, id, index, loadBlogPage} = props;
  return (
    <div className="blog-summary">
      <BlogHead {...props}/>
      <div className='blog-desc' dangerouslySetInnerHTML={ { __html: excerpt } }></div>
      <Link to={ `/blog/${slug}` } className="continue-link" onClick={ () => loadBlogPage(props) }> Continue reading <span className="meta-nav">→</span> </Link>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loadBlogPage: (blog) => dispatch(loadBlogPage(blog))
})

export default connect(null, mapDispatchToProps)(BlogSummary);
