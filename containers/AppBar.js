import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/lib/app-bar'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import FlatButton from 'material-ui/lib/flat-button'
import { AUTH0_DOMAIN } from '../constants/Auth0Variables'

export default class MyAppBar extends Component {
  signOut() {
    localStorage.removeItem('id_token')
    window.location = `https://${AUTH0_DOMAIN}/v2/logout?returnTo=${encodeURIComponent('http://localhost:3000/#complete')}`
  }

  render() {
    return (
      <AppBar
        title="Title"
        iconElementRight={
          <div>
            <FlatButton label="Sign In" />
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" onClick={this.signOut} />
            </IconMenu>
          </div>
        }
      />
    )
  }
}
