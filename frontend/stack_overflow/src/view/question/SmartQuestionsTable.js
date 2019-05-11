import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionsTable from "./QuestionsTable";
import QuestionsInput from "./QuestionsInput";
import QuestionsTablePresenter from "../../presenter/QuestionsTablePresenter";
import { toString as userToString } from "../../model/user/userSelectors";
import { toString as tagToString} from "../../model/tag/tagSelectors";

const mapQuestionStateToComponentState = state => {
    return {
        questions: state.questionState.questions,
        title: state.questionState.newQuestion.title,
        text: state.questionState.newQuestion.text,
        tags: state.questionState.newQuestion.tags
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onCreate: QuestionsTablePresenter.onCreate,
        onChange: QuestionsTablePresenter.onChange,
        onAnswer: QuestionsTablePresenter.onAnswer,
        onEditQuestion: QuestionsTablePresenter.onEditQuestion,
        onDeleteQuestion: QuestionsTablePresenter.onDeleteQuestion,
        onUpvoteQuestion: QuestionsTablePresenter.onUpvoteQuestion,
        onDownvoteQuestion: QuestionsTablePresenter.onDownvoteQuestion
    };
}

class SmartQuestionsTable extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        QuestionsTablePresenter.onInit();
    }

    render() {
        return (

            <div className="has-background-light" className="container">

                <h2 className="title">
                    Ask Questions
                </h2>

                <QuestionsInput
                    title={this.props.title}
                    text={this.props.text}
                    tags={this.props.tags}
                    onChange={this.props.onChange}
                    onCreate={this.props.onCreate}
                    onEditQuestion={this.props.onEditQuestion}
                />

                <QuestionsTable
                    questions={this.props.questions}
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

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartQuestionsTable);