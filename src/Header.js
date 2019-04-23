import React, { Component } from 'react'
import logo from './logo.svg';

export class Header extends Component {
  render() {
    return (
        <div>
            <header className="App-header">
                <div id="header-logo">
                    <img alt="logo" src={logo}/>
                </div>
                <h1>The Website of Kevin St.Onge</h1>
            </header>
        </div>
    )
  }
}

export default Header
