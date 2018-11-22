import React, { Component } from 'react';
import './sidenav.scss';
import { connect } from 'react-redux'
import {Block, Textbox, List, Button, Preloader} from "../components/common";
import { Link } from 'react-router-dom'
import Wrap from "../_base/_wrap";
import {KEY} from "../_base/services";
import {Dropdown} from "../components/common/Dropdown/dropdown.component";

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _sidenav : [{
                name: 'dashboard',
                icon: 'home',
                active: false
            },{
                name: 'activities',
                icon: 'items',
                active: false
            },{
                name: 'blueprints',
                icon: 'code',
                active: false
            },{
                name: 'integrations',
                icon: 'code',
                active: false
            },{
                name: 'Usage',
                icon: 'items',
                active: false
            }],
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
            },
            _create_dd: false
        };
    };

    componentDidMount() {
        this.initSidenav();
    };
    initSidenav() {
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

    setActiveNav = (e, _name) => {
        const _state_nav = [...this.state._sidenav];
        for(const nav of _state_nav) {
            if (nav.name === _name) nav.active = true;
            else nav.active = false;
        };
        this.setState(state => ({
            ...state,
            _sidenav : _state_nav
        }));
    };

    initCreatePanel = () => {
        this.setState(state => ({
            ...state,
            _create_dd: true
        }));
    };
    closeCreatePanel = () => {
        this.setState(state => ({
            ...state,
            _create_dd: false
        }));
    };


    render() {
        return (
            <div className="sf-sidenav sf-custom-scroll">
                {
                    this.props.uihelper._preload_shell_
                    ?   <Preloader type="SHELL:SIDENAV" />
                    :   <div>
                            {
                                this.props.user.is_logged_in
                                ?   <Wrap>
                                        <Dropdown toggle={this.state._create_dd} width={'89%'} height={'125px'} dark>
                                            <span className="sf-icon icon-sf_ico_close_circle" onClick={ this.closeCreatePanel.bind() }></span>
                                            <List>
                                                <li>
                                                    <Link to={'/user/activities/create'} onClick={ this.closeCreatePanel.bind() }>
                                                        <Textbox icon={'plus_circle'} size="15">
                                                            <span>New Activity</span>
                                                        </Textbox>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={'/user/integrations/create'} onClick={ this.closeCreatePanel.bind() }>
                                                        <Textbox icon={'plus_circle'} size="15">
                                                            <span>New Integration</span>
                                                        </Textbox>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={'/user/blueprints'}>
                                                        <Textbox icon={'plus_circle'} size="15" onClick={ this.closeCreatePanel.bind() }>
                                                            <span>New Blueprint</span>
                                                        </Textbox>
                                                    </Link>
                                                </li>
                                            </List>
                                        </Dropdown>
                                        <div className="sf-user-nav">
                                            <Block>
                                                <Button className="sf-button sf-button-primary sf-button-primary-s sf-button-caps sf-button-block sf-button-iconed" icon={'plus_circle'} onClick={ this.initCreatePanel.bind() }>Create</Button>
                                            </Block>
                                            <Block>
                                                <List>
                                                    {
                                                        this.state._sidenav.map(nav => {
                                                            return  <li key={KEY()} className={nav.active ? 'sf-list-active' : null}>
                                                                        <Link to={'/user/' + nav.name}
                                                                              onClick={event => this.setActiveNav(event, nav.name)}
                                                                              id={`NAV_${nav.name.toUpperCase()}`}>
                                                                            <Textbox icon={nav.icon} size="17">
                                                                                <span>{nav.name}</span>
                                                                            </Textbox>
                                                                        </Link>
                                                                    </li>
                                                        })
                                                    }
                                                </List>
                                                <Block/>
                                                <List>
                                                    <li key={KEY()}>
                                                        <Link to={'/user/billing'}
                                                              onClick={event => this.setActiveNav(event, 'reviews')}
                                                              id={'NAV_REVIEWS'}>
                                                            <Textbox icon="code" size="17">
                                                                <span>Billing</span>
                                                            </Textbox>
                                                        </Link>
                                                    </li>
                                                </List>
                                                <div className="sf-hr" style={{margin: '10px 0'}}></div>
                                                <List>
                                                    <li key={KEY()}>
                                                        <Link to={'/user/reviews'}
                                                              onClick={event => this.setActiveNav(event, 'reviews')}
                                                              id={'NAV_REVIEWS'}>
                                                            <Textbox icon="code" size="17">
                                                                <span>Activity Reviews</span>
                                                            </Textbox>
                                                        </Link>
                                                    </li>
                                                </List>
                                            </Block>

                                        </div>
                                    </Wrap>
                                :   null
                            }

                            {/*<div className="sf-list">*/}
                                {/*<div className="sf-list-block">*/}
                                    {/*<div className="sf-list-header">Activities</div>*/}
                                    {/*<div className="sf-list-body">*/}
                                        {/*<ul>*/}
                                            {/*{*/}
                                                {/*this.state._structuredList.taps.list.map((item) =>*/}
                                                    {/*<li>{ item.name }</li>*/}
                                                {/*)*/}
                                            {/*}*/}
                                        {/*</ul>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    uihelper: state.uihelper
});

export default connect(mapStateToProps)(Sidenav);