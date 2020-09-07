import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPostsByTag } from '../../actions/async/blogActions'

function Category({id, slug, name, type, loadPostsByTag}) {
    return (
        <Fragment>
          <Link className='c-item' onClick={ () => loadPostsByTag(type, slug) } to='/'>
          { name }
          </Link>
        </Fragment>
    )
}
const mapDispatchToProps = (dispatch) => ({
    loadPostsByTag: (type, slug) => dispatch(loadPostsByTag(type, slug))
})
export const CategoryHoc = connect(null, mapDispatchToProps)(Category);

export default function CategoryList({categories}) {
    let cValues = Object.values(categories || {}).map(category => ({
        id: category.ID,
        slug: category.slug,
        name: category.name,
        type: "C"
    })) || [];
    return (
        <div className='c-list'>
          { cValues.map((category, i) => <CategoryHoc key={ i } { ...category } />) }
        </div>
    )
}
