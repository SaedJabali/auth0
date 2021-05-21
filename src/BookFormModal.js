import React from 'react';
import { Modal, Button, Container, Form } from 'react-bootstrap';

class BookFormModal extends React.Component {
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
                <Form.Control value={this.props.name} name="name" onChange={this.props.handleOnchange} type="text" placeholder="Enter book name" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control value={this.props.description} name="description" onChange={this.props.handleOnchange} type="text" placeholder="Enter book description" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Status</Form.Label>
                <Form.Control value={this.props.status} name="status" onChange={this.props.handleOnchange} type="text" placeholder="Enter read status" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Book Cover Photo's URL</Form.Label>
                <Form.Control value={this.props.photo} name="photo" onChange={this.props.handleOnchange} type="text" placeholder="Enter Book Cover Photo's URL" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose} >Close</Button>
            <Button variant="primary" onClick={this.props.handleSubmit} >Add Book</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default BookFormModal;
