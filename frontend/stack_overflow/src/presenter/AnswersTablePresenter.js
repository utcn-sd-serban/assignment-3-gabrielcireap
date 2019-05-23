import * as answerActions from "../model/answer/answerActions";
import * as answerSelectors from "../model/answer/answerSelectors";
import * as userSelectors from "../model/user/userSelectors";
import store from "../model/store/store";
import AnswerRestClient from "../rest/AnswerRestClient";
import VoteRestClient from "../rest/VoteRestClient";

class AnswersTablePresenter {

    onCreate(selectedQuestion) {

        let loggedUser = userSelectors.getLoggedUser();
        let newAnswer = answerSelectors.getNewAnswer();

        let answerClient = new AnswerRestClient(loggedUser.username, loggedUser.password);
        answerClient.addAnswer(loggedUser, selectedQuestion, newAnswer.text, 0).then(response => {
            if (response.type !== undefined) {
                window.alert(response.type);
            }
        });
        store.dispatch(answerActions.changeNewAnswerProperty("text", ""));
    }

    onChange(property, value) {
        store.dispatch(answerActions.changeNewAnswerProperty(property, value));
    }

    onEditAnswer(id) {

        let currentAnswer = answerSelectors.findById(id);
        currentAnswer.text = answerSelectors.getNewAnswer().text;

        let loggedUser = userSelectors.getLoggedUser();
        let answerClient = new AnswerRestClient(loggedUser.username, loggedUser.password);
        answerClient.editAnswer(currentAnswer).then(response => {
            if (response.type !== undefined) {
                window.alert(response.type);
            }
        });

        store.dispatch(answerActions.changeNewAnswerProperty("text", ""));
    }

    onDeleteAnswer(id) {
        let loggedUser = userSelectors.getLoggedUser();
        let answerClient = new AnswerRestClient(loggedUser.username, loggedUser.password);
        answerClient.deleteAnswer(id).then(status => {
            if (status >= 300) {
                window.alert("Cannot find answer!");
            }
        });
    }

    onUpvoteAnswer(answerId) {
        let loggedUser = userSelectors.getLoggedUser();
        let voteClient = new VoteRestClient(loggedUser.username, loggedUser.password);
        voteClient.upvoteAnswer(answerId).then(status => {
            if (status === 403) {
                window.alert("You cannot vote your own answer");
            } else if (status === 400) {
                window.alert("You cannot upvote twice!");
            }
        });
    }

    onDownvoteAnswer(answerId) {
        let loggedUser = userSelectors.getLoggedUser();
        let voteClient = new VoteRestClient(loggedUser.username, loggedUser.password);
        voteClient.downvoteAnswer(answerId).then(status => {
            if (status === 403) {
                window.alert("You cannot vote your own question");
            } else if (status === 400) {
                window.alert("You cannot downvote twice!");
            }
        });
    }

    onInit() {
        let loggedUser = userSelectors.getLoggedUser();
        let answerClient = new AnswerRestClient(loggedUser.username, loggedUser.password);
        answerClient.loadAnswers().then(answers => {
            store.dispatch(answerActions.loadAnswers(answers));
        });
    }
}

const answersTablePresenter = new AnswersTablePresenter();
export default answersTablePresenter;