import QuestionsTablePresenter from "./QuestionsTablePresenter";
import * as userSelectors from "../model/user/userSelectors";
import * as userActions from "../model/user/userActions";
import store from "../model/store/store";

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
        let selectedUser = userSelectors.findById(userId);
        store.dispatch(userActions.ban(selectedUser));
    }

    onInit() {
        store.dispatch(userActions.loadUsers());
    }
}

const mainPresenter = new MainPresenter();
export default mainPresenter;