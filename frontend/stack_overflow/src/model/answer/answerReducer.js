import { ADD_ANSWER } from "./answerActionTypes.js";
import { CHANGE_NEW_ANSWER_PROPERTIES } from "./answerActionTypes.js";
import { DELETE_ANSWER } from "./answerActionTypes.js";
import { EDIT_ANSWER } from "./answerActionTypes.js";
import { FIND_ANSWERS_BY_QUESTION } from "./answerActionTypes";
import { LOAD_ANSWERS } from "./answerActionTypes";

const initialState = {
    answers: [],
    newAnswer: {
        id: "",
        user: "",
        question: "",
        text: "",
        creationDate: "",
        voteCount: ""
    },
    answersByQuestion: []
};

function answerReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_ANSWER:
            return addAnswer(state, action.payload);
        case CHANGE_NEW_ANSWER_PROPERTIES:
            return changeNewAnswerProperty(state, action.payload);
        case DELETE_ANSWER:
            return deleteAnswer(state, action.payload);
        case EDIT_ANSWER:
            return editAnswer(state, action.payload);
        case FIND_ANSWERS_BY_QUESTION:
            return findByQuestion(state, action.payload);
        case LOAD_ANSWERS:
            return loadAnswers(state, action.payload);
    }
    return state;
};

function addAnswer(state, payload) {
    let newState = {
        ...state,
        answers: state.answers.concat([payload.answer])
    };

    return newState;
}

function editAnswer(state, payload) {
    let oldAnswer = state.answers.filter(a => a.id == payload.answer.id)[0];
    let index = state.answers.indexOf(oldAnswer);
    let answers = state.answers.concat([]);
    answers[index] = {
        ...state.answers[index],
        text: payload.answer.text,
        voteCount: payload.answer.voteCount
    }

    let newState = {
        ...state,
        answers
    }

    return newState;
}

function deleteAnswer(state, payload) {
    let oldAnswer = state.answers.filter(answer => answer.id == payload.answer.id)[0];
    let index = state.answers.indexOf(oldAnswer);
    let answers = state.answers.concat([]);
    answers.splice(index, 1);

    let newState = {
        ...state,
        answers
    }

    return newState;
}

function changeNewAnswerProperty(state, payload) {
    let newState = {
        ...state,
        newAnswer: {
            ...state.newAnswer,
            [payload.property]: payload.value
        }
    };

    return newState;
}

function findByQuestion(state, payload) {
    return {
        ...state,
        answersByQuestion: payload.answers
    };
}

function loadAnswers(state, payload) {
    return {
        ...state,
        answers: payload.answers
    };
}

export default answerReducer;