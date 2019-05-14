class UsersTablePresenter {

    onCreate() {
        user.addUser(
            user.state.newUser.username,
            user.state.newUser.password,
            user.state.newUser.email,
            user.state.newUser.score,
            user.state.newUser.isAdmin,
            user.state.newUser.isBanned
        );
        user.changeNewUserProperty("username", "");
        user.changeNewUserProperty("lastname", "");
        user.changeNewUserProperty("email", "");
        user.changeNewUserProperty("score", "");
        user.changeNewUserProperty("isAdmin", "");
        user.changeNewUserProperty("isBanned", "");
    }

    onChange(property, value) {
        user.changeNewUserProperty(property, value);
    }
}

const usersTablePresenter = new UsersTablePresenter();
export default usersTablePresenter;