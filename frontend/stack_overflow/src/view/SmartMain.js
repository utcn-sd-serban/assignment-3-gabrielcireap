import Main from "./Main";
import React, { Component } from "react";
import { connect } from "react-redux";
import MainPresenter from "../presenter/MainPresenter";
import { toString as userToString } from "../model/user/userSelectors";
import { toString as tagToString } from "../model/tag/tagSelectors";

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
        onDownvoteQuestion: MainPresenter.onDownvoteQuestion
    };
}

class SmartMain extends Component {
    constructor() {
        super();
    }

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
                userToString={userToString}
                tagToString={tagToString}
            />
        );
    }
}

export default connect(mapMainStateToComponentState, mapDispatchToProps)(SmartMain);