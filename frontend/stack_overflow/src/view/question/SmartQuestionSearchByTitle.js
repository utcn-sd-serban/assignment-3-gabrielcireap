import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionsTable from "./QuestionsTable";
import QuestionSearchPresenter from "../../presenter/QuestionSearchPresenter";
import MainPresenter from "../../presenter/MainPresenter";
import QuestionSearchByTitle from "./QuestionSearchByTitle";
import { toString as userToString } from "../../model/user/userSelectors";

const mapQuestionStateToComponentState = state => ({
    searchedQuestions: state.questionState.searchedQuestions
});

function mapDispatchToProps(dispatch) {
    return {
        onChange: QuestionSearchPresenter.onChange,
        onSearch: QuestionSearchPresenter.onSearch,
        onAnswer: QuestionSearchPresenter.onAnswer,
        onDeleteQuestion: QuestionSearchPresenter.onDeleteQuestion,
        onUpvoteQuestion: QuestionSearchPresenter.onUpvoteQuestion,
        onDownvoteQuestion: QuestionSearchPresenter.onDownvoteQuestion,
        onUndo: MainPresenter.onUndo,
        onRedo: MainPresenter.onRedo
    };
}

class SmartQuestionsSearchByTitle extends Component {

    componentDidUpdate() {
        QuestionSearchPresenter.onInit();
    }

    render() {
        return (

            <div className="container">

                <QuestionSearchByTitle
                    title={this.props.title}
                    onChange={this.props.onChange}
                    onSearch={this.props.onSearch}
                    onUndo={this.props.onUndo}
                    onRedo={this.props.onRedo}
                />

                <QuestionsTable
                    questions={this.props.searchedQuestions}
                    onAnswer={this.props.onAnswer}
                    onDeleteQuestion={this.props.onDeleteQuestion}
                    onUpvoteQuestion={this.props.onUpvoteQuestion}
                    onDownvoteQuestion={this.props.onDownvoteQuestion}
                    userToString={userToString}
                />
            </div>
        );
    }
}

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartQuestionsSearchByTitle);