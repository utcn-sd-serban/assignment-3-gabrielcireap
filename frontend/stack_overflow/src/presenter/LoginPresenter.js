import store from "../model/store/store";
import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import UserRestClient from "../rest/UserRestClient";
const userClient = new UserRestClient("user1", "pass1");

class LoginPresenter {

    onLogin() {
        var newUser = userSelectors.getNewUser();
        userClient.login(newUser.username, newUser.password).then(user => {
            if (user.type !== undefined) {
                window.alert(user.type);
            } else {
                let logUser = {
                    id: user.id,
                    username: newUser.username,
                    password: newUser.password,
                    isAdmin: user.isAdmin,
                    isBanned: user.isBanned,
                    score: user.score
                }

                store.dispatch(userActions.logUser(logUser));
                window.location.assign("#/index");
            }
        });
        
        store.dispatch(userActions.changeNewUserProperty("username", ""));
        store.dispatch(userActions.changeNewUserProperty("password", ""));
        store.dispatch(userActions.changeNewUserProperty("email", ""));
    }

    onRegister() {
        let newUser = userSelectors.getNewUser();
        userClient.register(newUser.username, newUser.password, newUser.email).then(status => {
            if (status >= 300) {
                window.alert("User already registered!");
            }
        });
        
        store.dispatch(userActions.changeNewUserProperty("username", ""));
        store.dispatch(userActions.changeNewUserProperty("password", ""));
        store.dispatch(userActions.changeNewUserProperty("email", ""));
    }

    onChange(property, value) {
        store.dispatch(userActions.changeNewUserProperty(property, value));
    }
}

const loginPresenter = new LoginPresenter();
export default loginPresenter;