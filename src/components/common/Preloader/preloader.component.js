import React, { Component } from 'react';
import './preloader.scss';

class Preloader extends Component {
    render() {
        return (
            <div className="sf-preloader">
                <span className="sf-preloader-outer">
                    <span className="sf-preloader-inner"></span>
                </span>
            </div>
        )
    }
}

export { Preloader }