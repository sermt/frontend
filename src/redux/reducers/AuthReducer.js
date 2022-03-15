import * as Actions from '../actions';

const INITIAL_STATE_VALUES = {
    data:{},
    profile: {},
    isLoading: false,
    isLoadingProfile: false,
    isLoadingRegistration:false
}

const AuthReducer =(state = INITIAL_STATE_VALUES, action)=>{
    switch(action.type){
        case Actions.SET_USER_DATA:
            return {...state, data: action.payload}
        case Actions.SET_PROFILE_DATA:
            return {...state, profile: action.payload}
        case Actions.TOGGLE_LOADING_USER:
            return {...state, isLoading: action.payload}
        case Actions.TOGGLE_LOADING_PROFILE:
            return {...state, isLoadingProfile: action.payload}
        case Actions.TOGGLE_LOADING_REGISTRATION:
            return {...state, isLoadingRegistration: action.payload}
        case Actions.LOGOUT:
            localStorage.removeItem("my-token");
            window.location.href="/"
            return INITIAL_STATE_VALUES
        default:
            return state
    }
}

export default AuthReducer
