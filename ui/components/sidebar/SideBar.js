import React from 'react';
import { connect } from 'react-redux';
import './SideBar.css';
import { CategoryHoc } from '../blogs/CategoryList';

function SidebarItem({title, items}) {
    let type = 'T';
    if (title === 'Categories') {
        type = 'C';
    }
    return (
        <div className='sidebar-items'>
          <h2 className='sidebar-items-title'>{ title }</h2>
          { items.map(item => <CategoryHoc key={ item.id } {...item} type={ type } />) }
        </div>
    )
}

function SideBar({tags, categories}) {
    if (tags.length || categories.length) {
        return (
            <div className='sidebar'>
              { categories.length ? <SidebarItem title="Categories" items={ categories } /> : null }
              { tags.length ? <SidebarItem title="Top Tags" items={ tags } /> : null }
            </div>
        )
    }
    return null;
}

const mapStateToProps = (state) => ({
    tags: state.blogs.topTags,
    categories: state.categories
});

export default connect(mapStateToProps, null)(SideBar);
