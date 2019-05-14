import store from "../model/store/store";
import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";

class LoginPresenter {

    onLogin() {

        let newUser = userSelectors.getNewUser();
        let currentUser = userSelectors.login(newUser.username, newUser.password);
        console.log("current user = " + currentUser);
        if (currentUser.length > 0) {
            if (currentUser[0].isBanned === true) {
                window.alert("User has been banned!");
            } else {
                store.dispatch(userActions.logUser(currentUser[0]));
                window.location.assign("#/index");
            }
        } else {
            window.alert("Account does not exist!");
        }
        
        store.dispatch(userActions.changeNewUserProperty("username", ""));
        store.dispatch(userActions.changeNewUserProperty("password", ""));
        store.dispatch(userActions.changeNewUserProperty("email", ""));
    }

    onRegister() {

        let newUser = userSelectors.getNewUser();
        let currentUser = userSelectors .login(newUser.username, newUser.password);
        if (currentUser.length > 0) {
            window.alert("User already exists!");
        } else {
            store.dispatch(userActions.addUser(newUser.username, newUser.password, newUser.email, 0, false, false));
        }
        
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