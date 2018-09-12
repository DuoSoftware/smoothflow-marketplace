import React, { Component } from 'react';
import './topbar.scss';

class Topbar extends Component {
    render() {
        return (
            <div className="sf-topbar">
                <div className="sf-logo">
                    <img src="images/Smoothflow-Logo.png" alt="Smoothflow Marketplace"/> <span className="sf-logo-subtext">Marketplace</span>
                </div>
            </div>
        );
    }
}

export default Topbar;
