import React, { Suspense } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import NavBar from './layout/NavBar';
import Content from './layout/Content';
import RightColumn from './layout/RightColumn';
import LoadingAnimation from './pages/LoadingAnimation/LoadingAnimation';

class App extends React.Component {  
  constructor(props) {  
    super(props);
    this.state = {
      pages: {  //React.lazy for code splitting
        "home": React.lazy(() => import('./pages/Home')),
        "color tools":React.lazy(()=>import('./pages/ColorTools/ColorTools')),
        "loading animation": React.lazy(()=>import('./pages/LoadingAnimation/LoadingAnimation')),
        //"weather": React.lazy(()=>import('./pages/Weather')),
        "speak & spell": React.lazy(()=>import('./pages/SNS/SNS')),
        //sns lcd
        //rpn calc
        //age calc
        //perlin or other noise cloud generator for backgrounds?
      },
      currentPage: (decodeURIComponent(window.location.hash.substring(2)) || "home"),
    };
  }
  setPage = (page) => {
    this.setState({currentPage:page});
  }
  render () {
    return(
      <HashRouter basename='/'>
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
        <RightColumn />
        </div>
      </div>
      </HashRouter>
    );
  }
}

export default App;
