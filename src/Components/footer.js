import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return(
      <Navbar style={{display:'block',textAlign:'center', marginTop:'10px'}} collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>&copy; Best Books</Navbar.Brand>
    </Navbar>
    )
  }
}

export default Footer;
