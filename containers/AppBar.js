import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'

import TopUserInfo from '../components/TopUserInfo'

class AskifyAppBar extends Component {
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
    const { userinfo } = this.props
    return (
      <div>
        <AppBar
          title="Askify"
          iconElementLeft={
            <IconButton onClick={this.handleToggle}>
              <MenuIcon />
            </IconButton>
          }
          iconElementRight={
            localStorage.getItem('id_token') &&
            <TopUserInfo
              userinfo={userinfo}
              signOut={this.signOut}
            />
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem
            onClick={this.handleClose}
            containerElement={<Link to="/" />}
          >
            <FlatButton
              style={{ backgroundColor: 'transparent' }}
              icon={<FontIcon className="material-icons">home</FontIcon>}
              label="Home"
            />
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <FlatButton
              style={{ backgroundColor: 'transparent' }}
              icon={<FontIcon className="material-icons">close</FontIcon>}
              label="Close"
            />
          </MenuItem>
        </Drawer>
        {this.props.children}
      </div>
    )
  }
}

AskifyAppBar.propTypes = {
  userinfo: PropTypes.object
};

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

export default connect(
  mapStateToProps
)(AskifyAppBar)
