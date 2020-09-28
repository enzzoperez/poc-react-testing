import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Post from "./Post";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/post/:postId" component={Post} />
      </Switch>
    </Router>
  );
}
