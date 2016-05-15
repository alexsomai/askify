import React, { Component } from 'react'
import ScrollToTop from 'react-scroll-up'
import FontIcon from 'material-ui/FontIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton'

export default class BackToTop extends Component {
  render() {
    return (
      <ScrollToTop showUnder={100}>
        <FloatingActionButton>
          <FontIcon
            className="material-icons">
            keyboard_arrow_up
          </FontIcon>
      </FloatingActionButton>
      </ScrollToTop>
    )
  }
}
