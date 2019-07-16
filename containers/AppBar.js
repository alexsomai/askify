import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/menu';
import HomeIcon from '@material-ui/icons/home';
import CloseIcon from '@material-ui/icons/close';
import TopUserInfo from '../components/TopUserInfo'

const style = {
  root: {
    flexGrow: 1
  },
  list: {
    width: 200
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
};

class AskifyAppBar extends Component {

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = { open: false }
  }

  isAuth() {
    return localStorage.getItem('id_token')
  }

  signOut() {
    localStorage.removeItem('id_token');
    window.location.href = '/'
  }

  handleToggle() {
    this.setState({ open: !this.state.open })
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    const { userinfo } = this.props;
    return (
      <div style={style.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="Menu" onClick={this.handleToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" style={style.title}>
              Askify
            </Typography>
            {this.isAuth() && <TopUserInfo userInfo={userinfo} signOut={this.signOut} />}
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.open} onClose={this.handleClose}>
          <List style={style.list}>
            <Link component={RouterLink} to="/" style={style.link}>
              <ListItem button key="home" onClick={this.handleClose}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="HOME" />
              </ListItem>
            </Link>
            <ListItem button key="close" onClick={this.handleClose}>
              <ListItemIcon><CloseIcon /></ListItemIcon>
              <ListItemText primary="CLOSE" />
            </ListItem>
          </List>
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
