import React, { Component } from 'react'
import { connect } from 'react-redux'
import {PageHeader, Preloader} from "../components/common";
import {ComingSoon} from "../components/common/ComingSoon/coming.soon.component";
import {ActivitiesService} from "../_base/services";
import {AllReviews, PreloadBody} from "../_base/actions";
import Wrap from "../_base/_wrap";
import Moment from 'react-moment';

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allReviews : []
        }
    }
    componentDidMount () {
        this.getAllReviews();
    }

    getAllReviews () {
        this.props.dispatch(PreloadBody(true));
        if (this.props.reviews.all_reviews.length) {
            this.setState(state => ({
                ...state,
                allReviews: this.props.reviews.all_reviews
            }));
        } else {
            ActivitiesService.marketplaceReviewByTenant(this.props.user.username)
                .then(res => {
                    if (res.data.IsSuccess) {
                        const _allReviews = res.data.Result;
                        this.setState(state => ({
                            ...state,
                            allReviews: _allReviews
                        }));
                        this.props.dispatch(AllReviews(_allReviews));
                        this.props.dispatch(PreloadBody(false));
                    }
                })
                .catch(res => {
                    this.props.dispatch(PreloadBody(true));
                });
        }
    }

    render() {
        return (
            <div className="sf-route-content">
                {/*<ComingSoon/>*/}
                {
                    this.props.uihelper._preload_body_
                        ?   <Preloader type="BODY"/>
                        :   this.state.allReviews.map((review, i) =>
                            <Wrap>
                                <PageHeader title={ review.activity_name }>
                                    <Moment format={'Do MMMM YYYY, h:mm:ss a'}>{ review.created_at }</Moment>
                                </PageHeader>
                                {
                                    review.reviewer_comments.length
                                        ?   review.reviewer_comments.map(comment =>
                                            <div className={`sf-comment-block${ ' sf-comment-' + comment.status.toLowerCase()}`}>
                                                <div className="sf-comment-block-prefix">
                                                    <i className="material-icons">{ comment.status === 'PENDINGREVISION' ? 'warning' : 'assignment_turned_in' }</i>
                                                </div>
                                                <div className="sf-comment-block-body">
                                                    <h4><i className="material-icons">account_circle</i>{ comment.reviewer }</h4>
                                                    <div className="sf-comment-content" id={'sf_comment_' + i}>
                                                        <div dangerouslySetInnerHTML={{__html: comment.comment}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        :   <i>No reviews for this activity yet</i>
                                }
                                <div className="sf-p-p"></div>
                            </Wrap>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = (state => ({
    uihelper : state.uihelper,
    reviews : state.reviews,
    user: state.user
}));

export default connect(mapStateToProps)(Reviews);