import * as questionSelectors from "../model/question/questionSelectors";
import * as userSelectors from "../model/user/userSelectors";
import invoker from "../model/command/Invoker";
import { LoadQuestionsCommand, ChangeNewQuestionPropertyCommand } from "../model/question/questionCommands";
import QuestionRestClient from "../rest/QuestionRestClient";
import VoteRestClient from "../rest/VoteRestClient";

class QuestionTablePresenter {
    
    onCreate() {
        let newQuestion = questionSelectors.getNewQuestion();
        let questionTags = [];

        if (newQuestion.tags.length === 0) {
            questionTags = [];
        } else {
            newQuestion.tags.split(",").forEach(tag => questionTags.push(tag));
        }

        let loggedUser = userSelectors.getLoggedUser();
        let questionClient = new QuestionRestClient(loggedUser.username, loggedUser.password);
        questionClient.addQuestion(userSelectors.getLoggedUser(), newQuestion.title, newQuestion.text, 0, questionTags).then(response => {
            if (response.type !== undefined) {
                window.alert(response.type);
            }
        });

        invoker.execute(new ChangeNewQuestionPropertyCommand("title", ""));
        invoker.execute(new ChangeNewQuestionPropertyCommand("text", ""));
        invoker.execute(new ChangeNewQuestionPropertyCommand("tags", ""));
    }

    onChange(property, value) {
        invoker.execute(new ChangeNewQuestionPropertyCommand(property, value));
    }

    onAnswer(id) {
        window.location.assign("#/answer/" + id);
    }

    onDeleteQuestion(id) {
        let loggedUser = userSelectors.getLoggedUser();
        let questionClient = new QuestionRestClient(loggedUser.username, loggedUser.password);
        questionClient.deleteQuestion(id).then(status => {
            if (status >= 300) {
                window.alert("You do not have enough permissions!");
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
        
        invoker.execute(new ChangeNewQuestionPropertyCommand("title", ""));
        invoker.execute(new ChangeNewQuestionPropertyCommand("text", ""));
        invoker.execute(new ChangeNewQuestionPropertyCommand("tags", ""));
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
            invoker.execute(new LoadQuestionsCommand(questions));
        });;
    }
}

const questionTablePresenter = new QuestionTablePresenter();
export default questionTablePresenter;