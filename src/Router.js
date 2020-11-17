import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from './App';
import DetailProject from './DetailProject';

const Router = props => {
  return(
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <App />
            </Route>
            <Route path="/:userName/:repoName">
                <DetailProject />
            </Route>
        </Switch>
    </BrowserRouter>
  )
}

export default Router;