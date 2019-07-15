import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
import OptionsMenu from "./OptionsMenu";

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
  },
  avatar: {
    backgroundColor: '#b8b8b8'
  }
};

export default class TopUserInfo extends Component {
  render() {
    const { userInfo } = this.props;
    if (userInfo.isFetching) {
      return (
        <div style={style}>
          <span style={style.message}>
            Loading user details...
          </span>
        </div>
      )
    }

    if (userInfo.errorMessage) {
      return (
        <div style={style}>
          <span style={style.errorMessage}>
            `Failed to fetch user details, reason: '{userInfo.errorMessage}'`
          </span>
        </div>
      )
    }

    return (
      <div style={style}>
        {userInfo.data && <Avatar src={userInfo.data.picture} style={style.avatar} />}
        <span style={style.message}>
          &nbsp;Welcome, {userInfo.data && userInfo.data.username}
        </span>
        <OptionsMenu signOut={this.props.signOut} />
      </div>
    )
  }
}

TopUserInfo.propTypes = {
  signOut: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired
};
