import { combineReducers } from 'redux'
import UserReducer from './user.reducer'
import PublicReducer from './public.reducer'

export default combineReducers({
    'user': UserReducer,
    'public_': PublicReducer
})