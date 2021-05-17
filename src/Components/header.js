import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './header.css';
import LogoutButton from './Logout'
import { withAuth0 } from "@auth0/auth0-react"; 
import LoginButton from './loginwithauth'

class Header extends React.Component {

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <Navbar style={{display:'block',textAlign:'center', marginTop:'10px'}}  expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{marginLeft:'10px'}}>My Favorite Books</Navbar.Brand>
        <Link style={{marginLeft:'10px'}} to="/">Home</Link>
        <Link style={{marginLeft:'10px'}} to="/profile">Profile</Link>
        
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
      { (isAuthenticated) ?<LogoutButton /> : <LoginButton/>}
      </Navbar>
    )
  }
}

export default withAuth0(Header);
