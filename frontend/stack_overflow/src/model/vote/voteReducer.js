import { ADD_VOTE } from "./voteActionTypes";
import { UPDATE_VOTE } from "./voteActionTypes";

const initialState = {
    votes: [],
    currentIndex: 1
};

function voteReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_VOTE:
            return addVote(state, action.payload);
        case UPDATE_VOTE:
            return update(state, action.payload);
    }
    return state;
}

function addVote(state, payload) {
    let vote = {
        id: state.currentIndex,
        question: payload.question,
        answer: payload.answer,
        user: payload.user,
        isUpvote: payload.isUpvote,
    };

    let newState = {
        ...state,
        votes: state.votes.concat([vote]),
        currentIndex: state.currentIndex + 1
    };
    
    return newState;
}

function update(state, payload) {
    let oldVote = state.votes.filter(v => v.id == payload.vote.id);
    let index = state.votes.indexOf(oldVote);
    let votes = state.votes.concat([]);
    votes[index] = payload.vote;

    let newState = {
        ...state,
        votes: votes
    };
    
    return newState;
}

export default voteReducer;