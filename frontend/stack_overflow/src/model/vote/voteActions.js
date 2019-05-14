import { ADD_VOTE } from "./voteActionTypes";
import { UPDATE_VOTE } from "./voteActionTypes";

export function addVote(question, answer, user, isUpvote) {
    
    return {
        type: ADD_VOTE,
        payload: {
            question,
            answer,
            user,
            isUpvote
        }
    };
}

export function update(vote) {
    return {
        type: UPDATE_VOTE,
        payload: {
            vote
        }
    };
}