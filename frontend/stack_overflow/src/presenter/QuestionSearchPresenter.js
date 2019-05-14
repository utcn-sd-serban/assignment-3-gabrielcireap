import store from "../model/store/store";
import * as questionActions from "../model/question/questionActions";
import * as questionSelectors from "../model/question/questionSelectors";
import QuestionsTablePresenter from "./QuestionsTablePresenter";
import RestClient from "../rest/QuestionRestClient";
const client = new RestClient("user1", "pass1");

class QuestionSearchPresenter {

    onSearch() {
        let newQuestion = questionSelectors.getNewQuestion();

        client.findQuestionByTitle(newQuestion.title).then(questions => {
            store.dispatch(questionActions.searchByTitle(questions));
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

const questionSearchPresenter = new QuestionSearchPresenter();
export default questionSearchPresenter;