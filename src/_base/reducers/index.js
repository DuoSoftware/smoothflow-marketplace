import { combineReducers } from 'redux'
import UserReducer from './user.reducer'
import PublicReducer from './public.reducer'
import UIHelperReducer from './uihelper.reducer';
import ReviewsReducer from './reviews.reducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
    'user': UserReducer,
    'public_': PublicReducer,
    'uihelper': UIHelperReducer,
    'toastr': toastrReducer,
    'reviews': ReviewsReducer
})