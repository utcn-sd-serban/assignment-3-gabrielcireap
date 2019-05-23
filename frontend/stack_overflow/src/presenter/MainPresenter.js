import QuestionsTablePresenter from "./QuestionsTablePresenter";
import * as userSelectors from "../model/user/userSelectors";
import * as userActions from "../model/user/userActions";
import * as questionActions from "../model/question/questionActions";
import store from "../model/store/store";
import QuestionRestClient from "../rest/QuestionRestClient";
import UserRestClient from "../rest/UserRestClient";

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
        let loggedUser = userSelectors.getLoggedUser();
        let userClient = new UserRestClient(loggedUser.username, loggedUser.password);
        userClient.ban(userId).then(response => {
            if (response.type !== undefined) {
                window.alert(response.type);
            }
        });
    }

    onInit() {

        let loggedUser = userSelectors.getLoggedUser();
        let userClient = new UserRestClient(loggedUser.username, loggedUser.password);
        let questionClient = new QuestionRestClient(loggedUser.username, loggedUser.password);

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