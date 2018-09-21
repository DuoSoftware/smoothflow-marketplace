import React, { Component } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import Input from '../widgets/Input/input.widget';
import TableTwoCol from '../widgets/Table - Two Col/table_two_col.widget';
import '../widgets/Itemcard/itemcard.scss';

class Auth extends Component {
    render() {
        return (
            <div className="sf-flexbox-column sf-fill-height">
                <form className="sf-flex-1 sf-flex-center sf-flexbox-column">
                    <div className="sf-item-card-wrap sf-card sf-card-medium" style={{maxWidth:'500px'}}>
                        <div className="sf-item-card sf-fill-width sf-shadow-box">
                            <div className="sf-item-card-header text-center sf-bg-s">
                                <h3 className="sf-txt-c-p">Login</h3>
                            </div>
                            <div className="sf-item-card-body sf-p-ex">
                                <Input type="text" inputBlock="true" placeholder="Username" required />
                                <Input type="password" inputBlock="true" placeholder="Password" required />
                                <div className="sf-input-block sf-flexbox-row sf-flex-center">
                                    <div className="sf-m-p-t sf-flex-1">
                                        <Input type="checkbox" class="sf-checkbox" label="Remember me" id="remeberMe" />
                                    </div>
                                    <div className="sf-m-p-t sf-flex-1 text-right">
                                        <a>Forgot Password?</a>
                                    </div>
                                </div>
                                <div className="sf-input-block">
                                    <button type="submit" className="sf-btn sf-btn-primary sf-btn-block">Login</button>
                                </div>
                            </div>
                            <div className="sf-item-card-footer">

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Auth;