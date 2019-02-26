import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'

const style = {
  display: 'flex',
  color: '#ffffff',
  cursor: 'pointer',
  message: {
    marginTop: 15
  },
  errorMessage: {
    color: 'red',
    marginTop: 15
  }
};

export default class TopUserInfo extends Component {
  render() {
    const {userinfo} = this.props;
    if (userinfo.isFetching) {
      return (
        <div style={style}>
          <span style={style.message}>
            Loading user details...
          </span>
        </div>
      )
    }

    if (userinfo.errorMessage) {
      return (
        <div style={style}>
          <span style={style.errorMessage}>
            `Failed to fetch user details, reason: '{userinfo.errorMessage}'`
          </span>
        </div>
      )
    }

    return (
      <div style={style}>
        {userinfo.data && <Avatar src={userinfo.data.picture}/>}
        <span style={style.message}>
              Welcome, {userinfo.data && userinfo.data.username}
            </span>
        <IconMenu
          iconButtonElement={
            <IconButton iconClassName="material-icons" iconStyle={{color: '#ffffff'}}>
              more_vert
            </IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Sign out" onTouchTap={this.props.signOut}/>
        </IconMenu>
      </div>
    )
  }
}

TopUserInfo.propTypes = {
  signOut: PropTypes.func.isRequired,
  userinfo: PropTypes.object.isRequired
};
