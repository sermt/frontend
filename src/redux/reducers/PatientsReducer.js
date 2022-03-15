import * as Actions from '../actions';

const INITIAL_STATE_VALUES = {
    data:{},
    patient: {},
    isLoadingPatient: false,
    isLoadingPatients: false
}

const PatientsReducer =(state = INITIAL_STATE_VALUES, action)=>{
    switch(action.type){
        case Actions.GET_PATIENTS_DATA:
            return state
        case Actions.SET_PATIENTS_DATA:
            return {...state, data: action.payload}
        case Actions.SET_PATIENT_DATA:
            return {...state, patient: action.payload}
        default:
            return state
    }
}

export default PatientsReducer
