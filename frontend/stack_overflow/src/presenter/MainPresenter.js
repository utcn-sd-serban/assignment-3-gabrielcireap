import QuestionsTablePresenter from "./QuestionsTablePresenter";
import * as userSelectors from "../model/user/userSelectors";
import QuestionRestClient from "../rest/QuestionRestClient";
import UserRestClient from "../rest/UserRestClient";
import invoker from "../model/command/Invoker";
import { LoadQuestionsCommand } from "../model/question/questionCommands";
import { LoadUsersCommand } from "../model/user/userCommands";

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

    onUndo() {
        invoker.undo();
    }

    onRedo() {
        invoker.redo();
    }

    onInit() {

        let loggedUser = userSelectors.getLoggedUser();
        let userClient = new UserRestClient(loggedUser.username, loggedUser.password);
        let questionClient = new QuestionRestClient(loggedUser.username, loggedUser.password);

        questionClient.loadQuestions().then(questions => {
            invoker.execute(new LoadQuestionsCommand(questions));
        });

        userClient.loadUsers().then(users => {
            invoker.execute(new LoadUsersCommand(users));
        });
    }
}

const mainPresenter = new MainPresenter();
export default mainPresenter;