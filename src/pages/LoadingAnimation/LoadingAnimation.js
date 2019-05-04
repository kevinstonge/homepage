import React, { Component } from 'react';
import Animation from './Animation';
import Controlers from './Controlers';

export class LoadingAnimation extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      userAdjustableParameters: {  // "name": [min,max,current]
        "canvas width":[60,300,200],
        "number of circles": [1,20,7],
        "track radius":[0,40,20],
        "circle radius":[1,10,2],
        "hue":[0,255,0],
        "saturation":[0,255,0],
        "luminosity":[0,255,255],
      },
      circles: [],
      speedTheta: 0,
      radiusTheta:Math.PI/3,
      colorTheta:Math.PI,
      fps:60
    };
  }
  updateState = (newState) => { this.setState(newState) };
  render() {
    return (
      <div>
        <Animation state={this.state}/>
        <Controlers updateState={this.updateState} state={this.state}/>
      </div>
    )
  }
  componentDidMount() {

  }
}

export default LoadingAnimation
