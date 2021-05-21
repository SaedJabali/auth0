import React from 'react';
import Header from './Header';
import MyFavoriteBooks from './MyFavoriteBooks';
import Profile from './Profile';
import IsLoadingAndError from './IsLoadingAndError';
import { withAuth0 } from "@auth0/auth0-react";
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';

class App extends React.Component {

  render() {
    console.log(this.props.auth0);
    const { isAuthenticated, user } = this.props.auth0;
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header isAuthenticated={isAuthenticated} />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
                {isAuthenticated ? <MyFavoriteBooks userInfo={user} /> : <Login />}
              </Route>
              <Route exact path="/profile">
                {isAuthenticated ? <Profile userInfo={user} /> : ''}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
