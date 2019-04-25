import React from 'react';
import './App.css';
import Header from './layout/Header';
import NavBar from './layout/NavBar';
import Content from './layout/Content';
import Ads from './layout/Ads';
import navFunc from './components/navFunc';
function App() {
  return (
    <div className="App">
      <Header navFunc={navFunc}/>
      <div id="main-grid">
      <NavBar />
      <Content />
      <Ads />
      </div>
    </div>
  );
}

export default App;
