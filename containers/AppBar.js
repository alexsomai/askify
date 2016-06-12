import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'


export default class MyAppBar extends Component {
  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = { open: false }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  signOut() {
    localStorage.removeItem('id_token')
    window.location.href = '/'
  }

  handleToggle() {
    this.setState({ open: !this.state.open })
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <AppBar
          title="Askify"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Sign out" onTouchTap={this.signOut} />
            </IconMenu>
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
          >
          <MenuItem
            onTouchTap={this.handleClose}
            containerElement={<Link to="/" />}
          >
            <FontIcon className="material-icons">home</FontIcon>
            Home
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
            <FontIcon className="material-icons">close</FontIcon>
            Close
          </MenuItem>
        </Drawer>
        {this.props.children}
      </div>
    )
  }
}

MyAppBar.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}
