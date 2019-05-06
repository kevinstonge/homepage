import React, { Component } from 'react'
import './loadingAnimation.css';
export class Animation extends Component {
  initialize = () => {
    clearTimeout(this.props.state.timer);
    //set up circle array, each circle has an initial theta (angle relative to center of track)
    let circles = new Array(this.props.state.userAdjustableParameters["number of circles"][2]).fill('').map((e,i,a)=>{return i*2*Math.PI/a.length});
    let ctx=document.querySelector("#loadingCanvas").getContext("2d");
    this.canvasWidth = this.props.state.userAdjustableParameters["canvas width"][2];
    this.drawLoading(circles,ctx);
  };
  drawLoading = (circles,ctx) => {
    let vars = this.props.state;
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    let speedTheta = this.thetaReset(vars.speedTheta - 0.05);
    let colorTheta = this.thetaReset(vars.colorTheta - 0.05);
    let radiusTheta = this.thetaReset(vars.radiusTheta - 0.05);
    let fps = vars.fps;
    circles.forEach((c,i,a)=>{
      let x = vars.userAdjustableParameters["track radius"][2] * Math.cos(c);
      let y = vars.userAdjustableParameters["track radius"][2] * Math.sin(c);
      let r = vars.userAdjustableParameters["circle radius"][2] * this.deltaTheta(c,radiusTheta);
      let deltaS = this.deltaTheta(c,speedTheta);
      let deltaC = this.deltaTheta(c,colorTheta);
      a[i] = this.thetaReset(c + (Math.PI+deltaS)/fps/2 + (Math.PI*deltaS)/fps/2);
      let fill = `hsla(${vars.userAdjustableParameters["hue"][2]},${vars.userAdjustableParameters["saturation"][2]}%,${vars.userAdjustableParameters["luminosity"][2]}%,${deltaC/Math.PI})`;
      let stroke = "#ffffff";
      this.drawCircle(ctx,x,y,r,stroke,fill);
    });
    this.props.state.timer = setTimeout(this.drawLoading,1000/fps,circles,ctx);
  };

  drawCircle(ctx,x,y,r,s,f) {
    x = x + Math.floor(this.canvasWidth/2);
    y = y + Math.floor(this.canvasWidth/2);
    ctx.strokeStyle=s;
    ctx.fillStyle=f;
    ctx.moveTo(x+this.props.state.userAdjustableParameters["circle radius"][2],y);
    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
    //ctx.stroke();   
  };

  deltaTheta = (a,b) => {
    let d = Math.abs(a-b);
    return (d>Math.PI) ? 2*Math.PI - d : d;
  };

thetaReset = (theta) => {
    if (theta > 2*Math.PI) { return theta - 2*Math.PI; }
    if (theta < 0) { return theta + 2*Math.PI; }
    return theta;
  };

  render() {
    let width = this.props.state.userAdjustableParameters["canvas width"][2];
    return (
      <div id="loadingAnimationContainer">
        <canvas id="loadingCanvas" width={width} height={width}>animation</canvas>
      </div>
    )
  }
  componentDidMount() {
    this.initialize();

  }
  componentDidUpdate() {
    this.initialize();
  }
}

export default Animation
