import React from 'react';
import './App.css';
import Header from './layout/Header';
import NavBar from './layout/NavBar';
import Content from './layout/Content';
import Ads from './layout/Ads';
import navFunc from './components/navFunc';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: {"home": "/", "page1": "page1", "weather": "weather"},
      currentPage: "/",
    };
  }
  setPage = (page) => {
    this.setState({currentPage:page});
  }
  render () {
    return(
      <div className="App">
        <Header navFunc={navFunc}/>
        <div id="main-grid">
        <NavBar pages={this.state.pages} setPage={this.setPage}/>
        <Content page={this.state.currentPage}/>
        <Ads />
        </div>
      </div>
    );
  }
}

export default App;
