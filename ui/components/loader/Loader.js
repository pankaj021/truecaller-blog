import React from 'react';
import './Loader.css';

function Loader({loadingMsg}) {
    return (
        <div className='loader'>
          <div className='loader-wheel'></div>
          <h3>{ loadingMsg }</h3>
        </div>
    )
}

export default Loader;