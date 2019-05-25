import { dispatch } from "../store/store";
import * as answerTypes from "../answer/answerActionTypes";
import { findById as findAnswerById } from "../answer/answerSelectors";

export class AddAnswerCommand {
    constructor(answer) {
        this.answer = answer;
    }

    execute() {
        dispatch({
            type: answerTypes.ADD_ANSWER,
            payload: {
                answer: this.answer
            }
        });
    }

    undo() {
        dispatch({
            type: answerTypes.DELETE_ANSWER,
            payload: {
                answer: this.answer
            }
        });
    }
}

export class ChangeNewAnswerPropertyCommand {
    constructor(property, value) {
        this.property = property;
        this.value = value;
    }

    execute() {
        dispatch({
            type: answerTypes.CHANGE_NEW_ANSWER_PROPERTIES,
            payload: {
                property: this.property,
                value: this.value
            }
        });
    }

    undo() {
        dispatch({
            type: answerTypes.CHANGE_NEW_ANSWER_PROPERTIES,
            payload: {
                property: this.property,
                value: ""
            }
        });
    }
}

export class EditAnswerCommand {
    constructor(answer) {
        this.answer = answer;
        this.oldAnswer = findAnswerById(answer.id);
    }

    execute() {
        dispatch({
            type: answerTypes.EDIT_ANSWER,
            payload: {
                answer: this.answer
            }
        });
    }

    undo() {
        dispatch({
            type: answerTypes.ADD_ANSWER,
            payload: {
                oldAnswer: this.oldAnswer
            }
        });
    }
}

export class DeleteAnswerCommand {
    constructor(answer) {
        this.answer = answer;
    }

    execute() {
        dispatch({
            type: answerTypes.DELETE_ANSWER,
            payload: {
                answer: this.answer
            }
        });
    }

    undo() {
        dispatch({
            type: answerTypes.ADD_ANSWER,
            payload: {
                answer: this.answer
            }
        });
    }
}

export class LoadAnswersCommand {
    constructor(answers) {
        this.answers = answers;
    }

    execute() {
        dispatch({
            type: answerTypes.LOAD_ANSWERS,
            payload: {
                answers: this.answers
            }
        });
    }

    undo() {
        dispatch({
            type: answerTypes.LOAD_ANSWERS,
            payload: {
                answers: []
            }
        });
    }
}

export class LoadAnswersByQuestionCommand {
    constructor(answers) {
        this.answers = answers;
    }

    execute() {
        dispatch({
            type: answerTypes.FIND_ANSWERS_BY_QUESTION,
            payload: {
                answers: this.answers
            }
        });
    }

    undo() {
        dispatch({
            type: answerTypes.FIND_ANSWERS_BY_QUESTION,
            payload: {
                answers: []
            }
        });
    }
}
