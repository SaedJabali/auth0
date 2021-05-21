import React from 'react';
import './MyFavoriteBooks.css';
import BestBooks from './BestBooks';
import { Button, Jumbotron } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import axios from 'axios';
import superagent from 'superagent';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
      isUpdating: false,
      name: '',
      description: '',
      status: '',
      photo: '',
      id: '',
    };
  }

  componentDidMount() {
    const url = `http://localhost:3005/books`
    superagent.get(url)
      .query({ email: this.props.userInfo.email })
      .then(res => {
        this.setState({ books: res.body });
      })
      .catch(err => console.error(err))
  }

  addBook = book => {
    axios.post(`http://localhost:3005/books`, book)
      .then(res => {
        this.setState({
          books: res.data.books,
          show: false
        });
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    axios.delete(`http://localhost:3005/books/${id}?email=${this.props.userInfo.email}`)
      .then(res => {
        this.setState({
          books: res.data,
        });
      })
      .catch(err => console.log(err));
  }

  updateBook = book => {
    axios.put(`http://localhost:3005/books/${this.state.id}`, book)
      .then(res => {
        this.setState({
          books: res.data,
          show: false
        }) 
      })
  }

  handleUpdate = book => {
    this.setState({
      show: true,
      name: book.name,
      description: book.description,
      status: book.status,
      photo: book.photo,
      id: book._id,
      isUpdating: true
    });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleOnchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.isUpdating) {
      // Update
      const book = {
        email: this.props.userInfo.email,
        books: [
          {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status,
            photo: this.state.photo
          }
        ]
      }
      this.updateBook(book);
    } else {
      // Add
      const book = {
        email: this.props.userInfo.email,
        books: [
          {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status,
            photo: this.state.photo
          }
        ]
      }
      this.addBook(book);
    }
  }


  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          <Button onClick={this.handleShow} >Add Book</Button>
          <BookFormModal
            show={this.state.show}
            handleClose={this.handleClose}
            handleShow={this.handleShow}
            name={this.state.name}
            descriptions={this.state.description}
            status={this.state.status}
            photo={this.state.photo}
            handleOnchange={this.handleOnchange}
            handleSubmit={this.handleSubmit}
          />
        </Jumbotron>
        <BestBooks
          handleUpdate={this.handleUpdate}
          deleteBook={this.deleteBook}
          books={this.state.books}
        />
      </>
    )
  }
}

export default MyFavoriteBooks;
