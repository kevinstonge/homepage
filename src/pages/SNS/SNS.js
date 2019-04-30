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
    this.functions = SNSfunc;
    this.audioElement = new Audio(SNSaudio);
    this.playing = false;
    this.timer = undefined;
  };
  SNSdisplay = (newState) => { this.setState(newState) };
  SNSaudio = (start,duration) => { 
    this.audioElement.currentTime = start;
    this.audioElement.play();
    this.timer = setTimeout(()=>{this.audioElement.pause()},duration);
  };
  
  SNSButtonPress = (e) => { 
    // cleanup: it might look a bit cleaner to append these functions and pass them as one arg:
    // this.functions.SNSdisplay = this.SNSdisplay;
    // this.functions.SNSaudio = this.SNSaudio;
    this.functions.buttonPress(e,this.vars,this.state,this.SNSdisplay,this.SNSaudio);
    //this.SNSaudio(3,1000);
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
    window.addEventListener("keydown",(e) => { e.preventDefault(); this.functions.keyDown(e,this.vars,this.state,this.SNSdisplay,this.SNSaudio) });
    this.functions.clearDisplay(this.SNSdisplay);

    //this.functions.pushOutput("asdf",this.vars,this.SNSdisplay)
    //this.timeoutVar = setTimeout(this.functions.fu,1000,this.state.x)

  }
  componentWillUnmount() {
    clearTimeout(this.timer);
    this.audioElement.pause();
  }
}