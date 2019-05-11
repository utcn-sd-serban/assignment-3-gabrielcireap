import * as answerActions from "../model/answer/answerActions";
import * as answerSelectors from "../model/answer/answerSelectors";
import * as userSelectors from "../model/user/userSelectors";
import * as userActions from "../model/user/userActions";
import * as voteSelectors from "../model/vote/voteSelectors";
import * as voteActions from "../model/vote/voteActions";
import store from "../model/store/store";

class AnswersTablePresenter {

    onCreate(selectedQuestion) {

        let loggedUser = userSelectors.getLoggedUser();
        let newAnswer = answerSelectors.getNewAnswer();

        store.dispatch(answerActions.addAnswer(
            loggedUser,
            selectedQuestion,
            newAnswer.text,
            new Date(Date.now()).toLocaleDateString('en-GB'),
            0
        ));
        
        store.dispatch(answerActions.changeNewAnswerProperty("text", ""));
    }

    onChange(property, value) {
        store.dispatch(answerActions.changeNewAnswerProperty(property, value));
    }

    onEditAnswer(id) {
        
        let currentAnswer = answerSelectors.findById(id);
        currentAnswer.text = answerSelectors.getNewAnswer().text;
        let loggedUser = userSelectors.getLoggedUser();

        if (currentAnswer.user.username === loggedUser.username && currentAnswer.user.password === loggedUser.password
            || loggedUser.isAdmin === true) {
            store.dispatch(answerActions.editAnswer(currentAnswer));
        } else {
            window.alert("You are neither the author nor an admin!");
        }
        store.dispatch(answerActions.changeNewAnswerProperty("text", ""));
    }

    onDeleteAnswer(id) {

        let currentAnswer = answerSelectors.findById(id);
        let loggedUser = userSelectors.getLoggedUser();

        if (currentAnswer.user.username === loggedUser.username && currentAnswer.user.password === loggedUser.password
            || loggedUser.isAdmin === true) {
            store.dispatch(answerActions.deleteAnswer(currentAnswer));
        } else {
            window.alert("You are neither the author nor the admin!");
        }
    }

    onUpvoteAnswer(answerId) {
        let currentAnswer = answerSelectors.findById(answerId);
        let loggedUser = userSelectors.getLoggedUser();

        if (currentAnswer.user.username === loggedUser.username && currentAnswer.user.password === loggedUser.password) {
            window.alert("Cannot vote your own question!");
        } else {
            let currentVote = voteSelectors.findByAnswerId(currentAnswer.id, loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === true) {
                    window.alert("You cannot vote twice!");
                } else {
                    currentVote[0].isUpvote = true;
                    store.dispatch(voteActions.update(currentVote[0]));
                    store.dispatch(userActions.updateScore(currentAnswer.user, 12));
                    store.dispatch(userActions.updateScore(loggedUser, 1));
                    store.dispatch(answerActions.upvote(currentAnswer, 2));
                }

            } else {
                store.dispatch(voteActions.addVote(undefined, currentAnswer, loggedUser, true));
                store.dispatch(userActions.updateScore(currentAnswer.user, 10));
                store.dispatch(answerActions.upvote(currentAnswer, 1));
            }
        }
    }

    onDownvoteAnswer(answerId) {
        let currentAnswer = answerSelectors.findById(answerId);
        let loggedUser = userSelectors.getLoggedUser();

        if (currentAnswer.user.username === loggedUser.username && currentAnswer.user.password === loggedUser.password) {
            window.alert("Cannot vote your own question!");
        } else {
            let currentVote = voteSelectors.findByAnswerId(currentAnswer.id, loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === false) {
                    window.alert("You cannot vote twice!");
                } else {
                    currentVote[0].isUpvote = false;
                    store.dispatch(voteActions.update(currentVote[0]));
                    store.dispatch(userActions.updateScore(currentAnswer.user, -12));
                    store.dispatch(userActions.updateScore(loggedUser, -1));
                    store.dispatch(answerActions.downvote(currentAnswer, 2));
                }

            } else {
                store.dispatch(voteActions.addVote(undefined, currentAnswer, loggedUser, false));
                store.dispatch(userActions.updateScore(currentAnswer.user, -2));
                store.dispatch(userActions.updateScore(loggedUser, -1));
                store.dispatch(answerActions.downvote(currentAnswer, 1));
            }
        }
    }
}

const answersTablePresenter = new AnswersTablePresenter();
export default answersTablePresenter;