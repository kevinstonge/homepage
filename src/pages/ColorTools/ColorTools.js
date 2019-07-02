import React, { Component } from 'react';
import ColorPreview from './components/ColorPreview';
import ColorWheel from './components/ColorWheel';
import HslSliders from './components/HslSliders';
import ColorPalette from './components/ColorPalette';
import * as cookies from './accessories/cookies';
import './ColorTools.css';
import RgbSliders from './components/RgbSliders';
export default class ColorTools extends Component {
  constructor(props) {
    super (props);
    this.state = { 
      baseColor:[0,100,50],
      width:300,
      picker:true,
    };
  }

  updateBaseColor = (color) => { 
    if (color === this.state.baseColor) { return; }
    if (color[0] >= 360) { color[0] = 0 }
    if (color[1] >= 100) { color[1] = 100 }
    if (color[2] >= 100) { color[2] = 100 }
    color = color.map(e=>Number(e));
    this.textColor = (color[2]>40) ? "black" : "white";
    this.setState({baseColor:color});
    //improve performance by only updating cookie if the mouse isn't down (specifically when picking a color in ColorWheel)
    //explore using localdata instaed of cookies
    this.updateCookie();
  }

  updateCookie = () => {
    cookies.setCookie("colorTools",JSON.stringify(this.state),1);
  }

  applyCookie = () => {
    let cookie = cookies.getCookie("colorTools");
    (cookie) ? this.setState(JSON.parse(cookie)) : this.updateCookie();
  }

  togglePicker = () => {
    let newState = this.state;
    newState.picker = (newState.picker) ? false : true;
    this.setState(newState);
  }
  pickerCSS = () => {
    return (this.state.picker) ? { display: "block" } : { display: "none" };
  }

  render() {
  return (
    <div id="colorToolsFlexContainer">
      <div id="colorPickers" style={this.pickerCSS()}>
        <ColorPreview updateBaseColor={this.updateBaseColor} state={this.state} />
        <ColorWheel updateBaseColor={this.updateBaseColor} state={this.state} />
        <HslSliders updateBaseColor={this.updateBaseColor} state={this.state} />
        <RgbSliders updateBaseColor={this.updateBaseColor} state={this.state} />
      </div>
      <div id="colorPalette">
        <ColorPalette updateBaseColor={this.updateBaseColor} togglePicker={this.togglePicker} state={this.state}/>
      </div>
    </div>
  );
  };
  componentDidMount () {
    this.applyCookie();
  }
}
