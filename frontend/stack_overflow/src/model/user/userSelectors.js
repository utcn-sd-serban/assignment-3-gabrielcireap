import store from "../store/store";

export function getLoggedUser() {
    let userState = store.getState().userState;
    return userState.loggedUser;
};

export function getNewUser() {
    return store.getState().userState.newUser;
};

export function login(username, password) {
    let users = store.getState().userState.users;
    return users.filter(user => user.username === username && user.password === password);
}

export function findById(id) {
    let users = store.getState().userState.users;
    return users.filter(user => user.id === id)[0];
}

export function toString(user) {
    return "User(" + user.username + ", " + user.score + ", " + (user.isAdmin === true ? "admin" : "non-admin") +
        ", " + (user.isBanned === true ? "banned" : "not banned") + ")";
}