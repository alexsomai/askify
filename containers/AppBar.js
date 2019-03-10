import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import TopUserInfo from '../components/TopUserInfo'

class AskifyAppBar extends Component {
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
    const { userinfo } = this.props
    return (
      <div>
        <AppBar
          title="Askify"
          onLeftIconButtonTouchTap={this.handleToggle}
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
          onRequestChange={open => this.setState({open})}
          >
          <MenuItem
            onTouchTap={this.handleClose}
            containerElement={<Link to="/" />}
          >
            <FlatButton
              style={{ backgroundColor: 'transparent' }}
              icon={<FontIcon className="material-icons">home</FontIcon>}
              label="Home"
            />
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
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
}

AskifyAppBar.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    userinfo: state.userinfo
  }
}

export default connect(
  mapStateToProps
)(AskifyAppBar)
