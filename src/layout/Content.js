import React, { Component } from 'react'

export class Content extends Component {
  render() {
    return (
      <div id="content-container" className="visual-container">
        <h2>[Content]</h2>
        <p>Content page passed from App.js: {this.props.page}</p>
      </div>
    )
  }
}

export default Content
