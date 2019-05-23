const BASE_URL = "http://localhost:8080";

export default class AnswerRestClient {
    constructor(username, password) {
        this.authorization = "Basic " + btoa(username + ":" + password);
    }

    addAnswer(loggedUser, selectedQuestion, text, voteCount) {
        let answerDTO = {
            id: "",
            question: {
                ...selectedQuestion,
                creationDate: null
            },
            user: loggedUser,
            text,
            creationDate: null,
            voteCount
        };

        return fetch(BASE_URL + "/answers", {
            method: "POST",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answerDTO)
        }).then(response => response.json());
    }

    editAnswer(currentAnswer) {
        let answerDTO = {
            id: currentAnswer.id,
            question: currentAnswer.question,
            user: currentAnswer.user,
            text: currentAnswer.text,
            creationDate: currentAnswer.creationDate,
            voteCount: currentAnswer.voteCount
        };

        return fetch(BASE_URL + "/answers/" + currentAnswer.id, {
            method: "PUT",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answerDTO)
        }).then(response => response.json());
    }

    deleteAnswer(id) {
        return fetch(BASE_URL + "/answers/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": this.authorization
            }
        }).then(response => response.status);
    }
    
    loadAnswers() {
        return fetch(BASE_URL + "/answers", {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }
}