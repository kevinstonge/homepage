import React, { Component } from 'react'

export default class SNS extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      x:0,
    };
    this.functions = {
      fu: (n) => { clearTimeout(this.timeoutVar); n++; this.setState({x:n}); console.log(n); this.timeoutVar=setTimeout(this.functions.fu,1000,n); }
    }
  }
  render() {

    return (
      <div>
      <div id="sns">Speak and Spell!</div>
      <div id="x">{this.state.x}</div>
      </div>
    )
  }
  componentDidMount() {
    this.timeoutVar = setTimeout(this.functions.fu,1000,this.state.x)
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutVar);
  }
}