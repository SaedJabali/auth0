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
      // photo: '',
      books: [],
    };
  }
  updateName = (e) => this.setState({ name: e.target.value });
  updateDescription = (e) => this.setState({ description: e.target.value });
  updateStatus = (e) => this.setState({ status: e.target.value });

  addBook = async (e) => {
    e.preventDefault();
    const newBook = await axios.post(`http://localhost:3001/books`, {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      email: this.props.auth0.user.email
    });

    // TODO: get the new data and update it in the state
    this.setState({
      books: newBook.data
    });
    console.log('hiahxfoispydghfoinsdhgvj[pfis', this.state.books);
    console.log('new boooooooooks', newBook);

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
            <Form.Control value={this.state.name} name="name" onChange={this.updateName} type="text" placeholder="Enter book name" />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>Description</Form.Label>
            <Form.Control value={this.state.description} name="description" onChange={this.updateDescription} type="text" placeholder="Enter book description" />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>Status</Form.Label>
            <Form.Control value={this.state.status} name="status" onChange={this.updateStatus} type="text" placeholder="Enter read status" />
          </Form.Group>
        </Form>
        {/* <Button variant="secondary" onClick={this.props.handleClose} >Close</Button> */}
        <Button variant="primary" onClick={this.addBook} >Add Book</Button>
      </Container>
    );
  }
}

export default withAuth0(BookFormModal);