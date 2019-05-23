import { ADD_USER } from "./userActionTypes";
import { CHANGE_NEW_USER_PROPERTY } from "./userActionTypes";
import { UPDATE_USER } from "./userActionTypes";
import { LOG_USER } from "./userActionTypes";
import { LOAD_USERS } from "./userActionTypes";

export function addUser(user) {

    let payload = {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        score: user.score,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned
    };

    return {
        type: ADD_USER,
        payload
    };
}

export function changeNewUserProperty(property, value) {

    let payload = {
        property,
        value
    };

    return {
        type: CHANGE_NEW_USER_PROPERTY,
        payload: payload
    }
}

export function update(user) {
    let payload = {
        user
    }

    return {
        type: UPDATE_USER,
        payload
    };
}

export function logUser(user) {
    let payload = {
        user
    }

    return {
        type: LOG_USER,
        payload
    };
}

export function loadUsers(users) {
    return {
        type: LOAD_USERS,
        payload: {
            users
        }
    };
}
