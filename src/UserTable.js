/* eslint-disable no-console */

import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import Avatar from 'material-ui/Avatar'
import { USER_PATH } from './constants'
import PageButtons from './PageButtons'

export const getKeys = (dbKeys, currentPage, pageSize) => {
  return [dbKeys[(currentPage - 1) * pageSize], dbKeys[(currentPage * pageSize) - 1]]
}

export default class UserTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      pageSize: 20
    }
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps
    if (nextProps.dataKeys) {
      this.fetchData()
    }
  }

  fetchData () {
    const currentPage = this.props.match.params.currentPage
    const [startAt, endAt] = getKeys(this.props.dataKeys, currentPage, this.state.pageSize)
    fetch(`${USER_PATH}?orderBy="$key"&startAt="${startAt}"&endAt="${endAt}"`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({data: Object.entries(data)})
      })
      .catch(error => console.log(error))
  }

  render () {
    const rows = this.state.data.map(([key, userRecord]) => {
      return (
        <TableRow key={key}>
          <TableRowColumn>{userRecord.firstName}</TableRowColumn>
          <TableRowColumn>{userRecord.lastName}</TableRowColumn>
          <TableRowColumn>{userRecord.email}</TableRowColumn>
          <TableRowColumn>{userRecord.streetAddress}</TableRowColumn>
          <TableRowColumn>{userRecord.city}</TableRowColumn>
          <TableRowColumn><Avatar alt='{user.firstName} {user.lastName}' size={40} src={userRecord.avatar} /></TableRowColumn>
        </TableRow>
      )
    })

    const currentPage = parseInt(this.props.match.params.currentPage, 10)
    return (
      <div>
        <PageButtons
          currentPage={currentPage}
          numberOfPages={Math.ceil(this.props.dataKeys.length / this.state.pageSize)} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Address</TableHeaderColumn>
              <TableHeaderColumn>City</TableHeaderColumn>
              <TableHeaderColumn>Avatar</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody id='user-data'>
            {rows}
          </TableBody>
        </Table>
      </div>
    )
  }
}
