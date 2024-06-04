import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import HomeFeature from './features/Home';
import ProductFeature from './features/Products/pages/ListPage';
function App() {
  return (
    <>
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />

        <Route path="/" component={HomeFeature} exact />
        <Route path="/products" component={ProductFeature} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
