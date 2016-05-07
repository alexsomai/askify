import React, { Component } from 'react'
import ScrollToTop from 'react-scroll-up'
import FontIcon from 'material-ui/FontIcon'

export default class BackToTop extends Component {
  render() {
    return (
      <ScrollToTop showUnder={100}>
        <FontIcon
          className="material-icons">
          arrow_drop_up
        </FontIcon>
        <span>Back to top</span>
      </ScrollToTop>
    )
  }
}
