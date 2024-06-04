import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import HomePage from './pages/HomePage';

const HomeFeature = props => {
    let match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route to={match.url} exact component={HomePage} />
            </Switch>
        </>
    )
}

HomeFeature.propTypes = {

}

export default HomeFeature
