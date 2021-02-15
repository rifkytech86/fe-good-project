import {
    LIST_USER, LIST_USER_SUCCESS, LIST_USER_FAILED, DO_DELETE,
    DO_DELETE_SUCCESS, DO_DELETE_FAILED, DO_EDIT,
    DO_EDIT_SUCCESS, DO_EDIT_FAILED,
    DO_ADD, DO_ADD_SUCCESS, DO_ADD_FAILED} from "./ActionTypes";

export const listUsers = (user) =>  {
    return {
        type: LIST_USER,
        payload: { user }
    }
}

export const listUsersSuccess = (user) => {
    return {
        type: LIST_USER_SUCCESS,
        payload: user
    }
}

export const listUserFailed = (error) => {
    return {
        type: LIST_USER_FAILED,
        payload: error
    }
}

export const doDelete = (id) => {
    return {
        type: DO_DELETE,
        payload: {id}
    }
}


export const doDeleteSuccess = (msg) => {
    return {
        type: DO_DELETE_SUCCESS,
        payload: msg
    }
}

export const doDeleteFailed = (error) => {
    return {
        type: DO_DELETE_FAILED,
        payload: error
    }
}

export const doEdit = (user) => {
    return {
        type: DO_EDIT,
        payload: {user}
    }
}

export const doEditSuccess = (error) => {
    return {
        type: DO_EDIT_SUCCESS,
        payload: error
    }
}

export const doEditFailed = (error) => {
    return {
        type: DO_EDIT_FAILED,
        payload: error
    }
}


export const doAdd = (error) => {
    return {
        type: DO_ADD,
        payload: error
    }
}


export const doAddSuccess = (error) => {
    return {
        type: DO_ADD_SUCCESS,
        payload: error
    }
}


export const doAddFailed = (error) => {
    return {
        type: DO_ADD_FAILED,
        payload: error
    }
}


