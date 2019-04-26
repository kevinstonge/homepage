import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
      <Router>
      <div className="App">
        <Header setPage={this.setPage}/>
        <div id="main-grid">
        <NavBar pages={this.state.pages} setPage={this.setPage}/>
        <Content page={this.state.currentPage}>
          <Route exact path="/" component={Home} />
          <Route exact path={"/"+this.state.currentPage} render={props=>(this.state.pages[this.state.currentPage])} />
        </Content>
        <Ads />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
