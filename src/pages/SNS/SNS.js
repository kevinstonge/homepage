import React, { Component } from 'react'
import SNSsvg from './SNSsvg';
import './SNS.css';
import {test, test2} from './SNSfunc';
export default class SNS extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      x:0,
    };
    this.functions = {
      fu: (n) => { clearTimeout(this.timeoutVar); n++; this.setState({x:n}); this.timeoutVar=setTimeout(this.functions.fu,1000,n); }
    }
  }
  SNSButtonPress = (e) => { console.log(e) }
  render() {

    return (
      <div>
        <div id="x">{this.state.x}</div>
        <div id="SNScontainer">
        <SNSsvg SNSButtonPress={this.SNSButtonPress}/>
        
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.timeoutVar = setTimeout(this.functions.fu,1000,this.state.x)
    {test2(5)}
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutVar);
  }
}