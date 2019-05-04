import React, { Component } from 'react'

export class Animation extends Component {
  render() {
    let width = this.props.state.userAdjustableParameters["canvas width"][2];
    return (
      <div>
        <canvas width={width} height={width}>animation</canvas>
      </div>
    )
  }
  componentDidMount() {
      
  }
}

export default Animation
