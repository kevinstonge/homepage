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
        "home": React.lazy(() => import('./pages/Home')),
        "loading animation": React.lazy(()=>import('./pages/LoadingAnimation/LoadingAnimation')),
        "weather": React.lazy(()=>import('./pages/Weather')),
        "speak & spell": React.lazy(()=>import('./pages/SNS/SNS')),
      },
      currentPage: (decodeURIComponent(window.location.pathname.substring(1)) || "home"),
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
        <Suspense fallback={<p> ... loading ... </p>}>
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
