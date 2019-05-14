import { ADD_QUESTION } from "./questionActionTypes.js";
import { CHANGE_NEW_QUESTION_PROPERTIES } from "./questionActionTypes.js";
import { DELETE_QUESTION } from "./questionActionTypes.js";
import { EDIT_QUESTION } from "./questionActionTypes.js";
import { SEARCH_BY_TITLE } from "./questionActionTypes.js";
import { SEARCH_BY_TAG } from "./questionActionTypes.js";
import { UPVOTE_QUESTION } from "./questionActionTypes.js";
import { DOWNVOTE_QUESTION } from "./questionActionTypes.js";
import { LOAD_QUESTIONS } from "./questionActionTypes";

export function addQuestion(question){

	let payload = {
		question
	};

	return {
		type: ADD_QUESTION,
		payload
	};
}

export function changeNewQuestionProperty(property, value){

	let payload = {
		property,
		value
	};

	return {
		type: CHANGE_NEW_QUESTION_PROPERTIES,
		payload
	};
}

export function deleteQuestion(question){

	let payload = {
		question
	};

	return {
        type: DELETE_QUESTION,
		payload
	};
}

export function edit(question){

	let payload = {
		question
	};

	return {
        type: EDIT_QUESTION,
		payload
	};
}

export function searchByTitle(questions){

	let payload = {
		questions
	};

	return {
		type: SEARCH_BY_TITLE,
		payload
	};
}

export function searchByTag(questions){

	let payload = {
		questions
	};

	return {
		type: SEARCH_BY_TAG,
		payload
	};
}

export function upvote(question, count){

	let payload = {
		question,
		count
	};

	return {
        type: UPVOTE_QUESTION,
		payload
	};
}

export function downvote(question, count, score){

	let payload = {
		question, 
		count, 
		score
	};

	return {
        type: DOWNVOTE_QUESTION,
		payload
	};
}

export function loadQuestions(questions) {
    return {
        type: LOAD_QUESTIONS,
        payload: {
            questions
        }
    }
}