import React, { Component } from 'react'
export class NavBar extends Component {
  
  render() {
    return (
      <div id="nav-container" className="visual-container">
        <h2>[Navigation]</h2>
        <nav>
            <button>Speak & Spell Simulator</button>
            {Object.keys(this.props.pages).map(e=><button key={e} onClick={this.props.navFunc}>{e}</button>)}
        </nav>
      </div>
    )
  }
}

export default NavBar
