import React, { Component } from 'react'

export class Controlers extends Component {

  handler = (e) => { 
    e.persist();
    let newState = this.props.state;
    newState.userAdjustableParameters[e.target.name][2] = parseInt(e.target.value);
    this.props.updateState(newState); 
  }

  render() {
    return (
      <div id="loadingAnimationControllers">
        {Object.keys(this.props.state.userAdjustableParameters).map(e=><div key={e}className="controllerContainer"><p>{e}</p><p>{this.props.state.userAdjustableParameters[e][2]}</p><input name={e} type="range" min={this.props.state.userAdjustableParameters[e][0]} max={this.props.state.userAdjustableParameters[e][1]} value={this.props.state.userAdjustableParameters[e][2]} onChange={this.handler}></input></div>)}
      </div>
    )
  }
}

export default Controlers
