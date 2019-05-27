import React, { Component } from 'react';
import './tabs.scss';
import {ActiveActivityReviews, AllReviews, PreloadTab} from "../../_base/actions";
import {ActivitiesService} from "../../_base/services";
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

class Tab extends Component {
    getActivityReviews = (e) => {
        // debugger
        this.props.dispatch(PreloadTab(true));
        ActivitiesService.marketplaceReviewByTenant(this.props.user.username)
            .then(res => {
                if (res.data.IsSuccess) {
                    const _allReviews = res.data.Result;
                    let _activeActivityReviews = [];
                    this.props.dispatch(AllReviews(_allReviews));
                    for(let r of _allReviews) {
                        if (r.activity_name === this.props.activityName) {
                            _activeActivityReviews = r.reviewer_comments
                        }
                    }
                    this.props.dispatch(ActiveActivityReviews(_activeActivityReviews.reverse()));
                    this.props.dispatch(PreloadTab(false));
                }
            })
            .catch(res => {
                this.props.dispatch(PreloadTab(false));
                toastr.success('Retrieving failed', 'Failed to download reviews for this Activity.')
            });
    };
    render() {
        return (
            <li className={`sf-tab ${this.props.isActive ? 'active' : ''}${this.props.simple ? ' sf-tab-simple' : ''}`}>
                <a onClick={(event) => {
                       event.preventDefault();
                        if (this.props.title === 'Review Reports') {
                            this.getActivityReviews();
                        }
                        this.props.onClick(this.props.tabIndex);
                   }}>
                    { this.props.title }
                </a>
                <span className="sf-tab-active-arrow"></span>
            </li>
        )
    }
}

const mapStateToProps = (state => ({
    uihelper : state.uihelper,
    reviews: state.reviews,
    user: state.user
}));

export default (connect(mapStateToProps))(Tab);