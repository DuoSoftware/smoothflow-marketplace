import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { User } from './_base/actions/user.actions'

import { UserService } from "./_base/services";

import Sidenav from './sidenav/sidenav.component';
import Topbar from './topbar/topbar.component';
import Home from './body/home.container';
import MyPods from './body/mypods.container';
import ItemView from './body/itemview.container';
import CreateNew from './body/create.container'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PrivateRoute from './_base/_private.route';
import Dashboard from "./body/dashboard.container";

class App extends Component {
    constructor(props){
        super(props)
    };

    componentDidMount() {
        const _token = localStorage.getItem('satellizer_token');
        if(_token) {
            UserService.getUserProfile()
                .then(profile => {
                    if(profile.data.IsSuccess){
                        this.props.dispatch(User(profile.data.Result))
                    }
                })
                .catch(errorRes => {
                    console.log(errorRes)
                });
        }
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <Topbar/>
                    <div className="sf-body-container">
                        <Sidenav/>
                        <Route render={({ location }) => (
                            <div className="sf-body sf-custom-scroll">
                                {/*<TransitionGroup>*/}
                                    {/*<CSSTransition*/}
                                        {/*key={location.key}*/}
                                        {/*timeout={300}*/}
                                        {/*classNames='sf-fade'>*/}
                                        <Switch location={location}>
                                            <Route exact path="/" component={Home} />
                                            <Route path="/activity/:id" component={ItemView} />
                                            <Route path="/user/dashboard" component={Dashboard} />
                                            <Route path="/user/mypods" component={MyPods} />
                                            <PrivateRoute path="/create" is_logged_in={this.props.user.is_logged_in} component={CreateNew} />
                                        </Switch>
                                    {/*</CSSTransition>*/}
                                {/*</TransitionGroup>*/}
                            </div>
                        )}/>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps) (App);
