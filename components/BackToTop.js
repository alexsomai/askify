import React, { Component } from 'react'
import ScrollToTop from 'react-scroll-up'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab';

export default class BackToTop extends Component {
  render() {
    return (
      <ScrollToTop showUnder={100}>
        <Fab color="primary">
          <Icon>keyboard_arrow_up</Icon>
        </Fab>
      </ScrollToTop>
    )
  }
}
