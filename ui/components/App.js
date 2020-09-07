import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Layout from './layout/Layout';
import MainContainer from './blogs/MainContainer';
import SideBar from './sidebar/SideBar';
import Loader from './loader/Loader';
import Error from './error/Error';

const Content = ({error, loader}) => {
  if (loader.isLoading) return <Loader loadingMsg={ loader.loadingMsg } />
  if (error.isError) return <Error errMsg={ error.errMsg } />
  return (
    <MainContainer/>
  )
}
const mapStateToProps = (state) => ({
  error: state.error,
  loader: state.loader
});

const ContentHoc = connect(mapStateToProps, null)(Content);

const App = () => {
  return (
    <Fragment>
      <Layout/>
      <ContentHoc/>
    </Fragment>
  )
}



export default App;