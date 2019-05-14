import { ADD_ANSWER } from "./answerActionTypes.js";
import { CHANGE_NEW_ANSWER_PROPERTIES } from "./answerActionTypes.js";
import { DELETE_ANSWER } from "./answerActionTypes.js";
import { EDIT_ANSWER } from "./answerActionTypes.js";
import { UPVOTE_ANSWER } from "./answerActionTypes.js";
import { DOWNVOTE_ANSWER } from "./answerActionTypes.js";
import { FIND_ANSWERS_BY_QUESTION } from "./answerActionTypes";

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
            return sort(addAnswer(state, action.payload));
        case CHANGE_NEW_ANSWER_PROPERTIES:
            return changeNewAnswerProperty(state, action.payload);
        case DELETE_ANSWER:
            return sort(deleteAnswer(state, action.payload));
        case EDIT_ANSWER:
            return editAnswer(state, action.payload);
        case UPVOTE_ANSWER:
            return sort(upvote(state, action.payload));
        case DOWNVOTE_ANSWER:
            return sort(downvote(state, action.payload));
        case FIND_ANSWERS_BY_QUESTION:
            return findByQuestion(state, action.payload);
    }
    return state;
};

function addAnswer(state, payload) {
    let newState = {
        ...state,
        answers: state.answers.concat([payload.answer]),
        currentIndex: state.currentIndex + 1
    };

    return newState;
}

function editAnswer(state, payload) {
    let oldAnswer = state.answers.filter(a => a.id === payload.answer.id)[0];
    let index = state.answers.indexOf(oldAnswer);
    let answers = state.answers.concat([]);
    answers[index] = {
        ...state.answers[index],
        text: payload.answer.text
    }

    let newState = {
        ...state,
        answers
    }

    return newState;
}

function deleteAnswer(state, payload) {
    let index = state.answers.indexOf(payload.answer);
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

function upvote(state, payload) {
    let index = state.answers.indexOf(payload.answer);
    let answers = state.answers.concat([]);
    answers[index] = {
        ...state.answers[index],
        voteCount: state.answers[index].voteCount + payload.count
    }

    let newState = {
        ...state,
        answers
    }

    return newState;
}

function downvote(state, payload) {
    let index = state.answers.indexOf(payload.answer);
    let answers = state.answers.concat([]);
    answers[index] = {
        ...state.answers[index],
        voteCount: state.answers[index].voteCount - payload.count
    }

    let newState = {
        ...state,
        answers
    }

    return newState;
}

function sort(state) {

    let newAnswers = state.answers.concat([]);
    newAnswers.sort((a, b) => (a.voteCount < b.voteCount) ? 1 : ((b.voteCount < a.voteCount) ? -1 : 0));
    let newState = {
        ...state,
        answers: newAnswers
    };
    return newState;
}

function findByQuestion(state, payload) {
    return {
        ...state,
        answersByQuestion: payload.answers
    };
}

export default answerReducer;