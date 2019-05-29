import QuestionsTablePresenter from "./QuestionsTablePresenter";
import * as questionSelectors from "../model/question/questionSelectors";
import * as userSelectors from "../model/user/userSelectors";
import QuestionRestClient from "../rest/QuestionRestClient";
import invoker from "../model/command/Invoker";
import { LoadQuestionsCommand, ChangeNewQuestionPropertyCommand } from "../model/question/questionCommands";

class QuestionSearchTagPresenter {

    onSearch() {
        let newQuestion = questionSelectors.getNewQuestion();
        let loggedUser = userSelectors.getLoggedUser();
        let client = new QuestionRestClient(loggedUser.username, loggedUser.password);
        client.findQuestionByTag(newQuestion.title).then(response => {
            if (response.type !== undefined) {
                window.alert(response.type);
            }
        });

        invoker.execute(new ChangeNewQuestionPropertyCommand("title", ""));
    }

    onChange(property, value) {
        invoker.execute(new ChangeNewQuestionPropertyCommand(property, value));
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

    onInit() {
        let loggedUser = userSelectors.getLoggedUser();
        let client = new QuestionRestClient(loggedUser.username, loggedUser.password);

        client.loadQuestions().then(questions => {
            invoker.execute(new LoadQuestionsCommand(questions));
        });;
    }
}

const questionSearchTagPresenter = new QuestionSearchTagPresenter();
export default questionSearchTagPresenter;