import React, { Component } from 'react';
import './sidenav.scss';

class Sidenav extends Component {
    _sidenav = [
        {
            name: 'List item',
            category: 'tap',
            isSelected: false
        },{
            name: 'List item',
            category: 'tap',
            isSelected: false
        },{
            name: 'List item',
            category: 'tap',
            isSelected: false
        },{
            name: 'List item',
            category: 'tap',
            isSelected: false
        },{
            name: 'List item',
            category: 'tap',
            isSelected: false
        },{
            name: 'List item',
            category: 'app',
            isSelected: false
        },{
            name: 'List item',
            category: 'app',
            isSelected: false
        },{
            name: 'List item',
            category: 'app',
            isSelected: false
        },{
            name: 'List item',
            category: 'app',
            isSelected: false
        },{
            name: 'List item',
            category: 'app',
            isSelected: false
        },{
            name: 'List item',
            category: 'activity',
            isSelected: false
        },{
            name: 'List item',
            category: 'activity',
            isSelected: false
        },{
            name: 'List item',
            category: 'activity',
            isSelected: false
        },{
            name: 'List item',
            category: 'activity',
            isSelected: false
        },{
            name: 'List item',
            category: 'activity',
            isSelected: false
        }
    ];
    _structuredList = {
        "taps": {
            list: []
        },
        "activities": {
            list: []
        },
        "apps": {
            list: []
        }
    };

    getSidenav() {
        const _taps = this._structuredList.taps.list.map((item) =>
            <li>{ item.name }</li>
        );
        const _activities = this._structuredList.activities.list.map((item) =>
            <li>{ item.name }</li>
        );
        const _apps = this._structuredList.apps.list.map((item) =>
            <li>{ item.name }</li>
        );
        return {
            taps: _taps,
            activities: _activities,
            apps: _apps
        }
    }

    render() {
        for(const i of this._sidenav ) {
            if (i.category === 'tap') {
                this._structuredList.taps.list.push(i);
            }else if (i.category === 'activity') {
                this._structuredList.activities.list.push(i);
            }else if (i.category === 'app') {
                this._structuredList.apps.list.push(i);
            }
        };

        return (
            <div className="sf-sidenav sf-custom-scroll">
                <div className="sf-list">
                    <div className="sf-list-block">
                        <div className="sf-list-header">Taps</div>
                        <div className="sf-list-body">
                            <ul>
                            { this.getSidenav().taps }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sf-list">
                    <div className="sf-list-block">
                        <div className="sf-list-header">Activites</div>
                        <div className="sf-list-body">
                            <ul>
                                { this.getSidenav().activities }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sf-list">
                    <div className="sf-list-block">
                        <div className="sf-list-header">Apps</div>
                        <div className="sf-list-body">
                            <ul>
                            { this.getSidenav().apps }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidenav;
