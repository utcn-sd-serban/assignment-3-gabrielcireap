import { ADD_USER } from "./userActionTypes";
import { CHANGE_NEW_USER_PROPERTY } from "./userActionTypes";
import { UPDATE_USER } from "./userActionTypes";
import { LOG_USER } from "./userActionTypes";
import { LOAD_USERS } from "./userActionTypes";

const initialState = {
    users: [],
    newUser: {
        id: 3,
        username: "",
        password: "",
        email: "",
        score: 0,
        isAdmin: false,
        isBanned: false,
    },

    loggedUser: {
        id: "",
        username: "",
        password: "",
        isAdmin: "",
        isBanned: "",
        score: ""
    }
};

function userReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_USER:
            return addUser(state, action.payload);
        case CHANGE_NEW_USER_PROPERTY:
            return changeNewUserProperty(state, action.payload);
        case UPDATE_USER:
            return update(state, action.payload);
        case LOG_USER:
            return logUser(state, action.payload);
        case LOAD_USERS:
            return loadUsers(state, action.payload);
    }
    return state;
};

function addUser(state, payload) {

    let users = state.users.concat([{
        id: payload.id,
        username: payload.username,
        password: payload.password,
        email: payload.email,
        score: payload.score,
        isAdmin: payload.isAdmin,
        isBanned: payload.isBanned
    }]);

    let newState = {
        ...state,
        users
    };
   
    return newState;
}

function changeNewUserProperty(state, payload) {
    let newState = {
        ...state,
        newUser: {
            ...state.newUser,
            [payload.property]: payload.value
        }
    };
    return newState;
}

function update(state, payload) {
    let oldUser = state.users.filter(user => user.id == payload.user.id)[0];
    let newUser = {
        id: payload.user.id,
        username: payload.user.username,
        password: oldUser.password,
        email: oldUser.email,
        score: payload.user.score,
        isAdmin: payload.user.isAdmin,
        isBanned: payload.user.isBanned,
    };

    let allUsers = state.users.concat([]);
    allUsers[state.users.indexOf(oldUser)] = newUser;
    let newState = {
        ...state,
        users: allUsers
    }

    return newState;
}

function logUser(state, payload) {
    let newState = {
        ...state,
        loggedUser: {
            id: payload.user.id,
            username: payload.user.username,
            password: payload.user.password,
            isAdmin: payload.user.isAdmin,
            isBanned: payload.user.isBanned,
            score: payload.user.score
        }
    }
    return newState;
}

function loadUsers(state, payload) {
    let newState = {
        ...state,
        users: payload.users
    };
    return newState;
}

export default userReducer;