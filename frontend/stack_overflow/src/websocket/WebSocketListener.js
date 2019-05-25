import { EventEmitter } from "events";
import { Client } from "@stomp/stompjs";
import invoker from "../model/command/Invoker";

import { AddUserCommand, EditUserCommand } from "../model/user/userCommands";
import { AddQuestionCommand, DeleteQuestionCommand, EditQuestionCommand, SaveSearchedQuestionsCommand }
    from "../model/question/questionCommands";
import { AddAnswerCommand, EditAnswerCommand, DeleteAnswerCommand }
    from "../model/answer/answerCommands";

class WebSocketListener extends EventEmitter {
    constructor(username, password) {
        super();
        this.client = new Client({
            brokerURL: "ws://" + username + ":" + password
                + "@localhost:8080/api/websocket",
            onConnect: () => {
                this.client.subscribe("/topic/events", message => {
                    this.emit("event", JSON.parse(message.body));
                })
            }
        });
        this.client.activate();
    }
}

export const listener = new WebSocketListener("user1", "pass1");

listener.on("event", event => {
    switch (event.type) {
        case "USER_CREATED":
            invoker.execute(new AddUserCommand(event.user));
            break;
        case "USER_UPDATED":
            invoker.executeAndAdd(new EditUserCommand(event.user));
            break;
        case "QUESTION_CREATED":
            debugger;
            invoker.executeAndAdd(new AddQuestionCommand(event.question));
            break;
        case "QUESTION_DELETED":
            invoker.executeAndAdd(new DeleteQuestionCommand(event.question));
            break;
        case "QUESTION_UPDATED":
            invoker.executeAndAdd(new EditQuestionCommand(event.question));
            break;
        case "QUESTION_SEARCH":
            invoker.executeAndAdd(new SaveSearchedQuestionsCommand(event.questions));
            break;
        case "ANSWER_CREATED":
            invoker.executeAndAdd(new AddAnswerCommand(event.answer));
            break;
        case "ANSWER_DELETED":
            invoker.executeAndAdd(new DeleteAnswerCommand(event.answer));
            break;
        case "ANSWER_UPDATED":
            invoker.executeAndAdd(new EditAnswerCommand(event.answer));
            break;
    }
});