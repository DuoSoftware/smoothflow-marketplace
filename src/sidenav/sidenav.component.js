import React, { Component } from 'react';
import './sidenav.scss';
import {Block, Textbox, List, Button} from "../components/common";
import { Link } from 'react-router-dom'

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _sidenav : [],
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

    componentDidMount() {
        this.getSidenav();
    };
    getSidenav() {
        let _nav_obj = {
            taps: {
                list: []
            },
            activities: {
                list: []
            },
            apps: {
                list: []
            }
        };
        for(const i of this.state._sidenav ) {
            if (i.category === 'tap') {
                _nav_obj.taps.list.push(i);
            }else if (i.category === 'activity') {
                _nav_obj.activities.list.push(i);
            }else if (i.category === 'app') {
                _nav_obj.apps.list.push(i);
            }
        }
        this.setState(prevState => ({
            ...prevState,
            _structuredList: _nav_obj
        }));
    };

    render() {
        return (
            <div className="sf-sidenav sf-custom-scroll">
                <div className="sf-user-nav">
                    <Block>
                        <Link to={'/create'}>
                            <Button className="sf-button sf-button-primary sf-button-primary-s sf-button-caps sf-button-block sf-button-iconed" icon={'plus_circle'}>Create Pod</Button>
                        </Link>
                    </Block>
                    <Block>
                        <List>
                            <li>
                                <Textbox icon="home" size="17" center>
                                    <Link to={'/user/dashboard'}>Dashboard</Link>
                                </Textbox>
                            </li>
                            <li>
                                <Textbox icon="items" size="17" center>
                                    <Link to={'/user/mypods'} href="">My Pods</Link>
                                </Textbox>
                            </li>
                        </List>
                    </Block>
                    <Block />
                    <div className="sf-list">
                        <div className="sf-list-block">
                            <div className="sf-list-header">Activities</div>
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
                </div>
            </div>
        );
    }
}

export default Sidenav;
