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
            loadingPage: false
        };
    }
    getAllItems = () => {
        this.setState(prevState => ({
            ...prevState,
            loadingPage : true
        }));
        ActivitiesService.getAllActivities()
            .then((res) => {
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
                this.setState({
                    allActivities: loadedActivities,
                    loadingPage: false
                });
            })
            .catch((errorRes) => {
                console.log(errorRes);
            });
    }

    componentDidMount() {
        this.getAllItems();
    }
    render() {
        return (
            <div>
                {
                    this.state.loadingPage
                        ?   <Preloader />
                        :   <div>
                            <div className="sf-controls-bar">
                                <div className="sf-control-search">
                                    <input className="sf-input-shadow" type="text" id="mainSearch" placeholder="Search.."/>
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
