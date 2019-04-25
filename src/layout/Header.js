import React, { Component } from 'react'
import Logo from '../components/Logo';

export class Header extends Component {
  render() {
    return (
        <div>
            <header className="App-header visual-container" onClick={this.props.navFunc}>
                <div id="header-left" className="header-block">
                    <Logo />
                </div>
                <div id="header-middle" className="header-block">
                  <h1>The Website of Kevin St.Onge</h1>
                </div>
                <div id="header-right" className="header-block">
                </div>
            </header>
        </div>
    )
  }
}

export default Header
