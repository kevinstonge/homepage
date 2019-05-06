import React, { Component } from 'react';
import Animation from './Animation';
import Controlers from './Controlers';

export class LoadingAnimation extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      userAdjustableParameters: {  // "name": [min,max,current]
        "canvas width":[0,300,100],
        "number of circles": [1,20,7],
        "track radius":[0,40,20],
        "circle radius":[1,10,1],
        "hue":[0,255,0],
        "saturation":[0,100,100],
        "luminosity":[0,100,50],
      },
      speedTheta: 0,
      radiusTheta:Math.PI/3,
      colorTheta:Math.PI,
      fps:60,
      timer:undefined,
    };
  }
  updateState = (newState) => { this.setState(newState) };
  render() {
    return (
      <div>
        <Controlers updateState={this.updateState} state={this.state}/>
        <Animation state={this.state}/>
      </div>
    )
  }
  componentWillUpdate() {
    //clearTimeout(this.state.timer);
  }
  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }
}

export default LoadingAnimation
