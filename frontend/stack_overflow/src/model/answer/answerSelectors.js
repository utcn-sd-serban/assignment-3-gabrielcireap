import store from "../store/store";

export function findByQuestion(questionId) {
    let answers = store.getState().answerState.answers;
    let newAnswers = answers.filter(answer => answer.question.id == questionId);
    debugger;
    return newAnswers;
}

export function findById(id) {
    let answers = store.getState().answerState.answers;
    return answers.filter(answer => answer.id == id)[0];
}

export function getNewAnswer() {
    return store.getState().answerState.newAnswer;
}