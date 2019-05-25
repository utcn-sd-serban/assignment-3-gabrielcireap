import { dispatch } from "../store/store";
import * as questionTypes from "../question/questionActionTypes";
import { findById as findQuestionById } from "../question/questionSelectors";

export class AddQuestionCommand {

    constructor(question) {
        this.question = question;
    }

    execute() {
        dispatch({
            type: questionTypes.ADD_QUESTION,
            payload: {
                question: this.question
            }
        });
    }

    undo() {
        dispatch({
            type: questionTypes.DELETE_QUESTION,
            payload: {
                question: this.question
            }
        });
    }
}

export class DeleteQuestionCommand {
    constructor(question) {
        this.question = question;
    }

    execute() {
        dispatch({
            type: questionTypes.DELETE_QUESTION,
            payload: {
                question: this.question
            }
        });
    }

    undo() {
        dispatch({
            type: questionTypes.ADD_QUESTION,
            payload: {
                question: this.question
            }
        });
    }
}

export class EditQuestionCommand {
    constructor(question) {
        this.question = question;
        this.oldQuestion = findQuestionById(question.id);
    }

    execute() {
        dispatch({
            type: questionTypes.EDIT_QUESTION,
            payload: {
                question: this.question
            }
        });
    }

    undo() {
        dispatch({
            type: questionTypes.EDIT_QUESTION,
            payload: {
                oldQuestion: this.oldQuestion
            }
        });
    }
}

export class ChangeNewQuestionPropertyCommand {
    constructor(property, value) {
        this.property = property;
        this.value = value;
    }

    execute() {
        dispatch({
            type: questionTypes.CHANGE_NEW_QUESTION_PROPERTIES,
            payload: {
                property: this.property,
                value: this.value
            }
        });
    }

    undo() {
        dispatch({
            type: questionTypes.CHANGE_NEW_QUESTION_PROPERTIES,
            payload: {
                property: this.property,
                value: ""
            }
        });
    }
}

export class SaveSearchedQuestionsCommand {
    constructor(questions) {
        this.questions = questions;
    }

    execute() {
        dispatch({
            type: questionTypes.SEARCH_QUESTION,
            payload: {
                questions: this.questions
            }
        });
    }

    undo() {
        dispatch({
            type: questionTypes.SEARCH_QUESTION,
            payload: {
                questions: []
            }
        });
    }
}

export class LoadQuestionsCommand {
    constructor(questions) {
        this.questions = questions;
    }

    execute() {
        dispatch({
            type: questionTypes.LOAD_QUESTIONS,
            payload: {
                questions: this.questions
            }
        });
    }

    undo() {
        dispatch({
            type: questionTypes.LOAD_QUESTIONS,
            payload: {
                questions: []
            }
        });
    }
}