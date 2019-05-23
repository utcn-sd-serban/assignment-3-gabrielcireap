import { ADD_QUESTION } from "./questionActionTypes";
import { CHANGE_NEW_QUESTION_PROPERTIES } from "./questionActionTypes";
import { DELETE_QUESTION } from "./questionActionTypes";
import { EDIT_QUESTION } from "./questionActionTypes";
import { SEARCH_QUESTION } from "./questionActionTypes";
import { LOAD_QUESTIONS } from "./questionActionTypes";

const initialState = {
    questions: [],
    newQuestion: {
        id: "",
        user: "",
        title: "",
        text: "",
        creationDate: "",
        voteCount: "",
        tags: []
    },
    searchedQuestions: []
};

function questionReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_QUESTION:
            return addQuestion(state, action.payload);
        case CHANGE_NEW_QUESTION_PROPERTIES:
            return changeNewQuestionProperty(state, action.payload);
        case DELETE_QUESTION:
            return deleteQuestion(state, action.payload);
        case EDIT_QUESTION:
            return editQuestion(state, action.payload);
        case SEARCH_QUESTION:
            return search(state, action.payload);
        case LOAD_QUESTIONS:
            return loadQuestions(state, action.payload);
    }
    return state;
};

function addQuestion(state, payload) {
    let newState = {
        ...state,
        questions: state.questions.concat([payload.question])
    };

    return newState;
}

function changeNewQuestionProperty(state, payload) {
    let newState = {
        ...state,
        newQuestion: {
            ...state.newQuestion,
            [payload.property]: payload.value
        }
    };

    return newState;
}

function deleteQuestion(state, payload) {
    let oldQuestion = state.questions.filter(question => question.id == payload.question.id)[0];
    let index = state.questions.indexOf(oldQuestion);
    let questions = state.questions.concat([]);
    questions.splice(index, 1);

    let newState = {
        ...state,
        questions: questions
    };

    return newState;
}

function editQuestion(state, payload) {
    let oldQuestion = state.questions.filter(q => q.id == payload.question.id)[0];
    let index = state.questions.indexOf(oldQuestion);
    let questions = state.questions.concat([]);
    questions[index] = {
        ...state.questions[index],
        title: payload.question.title,
        text: payload.question.text,
        voteCount: payload.question.voteCount
    };

    let newState = {
        ...state,
        questions: questions
    };

    return newState;
}

function search(state, payload) {
    let newState = {
        ...state,
        searchedQuestions: payload.questions
    };

    return newState;
}

function loadQuestions(state, payload) {
    return {
        ...state,
        questions: payload.questions
    };
}

export default questionReducer;