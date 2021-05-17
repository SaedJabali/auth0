import React from 'react';

import axios from 'axios';

import { withAuth0 } from '@auth0/auth0-react';

import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
     
    };
  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    console.log(user);
    console.log('about to request book data');
try{
    const books = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`);
    console.log('book data exists!', books.data.favoriteBooks);

    this.setState({
      books: books.data.favoriteBooks
      });
  }catch(err){
    this.setState({error: `${err.message}: ${err.response.data.error}`});
  }
}




  render() {
    console.log(this.state.bookData);
    return (
      <>
        <Container>
          <Carousel>
            {this.state.bookData && this.state.bookData.map(book =>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={book.image}
                  alt={`slide`}
                />
                <Carousel.Caption>
                <h3>{book.name}</h3>
                  <p>{book.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
        </Container>
      </>
    )
  }
}

export default withAuth0(BestBooks);
