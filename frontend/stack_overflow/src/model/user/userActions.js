import { ADD_USER } from "./userActionTypes";
import { CHANGE_NEW_USER_PROPERTY } from "./userActionTypes";
import { UPDATE_SCORE } from "./userActionTypes";
import { BAN } from "./userActionTypes";
import { LOG_USER } from "./userActionTypes";
import { LOAD_USERS } from "./userActionTypes";
import RestClient from "../../rest/RestClient";
const client = new RestClient("user1", "pass1");

export function addUser(username, password, email, score, isAdmin, isBanned) {

    let payload = {
        username,
        password,
        email,
        score,
        isAdmin,
        isBanned
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

export function updateScore(user, scores) {

    let payload = {
        user,
        scores
    };

    return {
        type: UPDATE_SCORE,
        payload: payload
    }
}

export function ban(user) {
    let payload = { user: user };
    return {
        type: BAN,
        payload: payload
    }
}

export function logUser(user) {
    /*let payload = client.getLoggedUser(user.username, user.password).then(user => {
        payload = user;
        return payload;
    });*/

    let payload = {
        user
    }

    return {
        type: LOG_USER,
        payload
    };
}

export function loadUsers() {
    return {
        type: LOAD_USERS,
        payload: []
    };
}
