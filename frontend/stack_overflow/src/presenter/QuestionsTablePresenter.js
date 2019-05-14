import * as questionSelectors from "../model/question/questionSelectors";
import * as questionActions from "../model/question/questionActions";
import * as tagSelectors from "../model/tag/tagSelectors";
import * as tagActions from "../model/tag/tagActions";
import * as userSelectors from "../model/user/userSelectors";

import store from "../model/store/store";
import QuestionRestClient from "../rest/QuestionRestClient";
import VoteRestClient from "../rest/VoteRestClient";
const questionClient = new QuestionRestClient("user1", "pass1");
const voteClient = new VoteRestClient("user1", "pass1");

class QuestionTablePresenter {
    
    onCreate() {
        let newQuestion = questionSelectors.getNewQuestion();
        let tags;
        let questionTags = [];

        if (newQuestion.tags.length === 0) {
            tags = [];
        } else {
            tags = newQuestion.tags.split(",").filter(tag => tagSelectors.isNew(tag) === true);
            tags.forEach(tag => store.dispatch(tagActions.addTag(tag)));
            tags.forEach(tag => questionTags.push(tag));
        }

        questionClient.addQuestion(userSelectors.getLoggedUser(), newQuestion.title, newQuestion.text, 0, questionTags).then(question => {
            store.dispatch(questionActions.addQuestion(question));
        });
        
        store.dispatch(questionActions.changeNewQuestionProperty("title", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("text", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("tags", ""));
    }

    onChange(property, value) {
        store.dispatch(questionActions.changeNewQuestionProperty(property, value));
    }

    onAnswer(id) {
        window.location.assign("#/answer/" + id);
    }

    onDeleteQuestion(id) {
        let loggedUser = userSelectors.getLoggedUser();

        if (loggedUser.isAdmin === true) {
            let selectedQuestion = questionSelectors.findById(id);
            store.dispatch(questionActions.deleteQuestion(selectedQuestion));
        } else {
            window.alert("Only admins can delete questions!");
        }
    }

    onEditQuestion() {

        let loggedUser = userSelectors.getLoggedUser();
        if (loggedUser.isAdmin === true) {
            let newQuestionFromState = questionSelectors.getNewQuestion();
            let newQuestion = {
                id: newQuestionFromState.tags,
                title: newQuestionFromState.title,
                text: newQuestionFromState.text
            };

            store.dispatch(questionActions.edit(newQuestion));
        } else {
            window.alert("Only admins can edit questions!");
        }
        
        store.dispatch(questionActions.changeNewQuestionProperty("title", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("text", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("tags", ""));
    }

    onUpvoteQuestion(questionId) {
        voteClient.upvoteQuestion(questionId);
    }

    onDownvoteQuestion(questionId) {
        voteClient.downvoteQuestion(questionId);
    }

    onInit() {
        questionClient.loadQuestions().then(questions => {
            store.dispatch(questionActions.loadQuestions(questions));
        });
    }
}

const questionTablePresenter = new QuestionTablePresenter();
export default questionTablePresenter;