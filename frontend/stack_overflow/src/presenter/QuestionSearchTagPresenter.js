import QuestionsTablePresenter from "./QuestionsTablePresenter";
import * as questionActions from "../model/question/questionActions";
import * as questionSelectors from "../model/question/questionSelectors";
import store from "../model/store/store";
import RestClient from "../rest/QuestionRestClient";
const client = new RestClient("user1", "pass1");

class QuestionSearchTagPresenter {

    onSearch() {
        let newQuestion = questionSelectors.getNewQuestion();

        client.findQuestionByTag(newQuestion.title).then(questions => {
            store.dispatch(questionActions.searchByTag(questions));
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
        client.loadQuestions().then(questions => {
            store.dispatch(questionActions.loadQuestions(questions));
        });
    }
}

const questionSearchTagPresenter = new QuestionSearchTagPresenter();
export default questionSearchTagPresenter;