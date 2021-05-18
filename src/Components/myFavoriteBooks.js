import React from 'react';
// import './MyFavoriteBooks.css';
import BestBooks from './BestBooks';
import { Button, Jumbotron } from 'react-bootstrap';
import BookFormModal from './BestBookModal';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
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

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    console.log(user);
    console.log('about to request book data');
    try {
      const booksData = await axios.get(`http://localhost:3001/books?email=${user.email}`);
      console.log('book data exists!', booksData);

      this.setState({
        userBooks: booksData.data.books
      });
    } catch (err) {
      // this.setState({error: `${err.message}: ${err.response.data.error}`});
      console.log('epdhkv;soflidgkh');
    }
  }


  addBook = book => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/books`, book)
      .then(res => {
        this.setState({
          books: res.data.books,
          show: false
        });
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/books/${id}?email=${this.props.user.email}`)
      .then(res => {
        this.setState({
          books: res.data,
        });
      })
      .catch(err => console.log(err));
  }

  updateBook = book => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/books/${this.state.id}`, book)
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
        email: this.props.user.email,
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
        email: this.props.user.email,
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
            addBook={this.addBook}
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

export default withAuth0(MyFavoriteBooks);