import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import AppBar from 'material-ui/lib/app-bar'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import FlatButton from 'material-ui/lib/flat-button'
import LeftNav from 'material-ui/lib/left-nav'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'
import FontIcon from 'material-ui/lib/font-icon'

export default class MyAppBar extends Component {
  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = { open: false }
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
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" onTouchTap={this.signOut} />
            </IconMenu>
          }
        />
        <LeftNav
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
        </LeftNav>
        {this.props.children}
      </div>
    )
  }
}
