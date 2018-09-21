import React, { Component } from 'react';
import './topbar.scss';
import { BrowserRouter as Router, Link } from "react-router-dom";

class Topbar extends Component {
    render() {
        return (
            <div className="sf-topbar">
                <div className="sf-logo">
                    <Link to={'/'}>
                        <img src="images/Smoothflow-Logo.png" alt="Smoothflow Marketplace"/> <span className="sf-logo-subtext">Marketplace</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Topbar;
