import React from 'react';
import { Jumbotron } from 'react-bootstrap';
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
    try {
      const booksData = await axios.get(`http://localhost:3001/books?email=${user.email}`);
      // console.log('book data exists!', booksData);

      this.setState({
        userBooks: booksData.data.books
      });
    } catch (err) {
      // this.setState({error: `${err.message}: ${err.response.data.error}`});
      console.log('epdhkv;soflidgkh');
    }
  }
  render() {
    return (
      <>
        {this.state.books.length > 0 &&
          <Jumbotron>

            <h1>My Favorite Books</h1>
            <p>
              This is a collection of my favorite books
      </p>
            <BookFormModal  />
            {this.state.books.map((ele, idx) => {
              return <Card style={{ width: '18rem' }} key={idx}>
                <ListGroup variant="flush">
                  <ListGroup.Item as="li" active>book name:
              {ele.name}</ListGroup.Item>
                  <ListGroup.Item>description: {ele.description}</ListGroup.Item>
                  <ListGroup.Item>status: {ele.status}</ListGroup.Item>
                </ListGroup>
              </Card>;
            })}


          </Jumbotron>}
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);