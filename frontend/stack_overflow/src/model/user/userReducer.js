import { ADD_USER } from "./userActionTypes";
import { CHANGE_NEW_USER_PROPERTY } from "./userActionTypes";
import { UPDATE_SCORE } from "./userActionTypes";
import { BAN } from "./userActionTypes";
import { LOG_USER } from "./userActionTypes";
import { LOAD_USERS } from "./userActionTypes";
import RestClient from "../../rest/UserRestClient";

const initialState = {
    users: [{
        id: 1,
        username: "user1",
        password: "pass1",
        email: "email1",
        score: 0,
        isAdmin: true,
        isBanned: false,
    }],
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
        id: 1,
        username: "user1",
        password: "pass1",
        email: "email1",
        score: 0,
        isAdmin: true,
        isBanned: false,
    }
};
const client = new RestClient("user1", "pass1");

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
            return loadUsers(state);
    }
    return state;
};

function addUser(state, payload) {

    let users = state.users.concat([{
        id: state.currentIndex,
        username: payload.username,
        password: payload.password,
        email: payload.email,
        score: payload.score,
        isAdmin: payload.isAdmin,
        isBanned: payload.isBanned
    }]);

    let newState = {
        ...state,
        users: users,
        currentIndex: state.currentIndex + 1
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
        loggedUser: payload.user
    }
    return newState;
}

function loadUsers(state) {
    let newState;
    console.log(state);
    return client.loadUsers().then(users => {
        newState = {
            ...state,
            users
        };
        console.log(newState);
        return newState;
    });
}

export default userReducer;