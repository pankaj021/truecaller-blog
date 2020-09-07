import React from 'react';
import './Error.css';

function Error({errMsg}) {
    return (
        <div className='error'>
          <h1>Oh snap...</h1>
          <h3>{ errMsg }</h3>
        </div>
    )
}

export default Error;