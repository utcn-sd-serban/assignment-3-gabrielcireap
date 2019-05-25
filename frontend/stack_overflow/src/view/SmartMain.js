import Main from "./Main";
import React, { Component } from "react";
import { connect } from "react-redux";
import MainPresenter from "../presenter/MainPresenter";
import { toString as userToString } from "../model/user/userSelectors";

const mapMainStateToComponentState = (state)=> ({
    users: state.userState.users,
    loggedUser: state.userState.loggedUser,
    questions: state.questionState.questions
});

function mapDispatchToProps(dispatch) {
    return {
        onBan: MainPresenter.onBan,
        onAskQuestion: MainPresenter.onAskQuestion,
        onSearchQuestionTitle: MainPresenter.onSearchQuestionTitle,
        onSearchQuestionTag: MainPresenter.onSearchQuestionTag,
        onAnswer: MainPresenter.onAnswer,
        onDeleteQuestion: MainPresenter.onDeleteQuestion,
        onUpvoteQuestion: MainPresenter.onUpvoteQuestion,
        onDownvoteQuestion: MainPresenter.onDownvoteQuestion,
        onUndo: MainPresenter.onUndo,
        onRedo: MainPresenter.onRedo
    };
}

class SmartMain extends Component {

    componentDidMount() {
        MainPresenter.onInit();
    }

    render() {
        return (
            <Main
                questions={this.props.questions}
                users={this.props.users}
                loggedUser={this.props.loggedUser}
                onBan={this.props.onBan}
                onAskQuestion={this.props.onAskQuestion}
                onSearchQuestionTitle={this.props.onSearchQuestionTitle}
                onSearchQuestionTag={this.props.onSearchQuestionTag}
                onAnswer={this.props.onAnswer}
                onDeleteQuestion={this.props.onDeleteQuestion}
                onUpvoteQuestion={this.props.onUpvoteQuestion}
                onDownvoteQuestion={this.props.onDownvoteQuestion}
                onUndo={this.props.onUndo}
                onRedo={this.props.onRedo}
                userToString={userToString}
            />
        );
    }
}

export default connect(mapMainStateToComponentState, mapDispatchToProps)(SmartMain);