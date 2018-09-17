import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidenav from './sidenav/sidenav.component';
import Topbar from './topbar/topbar.component';
import Home from './body/home.container';
import ItemView from './body/itemview.container';
import CreateNew from './body/create.container'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Topbar/>
                <div className="sf-body-container">
                    <Sidenav/>
                    <Router>
                        <Route render={({ location }) => (
                            <div className="sf-body sf-custom-scroll">
                                <TransitionGroup>
                                    <CSSTransition
                                        key={location.key}
                                        timeout={300}
                                        classNames='fade'>
                                        <Switch location={location}>
                                            <Route exact path="/" component={Home} />
                                            <Route path="/activity/:id" component={ItemView} />
                                            <Route path="/create" component={CreateNew} />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </div>
                        )}/>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;
