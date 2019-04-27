import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import NavBar from './layout/NavBar';
import Content from './layout/Content';
import Ads from './layout/Ads';

class App extends React.Component {  
  constructor(props) {  
    super(props);
    this.state = {
      pages: {
        "home": React.lazy(()=>import('./pages/Home')),
        "weather": React.lazy(()=>import('./pages/Weather')),
      },
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
        <Suspense fallback={<div>loading...</div>}>
          <Route exact path="/" component={this.state.pages["home"]} />
          <Route exact path={"/"+this.state.currentPage} component={this.state.pages[this.state.currentPage]} />
          </Suspense>
        </Content>
        <Ads />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
