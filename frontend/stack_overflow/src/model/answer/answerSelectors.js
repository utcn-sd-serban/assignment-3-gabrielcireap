import store from "../store/store";

export function findByQuestion(question) {
    let answers = store.getState().answerState.answers;
    return answers.filter(answer => answer.question.id === question.id);
}

export function findById(id) {
    let answers = store.getState().answerState.answers;
    return answers.filter(answer => answer.id === id)[0];
}

export function getNewAnswer() {
    return store.getState().answerState.newAnswer;
}