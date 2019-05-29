import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionsTable from "./QuestionsTable";
import QuestionSearchTagPresenter from "../../presenter/QuestionSearchTagPresenter";
import MainPresenter from "../../presenter/MainPresenter";
import QuestionSearchByTag from "./QuestionSearchByTitle";
import { toString as userToString } from "../../model/user/userSelectors";

const mapQuestionStateToComponentState = state => ({
    searchedQuestions: state.questionState.searchedQuestions,
    title: state.questionState.newQuestion.title
});

function mapDispatchToProps(dispatch) {
    return {
        onChange: QuestionSearchTagPresenter.onChange,
        onSearch: QuestionSearchTagPresenter.onSearch,
        onAnswer: QuestionSearchTagPresenter.onAnswer,
        onDeleteQuestion: QuestionSearchTagPresenter.onDeleteQuestion,
        onUpvoteQuestion: QuestionSearchTagPresenter.onUpvoteQuestion,
        onDownvoteQuestion: QuestionSearchTagPresenter.onDownvoteQuestion,
        onUndo: MainPresenter.onUndo,
        onRedo: MainPresenter.onRedo
    };
}

class SmartQuestionSearchByTag extends Component {

    componentDidMount() {
        QuestionSearchTagPresenter.onInit();
    }

    render() {
        return (

            <div className="container">

                <QuestionSearchByTag
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

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartQuestionSearchByTag);