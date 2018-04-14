import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

class PageButton extends Component {
  render () {
    const buttons = Array(this.props.numberOfPages).fill().map((_, i) => {
      return (
        <Link key={`pageButton${i}`} to={`/users/${i + 1}`}>
          <RaisedButton
            label={`${i + 1}`}
            primary={this.props.currentPage === i + 1}
          />
        </Link>
      )
    })
    return (
      <div>
        {buttons}
      </div>
    )
  }
}

export default PageButton
