import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
import { Activities, ActivitiesLoader } from '../_base/actions'
import { ActivitiesService } from '../_base/services';
import ItemCard from '../components/Itemcard/itemcard.widget';
import Wrap from '../_base/_wrap'
import { Preloader } from '../components/common';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allActivities: [],
            loadingPage: false,
            filter: {
                categories: [
                    {
                        text: 'All',
                        selected: true
                    },
                    {
                        text: 'Tags',
                        selected: false
                    }
                ],
                toggleDropdown: false
            }
        };
    }
    componentDidMount() {
        this.getAllItems();
    }

    // -------------------------------------------------------------------------------
    temp_all_activities = [];

    getAllItems = () => {
    };

    // Search
    search = (e) => {
        const _filtered = this.temp_all_activities.filter((activity) => {
            return activity.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        this.setState(prevState => ({
            ...prevState,
            allActivities: _filtered
        }));
    };

    openSearchDropdown = (e) => {
        const handler = !this.state.filter.toggleDropdown;
        this.setState(prevState => ({
            ...prevState,
            filter: {
                ...prevState.filter,
                toggleDropdown: handler
            }
        }));
    };
    updatedFilter = (e, selected) => {
        let _filters = [...this.state.filter.categories];
        _filters.map((f) => {
            if(f.text === selected) {
                f.selected = true;
            }else{
                f.selected = false;
            }
        });
        this.setState(prevState => ({
            ...prevState,
            filter: {
                toggleDropdown: false,
                categories: _filters
            }
        }));
    };

    render() {
        if(this.props.user.is_logged_in) <Redirect to={'/user/dashboard'} />
        return (
            <div className="sf-route-content">
                {
                    this.props.activities.loading
                        ?   <Preloader />
                        :   <div>
                                <div>
                                    <div className="sf-banner sf-flexbox-column">
                                        <div className="sf-controls-bar sf-flex-1">
                                            <div className="sf-flex-1">
                                                <div className="sf-input-inputcontrol">
                                                    <div className="sf-inputcontrol-select" onClick={ (event) => this.openSearchDropdown(event) }>
                                                        {
                                                            this.state.filter.categories.map((c) => {
                                                                if(c.selected) return c.text
                                                            })
                                                        }
                                                        <span className="sf-icon icon-sf_ico_chevron_down"></span>
                                                    </div>
                                                    <div className={`input-dropdown ${this.state.filter.toggleDropdown ? ' input-dropdown-opened' : ''}`}>
                                                        {
                                                            this.state.filter.categories.map((c) => {
                                                                return  <li onClick={ (e)=>this.updatedFilter(e, c.text)}>
                                                                            <span className="sf-list-icon">
                                                                                { c.selected ? <span className="sf-icon icon-sf_ico_check_circle"></span> : null }
                                                                            </span>
                                                                            <span>{ c.text }</span>
                                                                        </li>
                                                            })
                                                        }
                                                    </div>
                                                    <input type="text" id="mainSearch" placeholder="Search.." onChange={ (e) => this.search(e) }/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sf-flexbox-row" style={{alignItems: 'flex-end', zIndex: 1, color: '#fff'}}>
                                            <div className="sf-flex-1">
                                                <h2>Smoothflow for Developers</h2>
                                                <p>From app integrations to machine learning. <br/>
                                                    Everything you need to automate your workflow.</p>
                                            </div>
                                            <div>
                                                <Link to={'/create'} className="sf-btn sf-btn-primary sf-btn-thin">Get Started</Link>
                                            </div>
                                        </div>
                                        <img src="images/smoothflow_illustration_automation_01.svg" />
                                    </div>
                                </div>
                                <div>
                                    {
                                        !this.props.activities.loading
                                            ?   this.props.activities.activities.map((activity) => {
                                                    if(activity) return <ItemCard item={activity} />
                                                })
                                            :   null
                                    }
                                </div>
                            </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    activities: state.public_
});

export default connect(mapStateToProps)(Home);
