import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {watchUserRegister} from "../auth/register/saga";
import {DO_ADD, DO_DELETE, DO_EDIT, LIST_USER} from "./ActionTypes";
import {getListUsers, postDoDelete, postDoEdit, postDoAdd} from "../../helpers/fakebackend_helper";
import {
    listUsersSuccess, listUserFailed,
    doEditFailed, doDeleteFailed, doEditSuccess,
    doAddSuccess, doAddFailed
} from "../users/Action"


function* getUsers({payload: {user}}) {
    try {
        if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
            const response = yield call(getListUsers, '/get-list-users');
            yield put(listUsersSuccess(response));
        }
    } catch (error) {
        yield put(listUserFailed(error))
    }
}

function* doDelete({payload: {id}}) {
    try {
        if(process.env.REACT_APP_DEFAULTAUTH === "fake")
        {
            const response = yield call(postDoDelete, '/delete-user', {id: id});
            yield put(doDeleteFailed(response));
        }
    } catch (error) {
        yield put(doDeleteFailed(error))
    }
}
function* execEdit({payload: {user}}) {
    try {
        if(process.env.REACT_APP_DEFAULTAUTH === "fake")
        {
            const response = yield call(postDoEdit, '/edit-user', user);
            yield put(doEditSuccess(response));
        }
    } catch (error) {
        yield put(doEditFailed(error))
    }
}

function* execAdd({payload: {user}}) {
    try {
        if(process.env.REACT_APP_DEFAULTAUTH === "fake")
        {
            const response = yield call(postDoAdd, '/add-user', user);
            yield put(doAddSuccess(response));
        }
    } catch (error) {
        yield put(doAddFailed(error))
    }
}



export function* watchListUsers() {
    yield takeEvery(LIST_USER, getUsers)
}

export function* watchDoDelete() {
    yield takeEvery(DO_DELETE, doDelete)
}

export function* watchDoEdit() {
    yield takeEvery(DO_EDIT, execEdit)
}


export function* watchDoAdd() {
    yield takeEvery(DO_ADD, execAdd)
}

function* UsersSaga() {
    yield all([
        fork(watchListUsers),
        fork(watchDoDelete),
        fork(watchDoEdit),
        fork(watchDoAdd),
    ]);
}

export default UsersSaga;