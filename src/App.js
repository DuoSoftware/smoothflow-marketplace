import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch  } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

import ReduxToastr from 'react-redux-toastr'
import {UIHelper, UserService} from "./_base/services";
import Sidenav from './sidenav/sidenav.component';
import Topbar from './topbar/topbar.component';
import Home from './body/home.container';
import MyActiivities from './body/myactivities.container';
import MyBlueprints from './body/myblueprints.container';
import Integrations from './body/integrations.container';
import ItemView from './body/itemview.container';
import CreateNewActivity from './body/create_activity.container'
import CreateNewIntegration from './body/create_integration.container'
import PrivateRoute from './_base/_private.route';
import Dashboard from "./body/dashboard.container";
import URLs from "./_base/_urls";
import {User, PreloadShell, SignIn} from './_base/actions';
import Reviews from "./body/reviews.container";
import Usage from "./body/usage.container";
import Billing from "./body/billing.container";
import UIHelperReducer from "./_base/reducers/uihelper.reducer";
import Wrap from "./_base/_wrap";
import Amplify from 'aws-amplify'

class App extends Component {
    constructor(props) {
        super(props)
    };
    componentDidMount() {
        Amplify.Auth.currentSession()
            .then(_ses => {
                this.props.dispatch(PreloadShell(true));
                const _sesuser = _ses.idToken.payload;
                UserService.getUserProfile()
                    .then(profile => {
                        if (profile.data.IsSuccess) {
                            profile.data.Result.given_name = _sesuser.given_name;
                            profile.data.Result.family_name = _sesuser.family_name;
                            this.props.dispatch(PreloadShell(false));
                            this.props.dispatch(User(profile.data.Result));
                            this.props.dispatch(SignIn(true));

                            // const company = _ses.idToken.jwtToken;
                            // const host = 'dev.smoothflow.io';   //window.location.host;
                            //
                            // UserService.getUserSettings(URLs.auth.getUserSettings(host, company))
                            //     .then((settings) => {
                            //         profile.data.Result.settings = settings.data.Result;
                            //         this.props.dispatch(PreloadShell(false));
                            //         this.props.dispatch(User(profile.data.Result));
                            //     })
                            //     .catch(_errorRes => {
                            //         this.props.dispatch(PreloadShell(false));
                            //         this.props.dispatch(User(profile.data.Result));
                            //     });

                        }
                    })
                    .catch(errorRes => {
                        this.props.dispatch(PreloadShell(false));
                    });
            })
            .catch(eres => {
                debugger
            })
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
                                <TransitionGroup>
                                    <CSSTransition
                                        key={location.key}
                                        timeout={300}
                                        classNames='sf-fade'>
                                        <Switch location={location}>
                                            <Route exact path="/" component={Home} />
                                            <Route path="/activities/:id" component={ItemView} />
                                            <Route path="/integrations/:id" component={ItemView} />
                                            <PrivateRoute path="/user/dashboard" is_logged_in={this.props.user.is_logged_in} component={Dashboard} />
                                            <PrivateRoute exact path="/user/activities" is_logged_in={this.props.user.is_logged_in} component={MyActiivities} />
                                            <PrivateRoute exact path="/user/blueprints" is_logged_in={this.props.user.is_logged_in} component={MyBlueprints} />
                                            <PrivateRoute exact path="/user/integrations" is_logged_in={this.props.user.is_logged_in} component={Integrations} />
                                            <PrivateRoute exact path="/user/reviews" is_logged_in={this.props.user.is_logged_in} component={Reviews} />
                                            <PrivateRoute exact path="/user/usage" is_logged_in={this.props.user.is_logged_in} component={Usage} />
                                            <PrivateRoute exact path="/user/billing" is_logged_in={this.props.user.is_logged_in} component={Billing} />
                                            <PrivateRoute path="/user/activities/create" is_logged_in={this.props.user.is_logged_in} component={CreateNewActivity} />
                                            <PrivateRoute path="/user/integrations/create" is_logged_in={this.props.user.is_logged_in} component={CreateNewIntegration} />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </div>
                        )}/>
                    </div>
                    <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="top-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        closeOnToastrClick/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps) (App);
