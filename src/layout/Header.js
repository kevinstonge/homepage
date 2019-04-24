import React, { Component } from 'react'
import Logo from '../components/Logo';

export class Header extends Component {
  render() {
    return (
        <div>
            <header className="App-header">
                <div id="header-logo">
                    <Logo />
                </div>
                <h1>The Website of Kevin St.Onge</h1>
            </header>
        </div>
    )
  }
}

export default Header
