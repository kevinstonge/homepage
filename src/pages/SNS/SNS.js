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
  }
  SNSdisplay = (newState) => { this.setState(newState) }
  SNSaudio = (start,duration) => { 
    this.audioElement.currentTime = start;
    this.audioElement.play();
    this.timer = setTimeout(()=>{this.audioElement.pause()},duration);
  }

  SNSButtonPress = (e) => { 
    this.functions.test1(e,this.vars,this.functions,this.SNSdisplay);
    this.SNSaudio(3,1000);
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
    //this.timeoutVar = setTimeout(this.functions.fu,1000,this.state.x)
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
    this.audioElement.pause();
  }
}