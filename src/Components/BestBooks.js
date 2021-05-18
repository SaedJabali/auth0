import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BestBookModal';

class BestBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      bookData: [],
      modalSeen: false,
    };
  }

  // handle closing and showing modal
  hideModal = () => {
    this.setState({modalSeen: false});
  }
  showModal = () => {
    this.setState({modalSeen: true});
  }

  //get books for given user email
  componentDidMount = async () => {
    try {
      const userBookData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`, { params: { email: this.props.auth0.user.email } });
      this.setState({
        bookData: userBookData.data.books
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
      })
    }
  };

  updateBooks = (bookResults) => {
    this.setState ({
      bookData:bookResults,
    })
    console.log('this is the updated state of books after POST:', this.state.books);
  }
  
  render() {
    return (
      <>
        {this.state.bookData.length > 0 &&
          <Carousel>
            {this.state.bookData.map((book, index) =>
              <Carousel.Item key={index}>
                <img
                  src={book.image}
                  alt="pleasant placeholder pictures"
                />
                <Carousel.Caption>
                  <h3>{book.name}</h3>
                  <p>{book.description}</p>
                  <p>{book.status}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
        }
        <Button variant='dark' onClick={this.showModal}>Add Your Book</Button>
        <BookFormModal modalSeen={this.state.modalSeen} show={this.showModal} close={this.hideModal} updateBooks={this.updateBooks}/>
      </>
    )
  }
}


export default withAuth0(BestBook)