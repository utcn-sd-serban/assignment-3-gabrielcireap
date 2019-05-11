import * as questionSelectors from "../model/question/questionSelectors";
import * as questionActions from "../model/question/questionActions";
import * as voteActions from "../model/vote/voteActions";
import * as voteSelectors from "../model/vote/voteSelectors";
import * as tagSelectors from "../model/tag/tagSelectors";
import * as tagActions from "../model/tag/tagActions";
import { updateScore } from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";

import store from "../model/store/store";
import RestClient from "../rest/QuestionRestClient";
const client = new RestClient("user1", "pass1");

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

        client.addQuestion(userSelectors.getLoggedUser(), newQuestion.title, newQuestion.text, 0, questionTags).then(question => {
            console.log(question);
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
        let currentQuestion = questionSelectors.findById(questionId);
        let loggedUser = userSelectors.getLoggedUser();

        if (currentQuestion.user.username === loggedUser.username && currentQuestion.user.password === loggedUser.password) {
            window.alert("Cannot vote your own question!");
        } else {
            let currentVote = voteSelectors.findByQuestionId(currentQuestion.id, loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === true) {
                    window.alert("You cannot vote twice!");
                } else {
                    currentVote[0].isUpvote = true;
                    store.dispatch(voteActions.update(currentVote[0]));
                    store.dispatch(updateScore(currentQuestion.user, 7));
                    store.dispatch(questionActions.upvote(currentQuestion, 2));
                }

            } else {
                let action = voteActions.addVote(currentQuestion, undefined, loggedUser, true);
                store.dispatch(action);
                store.dispatch(updateScore(currentQuestion.user, 5));
                store.dispatch(questionActions.upvote(currentQuestion, 1));
            }
        }
    }

    onDownvoteQuestion(questionId) {
        let currentQuestion = questionSelectors.findById(questionId);
        let loggedUser = userSelectors.getLoggedUser();

        if (currentQuestion.user.username === loggedUser.username && currentQuestion.user.password === loggedUser.password) {
            window.alert("Cannot vote your own question!");
        } else {
            let currentVote = voteSelectors.findByQuestionId(currentQuestion.id, loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === false) {
                    window.alert("You cannot vote twice!");
                } else {
                    currentVote[0].isUpvote = false;
                    store.dispatch(voteActions.update(currentVote[0]));
                    store.dispatch(updateScore(currentQuestion.user, -7));
                    store.dispatch(questionActions.downvote(currentQuestion, 2));
                }

            } else {
                store.dispatch(voteActions.addVote(currentQuestion, undefined, loggedUser, false));
                store.dispatch(updateScore(currentQuestion.user, -2));
                store.dispatch(questionActions.downvote(currentQuestion, 1));
            }
        }
    }

    onInit() {
        client.loadQuestions().then(questions => {
            store.dispatch(questionActions.loadQuestions(questions));
        });
    }
}

function createTag(tag) {
    return {
        id: "",
        name: tag
    };
}

const questionTablePresenter = new QuestionTablePresenter();
export default questionTablePresenter;