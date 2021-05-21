import React from 'react';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <h2>User Name : {this.props.userInfo.name}</h2>
        <img src={this.props.userInfo.picture} alt='Users profile' />
        <p>User Email : {this.props.userInfo.email}</p>
      </div>
    )
  }
};

export default Profile;