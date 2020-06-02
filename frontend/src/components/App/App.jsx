import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LandingPage from "../../pages/LandingPage/LandingPage"
import NoMatch from "../../pages/404/404"
import Layout from "../Layout/Layout"


function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;