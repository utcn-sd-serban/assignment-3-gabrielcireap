import invoker from "../model/command/Invoker";
import { LogUserCommand, ChangeNewUserPropertyCommand } from "../model/user/userCommands";
import * as userSelectors from "../model/user/userSelectors";
import UserRestClient from "../rest/UserRestClient";
const userClient = new UserRestClient("", "");

class LoginPresenter {

    onLogin() {
        var newUser = userSelectors.getNewUser();
        userClient.login(newUser.username, newUser.password).then(user => {
            if (user.username === undefined) {
                window.alert("Username not found!");
            } else {
                let logUser = {
                    id: user.id,
                    username: newUser.username,
                    password: newUser.password,
                    isAdmin: user.isAdmin,
                    isBanned: user.isBanned,
                    score: user.score
                }
                debugger;
                invoker.execute(new LogUserCommand(logUser));
                window.location.assign("#/index");
            }
        });

        invoker.execute(new ChangeNewUserPropertyCommand("username", ""));
        invoker.execute(new ChangeNewUserPropertyCommand("password", ""));
        invoker.execute(new ChangeNewUserPropertyCommand("email", ""));
    }

    onRegister() {
        let newUser = userSelectors.getNewUser();
        userClient.register(newUser.username, newUser.password, newUser.email).then(status => {
            if (status >= 300) {
                window.alert("User already registered!");
            }
        });

        invoker.execute(new ChangeNewUserPropertyCommand("username", ""));
        invoker.execute(new ChangeNewUserPropertyCommand("password", ""));
        invoker.execute(new ChangeNewUserPropertyCommand("email", ""));
    }

    onChange(property, value) {
        invoker.execute(new ChangeNewUserPropertyCommand(property, value));
    }
}

const loginPresenter = new LoginPresenter();
export default loginPresenter;