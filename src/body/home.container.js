import React, { Component } from 'react';
import ActivitiesService from '../_base/services/activities.service';
import ItemCard from '../widgets/Itemcard/itemcard.widget';
import Wrap from '../_base/_wrap'
import { BrowserRouter as Route, Link } from "react-router-dom";
import Preloader from '../widgets/Preloader/preloader.widget';

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
        this.setState(prevState => ({
            ...prevState,
            loadingPage : true
        }));
        ActivitiesService.getAllActivities()
            .then((res) => {
                if(res.data.Result.activities.length > 0) {
                    const loadedActivities = res.data.Result.activities.map((activity, index) => {
                        return {
                            name: activity.activity_name,
                            image: activity.image,
                            description: activity.description,
                            features:
                                activity.features.map((ft) => {
                                    return {
                                        title: ft.title,
                                        icon: 'check_circle',
                                        description: ft.description
                                    }
                                }),
                            tags:
                                activity.tags.map((tag) => {
                                    return {
                                        name: tag.tag
                                    }
                                }),
                            what_you_get:
                                activity.what_you_get.map((wyg) => {
                                    return {
                                        type: 'image',
                                        content: wyg.content
                                    }
                                }),
                            pricings:
                                activity.pricings.map((price) => {
                                    return {
                                        name: price.name,
                                        pricing_fts:
                                            price.pricing_fts.map((ft) => {
                                                return {
                                                    icon: 'check_circle_thin',
                                                    text: ft
                                                }
                                            }),
                                        price: price.price,
                                        bill_cycle: price.bill_cycle
                                    }
                                }),
                            faq:
                                activity.faq.map((fq) => {
                                    return  {
                                        title: fq.question,
                                        answer: fq.answer
                                    }
                                })
                        }
                    });
                    this.temp_all_activities = loadedActivities;
                    this.setState({
                        allActivities: loadedActivities,
                        loadingPage: false
                    });
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        loadingPage: false
                    }));
                }
            })
            .catch((errorRes) => {
                console.log(errorRes);
            });
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
        return (
            <div>
                {
                    this.state.loadingPage
                        ?   <Preloader />
                        :   <div>
                            <div className="sf-controls-bar">
                                <div className="sf-control-search">
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
                                <div className="sf-control-buttons">
                                    <Link to={'/create'} className="sf-btn sf-btn-primary sf-btn-thin">Create</Link>
                                </div>
                            </div>
                            <div>
                                {
                                    !this.state.loadingPage
                                        ?   this.state.allActivities.map((activity) => {
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

export default Home;
