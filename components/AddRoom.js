import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

const style = {
  position: 'fixed',
  bottom: 0,
  right: 0,
  padding: 23
}

export default class AddRoom extends Component {
  render() {
    return (
      <div style={style}>
        <FloatingActionButton>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
