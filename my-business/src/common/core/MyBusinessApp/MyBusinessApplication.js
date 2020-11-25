import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyBusinessAppView from '../../../component/';

const MyBusinessApplication = (props) =>{
    return (
        <Router>
           <MyBusinessAppView {...props}/>
        </Router>
    )
}

export default MyBusinessApplication;