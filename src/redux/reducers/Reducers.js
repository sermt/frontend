import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import PatientsReducer from './PatientsReducer'

const reducers = combineReducers({
    auth: AuthReducer,
    patients: PatientsReducer
})

export default reducers