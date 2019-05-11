import { ADD_ANSWER } from "./answerActionTypes.js";
import { CHANGE_NEW_ANSWER_PROPERTIES } from "./answerActionTypes.js";
import { DELETE_ANSWER } from "./answerActionTypes.js";
import { EDIT_ANSWER } from "./answerActionTypes.js";
import { UPVOTE_ANSWER } from "./answerActionTypes.js";
import { DOWNVOTE_ANSWER } from "./answerActionTypes.js";

export function addAnswer(user, question, text, creationDate, voteCount) {

    let payload = {
        user,
        question,
        text,
        creationDate,
        voteCount
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
        answer: answer
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