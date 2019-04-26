import React, { Component } from 'react'
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
        <div>
            <Link to="/" onClick={this.props.setPage.bind(this,"home")}>
            <header className="App-header visual-container">
                <div id="header-left" className="header-block">
                    <Logo />
                </div>
                <div id="header-middle" className="header-block">
                  <h1>The Website of Kevin St.Onge</h1>
                </div>
                <div id="header-right" className="header-block">
                </div>
            </header>
            </Link>
        </div>
    )
  }
}

export default Header
