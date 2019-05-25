import React, { Component } from "react";
import App from "./App";
import AppPresenter from "./presenter/AppPresenter";

export default class SmartApp extends Component {

    componentDidMount() {
        AppPresenter.onInit();
    }

    render() {
        return (
            <App/>
        );
    }
}