import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      status: '',
      photo: '',
    };
  }

  handleOnchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addBook = async (e) => {
    // e.preventDefault();
    const { user } = this.props.auth0;
    // TODO: send the request to the backend
    const bodyData = {
      name: user.name,
      description: user.description,
      status: user.status,
      email: user.email
    };
    const newBook = await axios.post(`http://localhost:3001/books`, bodyData);

    // TODO: get the new data and update it in the state
    this.setState({
      books: newBook.data
    });
    console.log('hiahxfoispydghfoinsdhgvj[pfis', this.state.books);
  }
  handleSubmit = (e) => {
    const { user } = this.props.auth0;
    e.preventDefault();
    const book = {
      email: user.email,
      books: [
        {
          name: user.name,
          description: user.description,
          status: user.status,
          // photo: this.state.photo
        }
      ]
    }
    this.addBook(book);
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="formBasicText">
            <Form.Label>Book Adding</Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control value={this.state.name} name="name" onChange={this.handleOnchange} type="text" placeholder="Enter book name" />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>Description</Form.Label>
            <Form.Control value={this.state.description} name="description" onChange={this.handleOnchange} type="text" placeholder="Enter book description" />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>Status</Form.Label>
            <Form.Control value={this.state.status} name="status" onChange={this.handleOnchange} type="text" placeholder="Enter read status" />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>Book Cover Photo's URL</Form.Label>
            <Form.Control value={this.state.photo} name="photo" onChange={this.handleOnchange} type="text" placeholder="Enter Book Cover Photo's URL" />
          </Form.Group>
        </Form>
        {/* <Button variant="secondary" onClick={this.props.handleClose} >Close</Button> */}
        <Button variant="primary" onClick={(e) => this.handleSubmit(e)} >Add Book</Button>
      </Container>
    );
  }
}

export default withAuth0(BookFormModal);