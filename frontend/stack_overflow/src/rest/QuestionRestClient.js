const BASE_URL = "http://localhost:8080";

export default class QuestionRestClient {
    constructor(username, password) {
        this.authorization = "Basic " + btoa(username + ":" + password);
    }

    addQuestion(user, title, text, voteCount, tags) {
        let questionDTO = {
            id: "",
            user: {
                id: user.id,
                username: user.username,
                score: user.score,
                isAdmin: user.isAdmin,
                isBanned: user.isBanned
            },
            title,
            text,
            creationDate: null,
            voteCount,
            tags
        };
        
        return fetch(BASE_URL + "/questions", {
            method: "POST",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionDTO)
        }).then(response => response.json());
    }

    loadQuestions() {
        return fetch(BASE_URL + "/questions", {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    findQuestionByTitle(title) {
        return fetch(BASE_URL + "/questions/search?title=" + title, {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    findQuestionByTag(tag) {
        return fetch(BASE_URL + "/questions/search?tag=" + tag, {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }
}