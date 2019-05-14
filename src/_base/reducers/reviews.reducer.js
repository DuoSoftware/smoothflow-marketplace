const reviews = {
    all_reviews: [],
    active_activity_reviews: []
};

const ReviewsReducer = (state = reviews, action) => {
    switch (action.type) {
        case 'ALL_REVIEWS' :
            return {
                ...state,
                all_reviews: action.reviews
            };

        case 'ACTIVE_ACTIVITY_REVIEWS' :
            return {
                ...state,
                active_activity_reviews: action.reviews
            };

        default :
            return state
    }
};

export default ReviewsReducer;