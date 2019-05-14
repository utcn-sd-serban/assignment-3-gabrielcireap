import { ADD_ANSWER } from "./answerActionTypes.js";
import { CHANGE_NEW_ANSWER_PROPERTIES } from "./answerActionTypes.js";
import { DELETE_ANSWER } from "./answerActionTypes.js";
import { EDIT_ANSWER } from "./answerActionTypes.js";
import { UPVOTE_ANSWER } from "./answerActionTypes.js";
import { DOWNVOTE_ANSWER } from "./answerActionTypes.js";
import { FIND_ANSWERS_BY_QUESTION } from "./answerActionTypes";

export function addAnswer(answer) {

    let payload = {
        answer
    };

    return {
        type: ADD_ANSWER,
        payload
    };
}

export function changeNewAnswerProperty(property, value) {

    let payload = {
        property,
        value
    };

    return {
        type: CHANGE_NEW_ANSWER_PROPERTIES,
        payload
    };
}

export function deleteAnswer(answer) {

    let payload = {
        answer
    };

    return {
        type: DELETE_ANSWER,
        payload
    };
}

export function editAnswer(answer) {

    let payload = {
        answer
    };

    return {
        type: EDIT_ANSWER,
        payload: payload
    };
}

export function upvote(answer, count) {

    let payload = {
        answer,
        count
    };

    return {
        type: UPVOTE_ANSWER,
        payload
    };
}

export function downvote(answer, count) {

    let payload = {
        answer,
        count
    };

    return {
        type: DOWNVOTE_ANSWER,
        payload
    };
}

export function findByQuestion(answers) {
    return {
        type: FIND_ANSWERS_BY_QUESTION,
        payload: {
            answers
        }
    };
}