import {
    DO_DELETE,
    DO_DELETE_SUCCESS,
    DO_DELETE_FAILED,
    LIST_USER,
    LIST_USER_SUCCESS,
    LIST_USER_FAILED,
    DO_EDIT, DO_EDIT_SUCCESS, DO_EDIT_FAILED,
    DO_ADD, DO_ADD_SUCCESS, DO_ADD_FAILED
} from './ActionTypes'

const initialState = {
    error: "",
    isRedirect: false,
    loading: false
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case LIST_USER:
            state = {
                ...state,
                isRedirect: false,
                loading:true
            }
            break;
        case LIST_USER_SUCCESS:
            state = {
                ...state,
                user: action.payload,
                isRedirect: false,
                loading:false,
            }
            break;
        case LIST_USER_FAILED:
            state = {
                ...state,
                isRedirect: false,
                error: action.payload,
                loading:false,
            }
            break;
        case DO_DELETE:
            state = {
                ...state,
                loading:true
            }
            break;
        case DO_DELETE_SUCCESS:
            state = {
                ...state,
                loading:false,
            }
            break;
        case DO_DELETE_FAILED:
            state = {
                ...state,
                loading:false,
                error: action.payload
            }
            break;
        case DO_EDIT:
            state = {
                ...state,
                isRedirect:false,
                loading:true,
            }
            break;
        case DO_EDIT_SUCCESS:
            state = {
                ...state,
                loading:false,
                isRedirect:true,
                error: action.payload
            }
            break;
        case DO_EDIT_FAILED:
            state = {
                ...state,
                loading:false,
                error: action.payload
            }
            break;

        case DO_ADD:
            state = {
                ...state,
                loading:false,
                error: action.payload
            }
            break;
        case DO_ADD_SUCCESS:
            state = {
                ...state,
                loading:false,
                isRedirect:true,
            }
            break;
        case DO_ADD_FAILED:
            state = {
                ...state,
                loading:false,
                error: action.payload
            }
            break;
        default:
            state = {...state}
            break;
    }
    return state;
}

export default users;