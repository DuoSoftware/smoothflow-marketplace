import React, { Component } from 'react';
import './sidenav.scss';
import { connect } from 'react-redux'
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
                {
                    this.props.user.is_logged_in
                    ?   <div className="sf-user-nav">
                            <Block>
                                <Link to={'/create'}>
                                    <Button className="sf-button sf-button-primary sf-button-primary-s sf-button-caps sf-button-block sf-button-iconed" icon={'home'} style={{marginBottom: '15px'}}>Create Activity</Button>
                                    <Button className="sf-button sf-button-clear sf-button-caps sf-button-block sf-button-iconed" icon={'code'}>Create Blueprint</Button>
                                </Link>
                            </Block>
                            <Block>
                                <List>
                                    <li>
                                        <Link to={'/user/dashboard'}>
                                            <Textbox icon="home" size="17">
                                                <span>Dashboard</span>
                                            </Textbox>
                                        </Link>
                                    </li>
                                    <li className="sf-list-active">
                                        <Link to={'/user/myactivities'}>
                                            <Textbox icon="items" size="17">
                                                <span>Activities</span>
                                            </Textbox>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/user/myblueprints'}>
                                            <Textbox icon="code" size="17">
                                                <span>Blueprints</span>
                                            </Textbox>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/user/integrations'}>
                                            <Textbox icon="code" size="17">
                                                <span>Integrations</span>
                                            </Textbox>
                                        </Link>
                                    </li>
                                </List>
                            </Block>
                            <Block />
                        </div>
                    :   null
                }
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
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Sidenav);