import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList';
import { getUserFriendlyDate } from '../../utils/helper';
import { loadBlogPage } from '../../actions/sync/blogActions';

function BlogHead(props) {
  let {date, author, postThumbnail, categories, slug, title, loadBlogPage} = props;
  return (
    <div className="blog-head">
      { (postThumbnail && postThumbnail.URL) ? <Link className="post-thumbnail" to={ `/blog/${slug}` } onClick={ () => loadBlogPage(props) }>
                                               <img className="thumbnail-img" src={ (postThumbnail && postThumbnail.URL) || "" } alt={ title } loading="lazy" />
                                               </Link> : null }
      <CategoryList categories={ categories } />
      { title && <h1 className='blog-title'>{ title }</h1> }
      <div className='publish-detail'>
        <div className="blog-date">
          { getUserFriendlyDate(date) }
        </div>
        { author && author.name && <div className="blog-author">
                                     { `By ${author.name}` }
                                   </div> }
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loadBlogPage: (blog) => dispatch(loadBlogPage(blog))
})

export default connect(null, mapDispatchToProps)(BlogHead);