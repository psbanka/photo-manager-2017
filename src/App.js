import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillMount () {
    /* eslint-disable no-console */
    fetch('https://test1234-2e32a.firebaseio.com/thing.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({data: Object.entries(data)})
      })
      .catch(error => console.log(error))
  }

  render () {
    const rows = this.state.data.map(([key, userRecord]) => {
      return (
        <tr key={key}>
          <td>{userRecord.firstName}</td>
          <td>{userRecord.lastName}</td>
          <td>{userRecord.email}</td>
          <td>{userRecord.streetAddress}</td>
          <td>{userRecord.city}</td>
          <td><img alt='{user.firstName} {user.lastName}' style={{height: '50px'}}src={userRecord.avatar} /></td>
        </tr>
      )
    })

    return (
      <div className='App'>
        <table>
          <thead>
            <tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Address</th><th>City</th><th>Avatar</th></tr>
          </thead>
          <tbody id='user-data'>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
