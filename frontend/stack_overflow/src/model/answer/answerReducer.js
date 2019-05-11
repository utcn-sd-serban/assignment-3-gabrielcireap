import { ADD_ANSWER } from "./answerActionTypes.js";
import { CHANGE_NEW_ANSWER_PROPERTIES } from "./answerActionTypes.js";
import { DELETE_ANSWER } from "./answerActionTypes.js";
import { EDIT_ANSWER } from "./answerActionTypes.js";
import { UPVOTE_ANSWER } from "./answerActionTypes.js";
import { DOWNVOTE_ANSWER } from "./answerActionTypes.js";

const initialState = {
    answers: [{
        id: 1,
        user: {
            id: 1,
            username: "user1",
            password: "pass1",
            email: "email1",
            score: 0,
            isAdmin: true,
            isBanned: false,
        },
        question: {
            id: 1,
            user: {
                id: 1,
                username: "user1",
                password: "pass1",
                email: "email1",
                score: 0,
                isAdmin: true,
                isBanned: false,
            },
            title: "title1",
            text: "text1",
            creationDate: new Date(Date.now()).toLocaleDateString(),
            voteCount: 0,
            tags: [{
                id: 1,
                name: "tag1"
            }]
        },
        text: "answer1",
        creationDate: "12/22/1997",
        voteCount: 0
    }, {
        id: 2,
        user: {
            id: 1,
            username: "user1",
            password: "pass1",
            email: "email1",
            score: 0,
            isAdmin: true,
            isBanned: false,
        },
        question: {
            id: 1,
            user: {
                id: 1,
                username: "user1",
                password: "pass1",
                email: "email1",
                score: 0,
                isAdmin: true,
                isBanned: false,
            },
            title: "title1",
            text: "text1",
            creationDate: new Date(Date.now()).toLocaleDateString(),
            voteCount: 0,
            tags: [{
                id: 1,
                name: "tag1"
            }]
        },
        text: "answer2",
        creationDate: "12/22/1997",
        voteCount: 0
    }, {
        id: 3,
        user: {
            id: 1,
            username: "user1",
            password: "pass1",
            email: "email1",
            score: 0,
            isAdmin: true,
            isBanned: false,
        },
        question: {
            id: 2,
            user: {
                id: 1,
                username: "user1",
                password: "pass1",
                email: "email1",
                score: 0,
                isAdmin: true,
                isBanned: false,
            },
            title: "ceva titlu",
            text: "ceva text",
            creationDate: new Date(Date.now()).toLocaleDateString(),
            voteCount: 0,
            tags: [{
                id: 1,
                name: "tag1"
            }, {
                id: 2,
                name: "react"
            }]
        },
        text: "answer3",
        creationDate: "12/22/1997",
        voteCount: 2
    }],
    newAnswer: {
        id: "",
        user: "",
        question: "",
        text: "",
        creationDate: "",
        voteCount: ""
    },

    currentIndex: 4
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
    }
    return state;
};

function addAnswer(state, payload) {
    let newState = {
        ...state,
        answers: state.answers.concat([{
            id: state.currentIndex,
            user: payload.user,
            question: payload.question,
            text: payload.text,
            creationDate: payload.creationDate,
            voteCount: payload.voteCount
        }]),
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

export default answerReducer;