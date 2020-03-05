import React, { Fragment } from 'react'
import spinner from './snipper.gif';
const Spinner = () =>
        <Fragment>
            <img src={spinner} alt="Loading..."
                style={{width:'400px',margin:'auto',display:'block'}} ></img>
        </Fragment>



export default Spinner
