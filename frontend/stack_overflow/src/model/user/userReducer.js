import { ADD_USER } from "./userActionTypes";
import { CHANGE_NEW_USER_PROPERTY } from "./userActionTypes";
import { UPDATE_SCORE } from "./userActionTypes";
import { BAN } from "./userActionTypes";
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
        case UPDATE_SCORE:
            return updateScore(state, action.payload);
        case BAN:
            return ban(state, action.payload);
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

function updateScore(state, payload) {

    let oldUser = state.users.filter(u => u.id == payload.user.id);
    let index = state.users.indexOf(oldUser[0]);
    let users = state.users.concat([]);

    users[index] = {
        ...state.users[index],
        score: state.users[index].score + payload.scores
    };

    let newState = {
        ...state,
        users: users
    };
    
    return newState;
}

function ban(state, payload) {
    let index = state.users.indexOf(payload.user);
    let users = state.users.concat([]);

    users[index] = {
        ...state.users[index],
        isBanned: true
    };

    let newState = {
        ...state,
        users: users
    }
    return newState;
}

function logUser(state, payload) {
    let newState = {
        ...state,
        loggedUser: {
            id: payload.user.id,
            username: payload.user.username,
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