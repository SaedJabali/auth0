import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
// import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BestBookModal';


class BestBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookData: [],
    };
  }

  //get books for given user email
  componentDidMount = async () => {
    const { user } = this.props.auth0;
    try {
      const userBookData = await axios.get(`http://localhost:3001/books?email=${user.email}`);
      this.setState({
        bookData: userBookData.data.books
      })
    } catch (error) {
      console.log(error);
    }
  };

  updateBooks = (bookResults) => {
    this.setState({
      bookData: bookResults,
    })
    // console.log('this is the updated state of books after POST:', this.state.books);
  }

  deleteBook = async (index) => {
    const { user } = this.props.auth0;
    const newArrayOfBooks = this.state.bookData.filter((idx) => {
      return idx !== index;
    });

    console.log(newArrayOfBooks);
    this.setState({
      bookData: newArrayOfBooks
    });

    await axios.delete(`http://localhost:3001/books/${index}?email=${user.email}`);
  }

  render() {
    return (
      <>
        {this.state.bookData.map((book, idx) =>
          <>
            <img style={{ width: '50%' }}
              src={book.image}
              alt="pleasant placeholder pictures"
            />
            <div id={idx}>
              {book.name}
              <Button onClick={() => this.deleteBook(idx)} >Remove Book</Button>
            </div>
            <p>{book.description}</p>
            <p>{book.status}</p>
            <br />
          </>

        )}
        <BookFormModal updateBooks={this.updateBooks} />
      </>
    )
  }
}


export default withAuth0(BestBook)