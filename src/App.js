import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import NavBar from './layout/NavBar';
import Content from './layout/Content';
import Ads from './layout/Ads';
import LoadingAnimation from './pages/LoadingAnimation/LoadingAnimation';

class App extends React.Component {  
  constructor(props) {  
    super(props);
    this.state = {
      pages: {  //React.lazy for code splitting
        "home": React.lazy(() => import('./pages/Home')),
        "loading animation": React.lazy(()=>import('./pages/LoadingAnimation/LoadingAnimation')),
        "weather": React.lazy(()=>import('./pages/Weather')),
        "speak & spell": React.lazy(()=>import('./pages/SNS/SNS')),
        //sns lcd
        //rpn calc
        //age calc
        //perlin or other noise cloud generator for backgrounds?
      },
      currentPage: (decodeURIComponent(window.location.pathname.substring(1).replace("/homepage/build/","")) || "home"),
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
        <Suspense fallback={<LoadingAnimation controllers="false"/>}>
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
