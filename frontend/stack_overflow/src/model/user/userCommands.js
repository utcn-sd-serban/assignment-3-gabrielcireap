import * as userTypes from "../user/userActionTypes";
import { findById as findUserById } from "../user/userSelectors";
import { dispatch } from "../store/store";

export class AddUserCommand {
    constructor(user) {
        this.user = user;
    }

    execute() {
        dispatch({
            type: userTypes.ADD_USER,
            payload: {
                user: this.user
            }
        });
    }

    undo() {

    }
}

export class ChangeNewUserPropertyCommand {
    constructor(property, value) {
        this.property = property;
        this.value = value;
    }

    execute() {
        dispatch({
            type: userTypes.CHANGE_NEW_USER_PROPERTY,
            payload: {
                property: this.property,
                value: this.value
            }
        });
    }

    undo() {
        dispatch({
            type: userTypes.CHANGE_NEW_USER_PROPERTY,
            payload: {
                property: this.property,
                value: ""
            }
        });
    }
}

export class EditUserCommand {
    constructor(user) {
        this.user = user;
        this.oldUser = findUserById(user.id);
    }

    execute() {
        dispatch({
            type: userTypes.UPDATE_USER,
            payload: {
                user: this.user
            }
        });
    }

    undo() {
        dispatch({
            type: userTypes.UPDATE_USER,
            payload: {
                oldUser: this.oldUser
            }
        });
    }
}

export class LogUserCommand {
    constructor(user) {
        this.user = user;
    }

    execute() {
        dispatch({
            type: userTypes.LOG_USER,
            payload: {
                user: this.user
            }
        });
    }

    undo() {

    }
}

export class LoadUsersCommand {
    constructor(users) {
        this.users = users;
    }

    execute() {
        dispatch({
            type: userTypes.LOAD_USERS,
            payload: {
                users: this.users
            }
        });
    }

    undo() {
        dispatch({
            type: userTypes.LOAD_USERS,
            payload: {
                users: []
            }
        });
    }
}