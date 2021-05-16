import React, { Component } from 'react'
import LoginButton from './Components/Login'
import LogoutButton from './Components/Logout'
import User from './Components/User'

export class App extends Component {
  render() {
    return (
      <div>
        <LoginButton />
        <LogoutButton />
        <User />
      </div>
    )
  }
}

export default App
