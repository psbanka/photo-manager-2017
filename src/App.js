/* global fetch */

import React, { Component } from 'react'
import './App.css'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom'
import { USER_PATH } from './constants'

import UserTable from './UserTable'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataKeys: []
    }
  }

  componentWillMount () {
    /* eslint-disable no-console */
    fetch(`${USER_PATH}?shallow=true`)
      .then((response) => response.json())
      .then((data) => {
        const dataKeys = Object.keys(data).sort()
        this.setState({dataKeys})
      })
      .catch(error => console.error(error))
  }

  render () {
    return (
      <Router>
        <MuiThemeProvider>
          <div className='App'>
            <AppBar title='Photo Manager' showMenuIconButton={false} />
            <Paper style={{margin: '20px'}} zDepth={1} >
              <Route exact path='/' render={(props) => (
                <Redirect to='/users/1' />
              )}
              />
              <Route path='/users/:currentPage' render={props => (
                <UserTable {...props} dataKeys={this.state.dataKeys} />
              )}
              />
            </Paper>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
