import QuestionsTablePresenter from "./QuestionsTablePresenter";
import * as questionActions from "../model/question/questionActions";
import * as questionSelectors from "../model/question/questionSelectors";
import * as userSelectors from "../model/user/userSelectors";
import store from "../model/store/store";
import QuestionRestClient from "../rest/QuestionRestClient";

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
        
        store.dispatch(questionActions.changeNewQuestionProperty("title", ""));
    }

    onChange(property, value) {
        store.dispatch(questionActions.changeNewQuestionProperty(property, value));
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
            store.dispatch(questionActions.loadQuestions(questions));
        });;
    }
}

const questionSearchTagPresenter = new QuestionSearchTagPresenter();
export default questionSearchTagPresenter;