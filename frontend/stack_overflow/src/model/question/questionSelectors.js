import store from "../store/store";
import { toString as userToString } from "../../model/user/userSelectors";

export function getNewQuestion() {
    return store.getState().questionState.newQuestion;
}

export function findById(id) {
    let questions = store.getState().questionState.questions;
    return questions.filter(question => question.id == id)[0];
}

export function toString(question) {
    return "Question(" + question.title + ", " + question.text + ", " + userToString(question.user) + ")";
}