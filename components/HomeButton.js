import React, { Component } from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/lib/flat-button'

const style = {
  position: 'fixed',
  padding: 23
}

export default class HomeButton extends Component {

  render() {
    return (
      <div style={style}>
        <Link to="/">
          <FlatButton
            primary={true}
            label="Home" />
        </Link>
      </div>
    )
  }
}
