const UIHelperReducer = (state = false, action) => {
    switch(action.type) {
        case 'PRELOAD_BODY' :
            return {
                ...state,
                _preload_body_ : action.loader
            }
        
        default :
            return state;
    }
};

export default UIHelperReducer;