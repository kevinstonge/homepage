import React from 'react';
import './App.css';
import Header from './layout/Header';
import NavBar from './layout/NavBar';
import Content from './layout/Content';
import Ads from './layout/Ads';
import Home from './pages/Home';
import Weather from './pages/Weather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: {"home": <Home />, "weather": <Weather />,},
      currentPage: "home",
    };
  }
  setPage = (page) => {
    this.setState({currentPage:page});
  }
  render () {
    return(
      <div className="App">
        <Header setPage={this.setPage}/>
        <div id="main-grid">
        <NavBar pages={this.state.pages} setPage={this.setPage}/>
        <Content page={this.state.currentPage}>
          {this.state.pages[this.state.currentPage]}
        </Content>
        <Ads />
        </div>
      </div>
    );
  }
}

export default App;
