import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionsTable from "./QuestionsTable";
import QuestionSearchTagPresenter from "../../presenter/QuestionSearchTagPresenter";
import QuestionSearchByTag from "./QuestionSearchByTitle";
import { toString as userToString } from "../../model/user/userSelectors";
import { toString as tagToString } from "../../model/tag/tagSelectors";

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
        onDownvoteQuestion: QuestionSearchTagPresenter.onDownvoteQuestion
    };
}

class SmartQuestionSearchByTag extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        QuestionSearchTagPresenter.onInit();
    }

    render() {
        return (

            <div className="container" className="has-background-light">
                <h2 className="title">
                    Search Questions by Tag
                </h2>

                <QuestionSearchByTag
                    title={this.props.title}
                    onChange={this.props.onChange}
                    onSearch={this.props.onSearch}
                />

                <QuestionsTable
                    questions={this.props.searchedQuestions}
                    onAnswer={this.props.onAnswer}
                    onDeleteQuestion={this.props.onDeleteQuestion}
                    onUpvoteQuestion={this.props.onUpvoteQuestion}
                    onDownvoteQuestion={this.props.onDownvoteQuestion}
                    userToString={userToString}
                    tagToString={tagToString}
                />
            </div>
        );
    }
}

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartQuestionSearchByTag);