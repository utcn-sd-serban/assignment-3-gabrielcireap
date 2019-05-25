import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionsTable from "./QuestionsTable";
import QuestionsInput from "./QuestionsInput";
import QuestionsTablePresenter from "../../presenter/QuestionsTablePresenter";
import MainPresenter from "../../presenter/MainPresenter";
import { toString as userToString } from "../../model/user/userSelectors";

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
        onDownvoteQuestion: QuestionsTablePresenter.onDownvoteQuestion,
        onUndo: MainPresenter.onUndo,
        onRedo: MainPresenter.onRedo
    };
}

class SmartQuestionsTable extends Component {

    componentDidMount() {
        QuestionsTablePresenter.onInit();
    }

    render() {
        return (

            <div className="container">

                <QuestionsInput
                    title={this.props.title}
                    text={this.props.text}
                    tags={this.props.tags}
                    onChange={this.props.onChange}
                    onCreate={this.props.onCreate}
                    onEditQuestion={this.props.onEditQuestion}
                    onUndo={this.props.onUndo}
                    onRedo={this.props.onRedo}
                />

                <QuestionsTable
                    questions={this.props.questions}
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

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartQuestionsTable);