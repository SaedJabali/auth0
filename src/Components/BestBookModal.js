import React from 'react';
import { Modal, Button, Container, Form } from 'react-bootstrap';

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

  handleSubmit = () => {
    const book = {
      email: this.props.email,
      books: [
        {
          name: this.state.name,
          description: this.state.description,
          status: this.state.status,
          photo: this.state.photo
        }
      ]
    }
    this.props.addBook();
  }

  render() {
    return (
      <Container>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control value={this.state.name} name="name" onChange={this.handleOnchange} type="text" placeholder="Enter book name" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control value={this.state.description} name="description" onChange={this.handleOnchange} type="text" placeholder="Enter book description" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Status</Form.Label>
                <Form.Control value={this.state.status} name="status" onChange={this.handleOnchange} type="text" placeholder="Enter read status" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Book Cover Photo's URL</Form.Label>
                <Form.Control value={this.state.photo} name="photo" onChange={this.handleOnchange} type="text" placeholder="Enter Book Cover Photo's URL" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose} >Close</Button>
            <Button variant="primary" onClick={this.handleSubmit} >Add Book</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default BookFormModal;