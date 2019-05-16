import store from "../model/store/store";
import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import UserRestClient from "../rest/UserRestClient";
const userClient = new UserRestClient("user1", "pass1");

class LoginPresenter {

    onLogin() {

        let newUser = userSelectors.getNewUser();       
        userClient.login(newUser.username, newUser.password).then(user => {
                store.dispatch(userActions.logUser(user));
                window.location.assign("#/index");
        });
        
        store.dispatch(userActions.changeNewUserProperty("username", ""));
        store.dispatch(userActions.changeNewUserProperty("password", ""));
        store.dispatch(userActions.changeNewUserProperty("email", ""));
    }

    onRegister() {

        let newUser = userSelectors.getNewUser();
        userClient.register(newUser.username, newUser.password, newUser.email).then(user => {
            store.dispatch(userActions.addUser(user));
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