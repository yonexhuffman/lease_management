import React, {Fragment} from 'react';

// Import routing components
import {Route, Switch, Redirect} from 'react-router-dom';

// Import custom components
// import MainLayout from '../components/common/layout/MainLayout';
import NotFound from '../components/error/NotFound';
import AuthContainer from '../containers/auth/AuthContainer';
// import Dashboard from '../containers/dashboard/DashboardContainer';
// import Authentication from './Authentication';

const Router = () => (
    <Fragment>
        <Switch>
            <Route path="/user" component={AuthContainer} />
            <Route path="/error" exact component={NotFound} />
            <Redirect to="/error" />
        </Switch>
    </Fragment>
);

export default Router;
