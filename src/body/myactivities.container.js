import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyActivities, MyActivitiesLoader, PreloadBody } from '../_base/actions'
import {ActivitiesService, KEY} from '../_base/services';
import ItemCard from '../components/Itemcard/itemcard.widget';
import { BrowserRouter as Route, Link } from "react-router-dom";
import {Preloader, PageHeader, Button} from "../components/common";

class MyActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.getMyActivities();
    }

    // -------------------------------------------------------------------------------
    getMyActivities = () => {
        this.props.dispatch(PreloadBody(true));
        ActivitiesService.getAllActivities()
            .then((res) => {
                if(typeof(res.data.Result) === "object" && res.data.Result.activities.length > 0) {
                    const loadedActivities = res.data.Result.activities.map((activity, index) => {
                        return {
                            ...activity,
                            original: activity,
                            type: 'activity',
                            state: activity.state,
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
                                        file: wyg.file
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
                                        question: fq.question,
                                        answer: fq.answer
                                    }
                                }),
                            variables:
                                activity.variables.map((v) => {
                                    return  {
                                        "Key": v.Key,
                                        "DisplayName": v.DisplayName,
                                        "Value": v.Value,
                                        "ValueList": v.ValueList.map(vl => {
                                            return {
                                                "key": vl.key,
                                                "value": vl.value
                                            }
                                        }),
                                        "APIMethod": v.APIMethod,
                                        "Type": v.Type,
                                        "Category": v.Category,
                                        "DataType": v.DataType,
                                        "Group": v.Group,
                                        "Priority": v.Priority,
                                        "advance": v.advance,
                                        "control": v.control,
                                        "placeholder": v.placeholder
                                    }
                                }),
                            reviews: []
                        }
                    });
                    this.props.dispatch(GetMyActivities(loadedActivities));
                    this.props.dispatch(PreloadBody(false));
                } else {
                    this.props.dispatch(GetMyActivities([]));
                    this.props.dispatch(PreloadBody(false));
                }
            })
            .catch((errorRes) => {
                console.log(errorRes);
                this.props.dispatch(PreloadBody(false));
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
            <div className="sf-route-content">
                {
                    this.props.uihelper._preload_body_
                    ?   <Preloader type={'BODY'} />
                    :   <div>
                            <PageHeader title={'My Activities'}>
                                <Link to={'/user/activities/create'}>
                                    <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-raised">Create</Button>
                                </Link>
                            </PageHeader>
                            <div>
                                {
                                    !this.props.uihelper._preload_body_
                                    ?   this.props.user.myactivities.map((activity) => {
                                            if(activity) return <ItemCard key={KEY()} item={activity} advanced={true} />
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
    uihelper: state.uihelper
});

export default connect(mapStateToProps)(MyActivities);
