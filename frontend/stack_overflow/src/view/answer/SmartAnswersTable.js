import React, { Component } from "react";
import { connect } from "react-redux";
import AnswersTable from "./AnswersTable";
import AnswersInput from "./AnswersInput";
import AnswersTablePresenter from "../../presenter/AnswersTablePresenter";
import MainPresenter from "../../presenter/MainPresenter";
import { toString as userToString } from "../../model/user/userSelectors";
import { toString as questionToString } from "../../model/question/questionSelectors";
import { findById } from "../../model/question/questionSelectors";
import { findByQuestion } from "../../model/answer/answerSelectors";

const mapAnswerStateToComponentState = (state, props) => ({
    selectedQuestion: findById(props.match.params.id),
    answers: findByQuestion(props.match.params.id),
    text: state.answerState.newAnswer.text
});

function mapDispatchToProps(dispatch) {
    return {
        onChange: AnswersTablePresenter.onChange,
        onCreate: AnswersTablePresenter.onCreate,
        onEditAnswer: AnswersTablePresenter.onEditAnswer,
        onDeleteAnswer: AnswersTablePresenter.onDeleteAnswer,
        onUpvoteAnswer: AnswersTablePresenter.onUpvoteAnswer,
        onDownvoteAnswer: AnswersTablePresenter.onDownvoteAnswer,
        onUndo: MainPresenter.onUndo,
        onRedo: MainPresenter.onRedo
    };
}

class SmartAnswersTable extends Component {
 
    componentDidMount() {
        AnswersTablePresenter.onInit();
    }

    render() {
        return (
            <div className="container">
                <AnswersInput
                    text={this.props.text}
                    currentQuestion={this.props.selectedQuestion}
                    onChange={this.props.onChange}
                    onCreate={this.props.onCreate}
                    onUndo={this.props.onUndo}
                    onRedo={this.props.onRedo}
                />

                <AnswersTable
                    answers={this.props.answers}
                    onEditAnswer={this.props.onEditAnswer}
                    onDeleteAnswer={this.props.onDeleteAnswer}
                    onUpvoteAnswer={this.props.onUpvoteAnswer}
                    onDownvoteAnswer={this.props.onDownvoteAnswer}
                    userToString={userToString}
                    questionToString={questionToString}
                />
            </div>
        );
    }
}

export default connect(mapAnswerStateToComponentState, mapDispatchToProps)(SmartAnswersTable);