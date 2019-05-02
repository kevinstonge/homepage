import React, { Component } from 'react'
import SNSsvg from './SNSsvg';
import './SNS.css';
import SNSstate from './SNSstate';
import SNSvars from './SNSvars';
import SNSfunc from './SNSfunc';
import SNSaudio from './sns96-mono.mp3';
export default class SNS extends Component {
  constructor(props) {  
    super(props);
    this.state = SNSstate;
    this.vars = SNSvars;
    this.audioElement = new Audio(SNSaudio);
    this.timer1 = undefined;
    this.timer2 = undefined;
    this.functions = SNSfunc;
    //easier to merge root functions into the constructor
    //this.functions.test = () => { console.log('hi') };

  };
  SNSdisplay = (newState) => { this.setState(newState); return this.state; };
  SNSaudio = (start,duration) => { 
    this.audioElement.currentTime = start;
    this.audioElement.play();
    this.timer1 = setTimeout(()=>{this.audioElement.pause()},duration);
  };

  syncOutput = (SNSvars,SNSstate,SNSfunctions) => {
    if (SNSvars.audioArray.length > 0) { 
      SNSvars.wait = true;
      this.functions.pushOutput(SNSvars.textArray[0],SNSvars,SNSfunctions);
      const startTime = SNSvars.soundIndex[SNSvars.soundIndex.indexOf(SNSvars.audioArray[0])+1];
      const duration = SNSvars.soundIndex[SNSvars.soundIndex.indexOf(SNSvars.audioArray[0])+2];
      this.SNSaudio(startTime,duration);
      this.timer2 = setTimeout(function() { SNSfunctions.syncOutput(SNSvars,SNSstate,SNSfunctions) },2000);
      console.log(duration);
      SNSvars.textArray.shift();
      SNSvars.audioArray.shift();
    }
    else { SNSvars.wait = false; };
  };

  SNSButtonPress = (e) => { 
    if (this.vars.wait) { return; }
    this.functions.SNSdisplay = this.SNSdisplay;
    this.functions.SNSaudio = this.SNSaudio;
    this.functions.syncOutput = this.syncOutput;
    this.functions.buttonPress(e,this.vars,this.state,this.functions); 
    //consider making buttonPress return [SNSvars,SNSstate] so that they can be updated each time from here.
  };
  render() {
    return (
      <div>
        <div id="SNScontainer">
          <SNSsvg SNSButtonPress={this.SNSButtonPress} SNSstate={this.state}/>
        </div>
      </div>
    )
  }
  componentDidMount() {
    window.addEventListener("keydown",(e) => { 
      e.preventDefault(); 
      let button = "";
      if (this.vars["wait"] === true) { return; }
      button = e.which || e.keyCode || 0;
      if (button === 13) { button = 40; } //enter
      if (button === 8) { button = 39; } //backspace
      if (button === 222) { button = 37; } //'
      let keyString = String.fromCharCode(button).toLowerCase();
      if (/^[a-z]+$/.test(keyString) && 65 <= button && button <= 90) { 
        button = keyString;
      }
      if (button !== "") { this.SNSButtonPress(button); }
      else { return };
    });
  }
  componentWillUnmount() {
    this.audioElement.pause();
    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
  }
}