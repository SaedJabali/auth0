import React from 'react';
import Header from './Components/header';
import IsLoadingAndError from './Components/IsLoadingAndError';
import Footer from './Components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/login'
import { withAuth0 } from "@auth0/auth0-react";
import User from './Components/User'
// import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MyFavoriteBooks from './Components/myFavoriteBooks';
import BestBooks from './Components/BestBooks';

class App extends React.Component {
  render() {
    const { isAuthenticated, user } = this.props.auth0;
    console.log('app', this.props)
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}

                {(isAuthenticated) ?
                  <>
                    <MyFavoriteBooks user={user}

                    />
                    <BestBooks />
                  </>
                  : <Login />}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route
                exact path='/profile'
              >
                <User />
              </Route>

              {/* <Route exact path='/profile' component={User} /> */}

            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
