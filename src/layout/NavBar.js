import React, { Component } from 'react';

export class NavBar extends Component {
  
  render() {
    return (
      <div id="nav-container" className="visual-container">
        <h2>[Navigation]</h2>
        <nav>
            {Object.keys(this.props.pages).map(e=><button key={e} onClick={this.props.setPage.bind(this,e)}>{e}</button>)}
        </nav>
      </div>
    )
  }
}

export default NavBar
