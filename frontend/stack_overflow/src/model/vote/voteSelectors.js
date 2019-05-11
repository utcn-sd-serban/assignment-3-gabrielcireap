import store from "../store/store";

export function findByQuestionId(questionId, userId){
    let votes = store.getState().voteState.votes;
    return votes.filter(vote => vote.question !== undefined && vote.question.id == questionId && vote.user.id == userId);
}

export function findByAnswerId(answerId, userId) {
    let votes = store.getState().voteState.votes;
    votes = votes.filter(vote => vote.answer !== undefined && vote.answer.id == answerId && vote.user.id == userId);
    return votes;
}
