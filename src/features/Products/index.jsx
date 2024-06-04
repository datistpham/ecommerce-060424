import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";

const ProductFeature = (props) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={match.url} exact component={ListPage} />
            <Route path={`${match.url}/:productId`} component={DetailPage} />
        </Switch>
    );
};

ProductFeature.propTypes = {};

export default ProductFeature;
