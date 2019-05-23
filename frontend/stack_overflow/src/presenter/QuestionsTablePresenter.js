import * as questionSelectors from "../model/question/questionSelectors";
import * as questionActions from "../model/question/questionActions";
import * as tagSelectors from "../model/tag/tagSelectors";
import * as tagActions from "../model/tag/tagActions";
import * as userSelectors from "../model/user/userSelectors";

import store from "../model/store/store";
import QuestionRestClient from "../rest/QuestionRestClient";
import VoteRestClient from "../rest/VoteRestClient";

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

        let loggedUser = userSelectors.getLoggedUser();
        let questionClient = new QuestionRestClient(loggedUser.username, loggedUser.password);
        questionClient.addQuestion(userSelectors.getLoggedUser(), newQuestion.title, newQuestion.text, 0, questionTags).then(response => {
            if (response.type !== undefined) {
                window.alert(response.type);
            }
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
        let questionClient = new QuestionRestClient(loggedUser.username, loggedUser.password);
        questionClient.deleteQuestion(id).then(status => {
            if (status >= 300) {
                window.alert("Cannot find question!");
            }
        });
    }

    onEditQuestion() {

        let loggedUser = userSelectors.getLoggedUser();
        let questionClient = new QuestionRestClient(loggedUser.username, loggedUser.password);
        let newQuestion = questionSelectors.getNewQuestion();
        questionClient.editQuestion(newQuestion.tags, newQuestion.title, newQuestion.text).then(response => {
            if (response.type !== undefined) {
                window.alert(response.type);
            }
        });
        
        store.dispatch(questionActions.changeNewQuestionProperty("title", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("text", ""));
        store.dispatch(questionActions.changeNewQuestionProperty("tags", ""));
    }

    onUpvoteQuestion(questionId) {
        let loggedUser = userSelectors.getLoggedUser();
        let voteClient = new VoteRestClient(loggedUser.username, loggedUser.password);
        voteClient.upvoteQuestion(questionId).then(status => {
            if (status === 403) {
                window.alert("You cannot vote your own question");
            } else if(status === 400) {
                window.alert("You cannot upvote twice!");
            }
        });
    }

    onDownvoteQuestion(questionId) {
        let loggedUser = userSelectors.getLoggedUser();
        let voteClient = new VoteRestClient(loggedUser.username, loggedUser.password);
        voteClient.downvoteQuestion(questionId).then(status => {
            if (status === 403) {
                window.alert("You cannot vote your own question");
            } else if (status === 400) {
                window.alert("You cannot downvote twice!");
            }
        });
    }

    onInit() {
        let loggedUser = userSelectors.getLoggedUser();
        let questionClient = new QuestionRestClient(loggedUser.username, loggedUser.password);
        questionClient.loadQuestions().then(questions => {
            store.dispatch(questionActions.loadQuestions(questions));
        });;
    }
}

const questionTablePresenter = new QuestionTablePresenter();
export default questionTablePresenter;