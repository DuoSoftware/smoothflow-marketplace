import React, { Component } from 'react';
import './sidenav.scss';

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _sidenav : [
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
            ],
            _structuredList : {
                "taps": {
                    list: []
                },
                "activities": {
                    list: []
                },
                "apps": {
                    list: []
                }
            }
        }
    };

    getSidenav() {
        for(const i of this.state._sidenav ) {
            if (i.category === 'tap') {
                this.state._structuredList.taps.list.push(i);
            }else if (i.category === 'activity') {
                this.state._structuredList.activities.list.push(i);
            }else if (i.category === 'app') {
                this.state._structuredList.apps.list.push(i);
            }
        }
        this.setState();
    }
    componentDidMount() {
        this.getSidenav();
    }

    render() {
        return (
            <div className="sf-sidenav sf-custom-scroll">
                <div className="sf-list">
                    <div className="sf-list-block">
                        <div className="sf-list-header">Taps</div>
                        <div className="sf-list-body">
                            <ul>
                            {
                                this.state._structuredList.taps.list.map((item) =>
                                    <li>{ item.name }</li>
                                )
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sf-list">
                    <div className="sf-list-block">
                        <div className="sf-list-header">Activites</div>
                        <div className="sf-list-body">
                            <ul>
                                {
                                    this.state._structuredList.activities.list.map((item) =>
                                        <li>{ item.name }</li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sf-list">
                    <div className="sf-list-block">
                        <div className="sf-list-header">Apps</div>
                        <div className="sf-list-body">
                            <ul>
                                {
                                    this.state._structuredList.apps.list.map((item) =>
                                        <li>{ item.name }</li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidenav;
