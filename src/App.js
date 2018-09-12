import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidenav from './sidenav/sidenav.component';
import Topbar from './topbar/topbar.component';
import Home from './body/home.container';
import ItemView from './body/itemview.container';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Topbar/>
          <div className="sf-body-container">
              <Sidenav/>
              <div className="sf-body sf-custom-scroll">
                  <Home />
              </div>
          </div>
      </div>
    );
  }
}

export default App;
