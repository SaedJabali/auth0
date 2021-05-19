import React from 'react';
// import './MyFavoriteBooks.css';
// import BestBooks from './BestBooks';
import { Button, Jumbotron } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card';
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


  // addBook = async (e) => {
  //   e.preventDefault();

  //   // TODO: send the request to the backend
  //   const bodyData = {
  //     name: this.state.name,
  //     description: this.state.description,
  //     status: this.state.status,
  //     email: this.props.auth0.user.email
  //   };
  //   const newBook = await axios.post(`http://localhost:3001/books`, bodyData);

  //   // TODO: get the new data and update it in the state
  //   this.setState({
  //     books: newBook.data
  //   });
  //   console.log('hiahxfoispydghfoinsdhgvj[pfis' ,this.state.books);
  // }

  updateName = (e) => this.setState({ name: e.target.value });
  updateDescription = (e) => this.setState({ description: e.target.value });
  updateStatus = (e) => this.setState({ status: e.target.value });

  deleteBook = async (index) => {
    const { user } = this.props.auth0;
    const newArrayOfBooks = this.state.books.filter((book, idx) => {
      return idx !== index;
    });

    console.log(newArrayOfBooks);
    this.setState({
      books: newArrayOfBooks
    });

    await axios.delete(`${process.env.REACT_APP_HOST}/books/${index}?email=${user.email}`);
  }
  // updateBook = (book => {
  //   .then(res => {
  //     this.setState({
  //       books: res.data,
  //       show: false
  //     })
  //   })
  //   axios.put(`${process.env.REACT_APP_BACKEND_URL}/books/${this.state.id}`, book)
  // });

  // handleUpdate = (book => {
  //   this.setState({
  //     show: true,
  //     name: book.name,
  //     description: book.description,
  //     status: book.status,
  //     photo: book.photo,
  //     id: book._id,
  //     isUpdating: true
  //   });
  // });

  // handleShow = () => {
  //   this.setState({ show: true });
  // }

  // handleClose = () => {
  //   this.setState({ show: false });
  // }

  handleOnchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (this.state.isUpdating) {
  //     // Update
  //     const book = {
  //       email: this.props.user.email,
  //       books: [
  //         {
  //           name: this.state.name,
  //           description: this.state.description,
  //           status: this.state.status,
  //           // photo: this.state.photo
  //         }
  //       ]
  //     }
  //     this.updateBook(book);
  //   } else {
  //     // Add
  //     const book = {
  //       email: this.props.user.email,
  //       books: [
  //         {
  //           name: this.state.name,
  //           description: this.state.description,
  //           status: this.state.status,
  //           // photo: this.state.photo
  //         }
  //       ]
  //     }
  //     this.addBook(book);
  //   }
  // }


  render() {
    return (
      <>
        {this.state.books.length > 0 &&
          <Jumbotron>

            <h1>My Favorite Books</h1>
            <p>
              This is a collection of my favorite books
      </p>
            <BookFormModal addBook={this.addBook} updateName={this.updateName} updateDescription={this.updateDescription} updateStatus={this.updateStatus} handleSubmit={this.handleSubmit} />
            {this.state.books.map((ele, idx) => {
              return <Card style={{ width: '18rem' }} key={idx}>
                <ListGroup variant="flush">
                  <ListGroup.Item as="li" active>book Nam:
              {ele.name}</ListGroup.Item>
                  <ListGroup.Item>description: {ele.description}</ListGroup.Item>
                  <ListGroup.Item>status: {ele.status}</ListGroup.Item>
                </ListGroup>
                <Button onClick={() => this.deleteBook(idx)} >remove</Button>
              </Card>;
            })}


          </Jumbotron>}
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);