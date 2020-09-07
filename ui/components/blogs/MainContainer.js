import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RecentBlogs from './RecentBlogs';
import BlogPage from './BlogPage';
import SideBar from '../sidebar/SideBar';

export default function MainContainer() {
  return (
    <Fragment>
      <Router>
        <div className='content'>
          <div className='main'>
            <Switch>
              <Route exact path='/' component={ RecentBlogs } />
              <Route path='/blog/:blogName' component={ BlogPage } />
              <Route path='/category/:categoryName' component={ RecentBlogs } />
              <Route path='/tag/:tagName' component={ RecentBlogs } />
              <Redirect to="/" />
            </Switch>
          </div>
          <SideBar/>
        </div>
      </Router>
    </Fragment>
  )
}