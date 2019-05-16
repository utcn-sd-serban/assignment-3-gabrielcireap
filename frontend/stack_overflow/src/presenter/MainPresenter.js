import QuestionsTablePresenter from "./QuestionsTablePresenter";
import * as userSelectors from "../model/user/userSelectors";
import * as userActions from "../model/user/userActions";
import * as questionActions from "../model/question/questionActions";
import store from "../model/store/store";
import QuestionRestClient from "../rest/QuestionRestClient";
import UserRestClient from "../rest/UserRestClient";
const questionClient = new QuestionRestClient("user1", "pass1");
const userClient = new UserRestClient("user1", "pass1");

class MainPresenter {

    onAskQuestion() {
        window.location.assign("#/ask");
    }

    onSearchQuestionTitle() {
        window.location.assign("#/search-title");
    }

    onSearchQuestionTag() {
        window.location.assign("#/search-tag");
    }

    onAnswer(id) {
        window.location.assign("#/answer/" + id);
    }

    onDeleteQuestion(id) {
        QuestionsTablePresenter.onDeleteQuestion(id);
    }

    onUpvoteQuestion(id) {
        QuestionsTablePresenter.onUpvoteQuestion(id);
    }

    onDownvoteQuestion(id) {
        QuestionsTablePresenter.onDownvoteQuestion(id);
    }

    onBan(userId) {
        userClient.ban(userId).then(user => {
            store.dispatch(userActions.ban(user));
        });
    }

    onInit() {
        questionClient.loadQuestions().then(questions => {
            store.dispatch(questionActions.loadQuestions(questions));
        });

        userClient.loadUsers().then(users => {
            store.dispatch(userActions.loadUsers(users));
        });
    }
}

const mainPresenter = new MainPresenter();
export default mainPresenter;