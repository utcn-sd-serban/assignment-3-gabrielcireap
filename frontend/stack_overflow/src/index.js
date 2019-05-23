import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./model/store/store";
import * as serviceWorker from './serviceWorker';
import 'bulma/css/bulma.css';

import * as questionActions from "./model/question/questionActions";
import * as userActions from "./model/user/userActions";
import * as answerActions from "./model/answer/answerActions";
import WebSocketListener from "./websocket/WebSocketListener";
const listener = new WebSocketListener("user1", "pass1");

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

listener.on("event", event => {
    switch (event.type) {
        case "USER_CREATED":
            store.dispatch(userActions.addUser(event.user));
            break;
        case "USER_UPDATED":
            store.dispatch(userActions.update(event.user));
            break;
        case "QUESTION_CREATED":
            store.dispatch(questionActions.addQuestion(event.question));
            break;
        case "QUESTION_DELETED":
            store.dispatch(questionActions.deleteQuestion(event.question));
            break;
        case "QUESTION_UPDATED":
            store.dispatch(questionActions.edit(event.question));
            break;
        case "QUESTION_SEARCH":
            store.dispatch(questionActions.search(event.questions));
            break;
        case "ANSWER_CREATED":
            store.dispatch(answerActions.addAnswer(event.answer));
            break;
        case "ANSWER_DELETED":

            store.dispatch(answerActions.deleteAnswer(event.answer));
            break;
        case "ANSWER_UPDATED":
            store.dispatch(answerActions.editAnswer(event.answer));
            break;
    }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
