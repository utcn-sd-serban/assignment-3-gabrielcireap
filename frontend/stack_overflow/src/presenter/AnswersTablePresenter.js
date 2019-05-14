import * as answerActions from "../model/answer/answerActions";
import * as answerSelectors from "../model/answer/answerSelectors";
import * as userSelectors from "../model/user/userSelectors";
import store from "../model/store/store";
import AnswerRestClient from "../rest/AnswerRestClient";
import VoteRestClient from "../rest/VoteRestClient";
const answerClient = new AnswerRestClient("user1", "pass1");
const voteClient = new VoteRestClient("user1", "pass1");

class AnswersTablePresenter {

    onCreate(selectedQuestion) {

        let loggedUser = userSelectors.getLoggedUser();
        let newAnswer = answerSelectors.getNewAnswer();

        answerClient.addAnswer(loggedUser, selectedQuestion, newAnswer.text, 0)
            .then(answer => {
                store.dispatch(answerActions.addAnswer(answer));
        });

        store.dispatch(answerActions.changeNewAnswerProperty("text", ""));
    }

    onChange(property, value) {
        store.dispatch(answerActions.changeNewAnswerProperty(property, value));
    }

    onEditAnswer(id) {

        let currentAnswer = answerSelectors.findBySearchedQuestionId(id);
        currentAnswer.text = answerSelectors.getNewAnswer().text;

        answerClient.editAnswer(currentAnswer).then(answer => {
            store.dispatch(answerActions.editAnswer(answer));
        });

        store.dispatch(answerActions.changeNewAnswerProperty("text", ""));
    }

    onDeleteAnswer(id) {
        let currentAnswer = answerSelectors.findBySearchedQuestionId(id);
        answerClient.deleteAnswer(currentAnswer.id);
        store.dispatch(answerActions.deleteAnswer(currentAnswer));
    }

    onUpvoteAnswer(answerId) {
        voteClient.upvoteAnswer(answerId);
    }

    onDownvoteAnswer(answerId) {
        voteClient.downvoteAnswer(answerId);
    }

    onInit(questionId) {
        answerClient.findByQuestion(questionId).then(answers => {
            store.dispatch(answerActions.findByQuestion(answers));
        });
    }
}

const answersTablePresenter = new AnswersTablePresenter();
export default answersTablePresenter;