import React, { Component } from "react";
import { connect } from "react-redux";
import LoginPresenter from "../../presenter/LoginPresenter";
import Login from "./Login";

const mapUserStateToComponentState = state => ({
    username: state.userState.newUser.username,
    password: state.userState.newUser.password,
    email: state.userState.newUser.email
});

function mapDispatchToProps(dispatch) {
    return {
        onChange: LoginPresenter.onChange,
        onLogin: LoginPresenter.onLogin,
        onRegister: LoginPresenter.onRegister
    };
}

class SmartLoginTable extends Component {

    constructor() {
        super();
    }

    render() {
        return (

            <div>
                <h2 className="title">
                    Login
                </h2>
                <Login
                    username={this.props.username}
                    password={this.props.password}
                    email={this.props.email}
                    onChange={this.props.onChange}
                    onLogin={this.props.onLogin}
                    onRegister={this.props.onRegister}
                />
            </div>
        );
    }
}

export default connect(mapUserStateToComponentState, mapDispatchToProps)(SmartLoginTable);