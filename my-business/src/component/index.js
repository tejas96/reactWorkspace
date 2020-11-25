import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './landigPage/Home';
import ErrorPage from '../common/ErrorPage';
import About from '../common/About';

const MyBusinessAppView = (props) => {

    return (
       <Switch>

           <Route
                exact
                path="/"
                component={HomePage}
           />
           <Route
                exact
                path="/about"
                component={About}
           />
           <Route
                component={ErrorPage}
            />
       </Switch>
    )
}

export default MyBusinessAppView;