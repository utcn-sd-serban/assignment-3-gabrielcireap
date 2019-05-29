import { getLoggedUser } from "../model/user/userSelectors";

class AppPresenter {
    onInit() {
        let loggedUser = getLoggedUser();
        if (loggedUser.username === undefined ||
            loggedUser.username === "") {
            window.location.assign("#/");
        }
    }
}

export default new AppPresenter();