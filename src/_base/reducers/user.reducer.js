const initState = {
    Active: true,
    company: 0,
    created_at: "2018-08-02T06:58:54.121Z",
    email: {
        contact: "kasun.w@duosoftware.com",
        type: "email",
        display: "kasun.w@duosoftware.com",
        verified: false
    },
    tenant: 1,
    updated_at: "2018-08-02T06:58:54.121Z",
    user_meta: {role: "admin"},
    username: "kasun.w@duosoftware.com",
    _id: "5b62abaeb0eca10001a26ee9",
    is_logged_in: false,
    mypods: []
};
const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SIGNIN' :
            return {
                ...state,
                username: action.user.username,
                _id: action.user._id,
                email: {
                    contact: action.user.email.contact
                },
                is_logged_in: true
            };

        case 'SIGNOUT' :
            return {
                ...state,
                is_logged_in: false
            };

        case 'GET_MY_PODS' :
            return {
                ...state,
                mypods: action.mypods
            };

        case 'USER_LOADER' :
            return {
                ...state,
                loading: action.loader
            };

        default:
            return state
    }
}

export default UserReducer;