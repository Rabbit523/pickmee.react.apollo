import "antd/dist/antd.css";
import React, { Component } from "react";
import PrivateRoute from 'utilities/privateRoute'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './pages/home';
import Login from './pages/login';
import Signup from "./pages/signup";
import Logout from 'utilities/logout';

const AppRoutes = ({ loggedIn }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/signup/:email" component={Signup} />
    <Route exact path="/signup/:email/:verifyCode" component={Signup} />
    
    <Route
      exact
      path="/logout"
      component={() => (
        <Logout />
      )}
    />

    <PrivateRoute
      path="/test/private"
      loggedIn={loggedIn}
      component={() => (
        <Login
        />
      )}
    />
  </Switch>
);

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      load: false,
      loggedIn: true
    }
  }


  render() {
    const { loggedIn } = this.state;
    return (
      <Router>
          <AppRoutes loggedIn={loggedIn} />
      </Router>
    );
  }
}

export default App;
