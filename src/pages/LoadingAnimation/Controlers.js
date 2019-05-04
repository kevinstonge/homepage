import React, { Component } from 'react'

export class Controlers extends Component {

  handler = (e) => { 
    e.persist();
    let newState = this.props.state;
    newState.userAdjustableParameters[e.target.name][2] = e.target.value;
    this.props.updateState(newState); 
  }
  render() {
    return (
      <div>
        <input name="canvas width" type="range" min="20" max="200" onInput={this.handler}></input>
      </div>
    )
  }
  componentDidMount() {
    // let newState = this.props.state;
    // newState.userAdjustableParameters["canvas width"][2] = 100;
    // this.handler(newState);
  }
}

export default Controlers
