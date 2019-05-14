const BASE_URL = "http://localhost:8080";

export default class VoteRestClient {
	constructor(username, password) {
		this.authorization = "Basic " + btoa(username + ":" + password);
    }

    upvoteQuestion(id) {
        return fetch(BASE_URL + "/questions/" + id + "/upvote", {
            method: "PUT",
            headers: {
                "Authorization": this.authorization
            }
        });
    }

    downvoteQuestion(id) {
        return fetch(BASE_URL + "/questions/" + id + "/downvote", {
            method: "PUT",
            headers: {
                "Authorization": this.authorization
            }
        });
    }

    upvoteAnswer(id) {
        return fetch(BASE_URL + "/answers/" + id + "/upvote", {
            method: "PUT",
            headers: {
                "Authorization": this.authorization
            }
        });
    }

    downvoteAnswer(id) {
        return fetch(BASE_URL + "/answers/" + id + "/downvote", {
            method: "PUT",
            headers: {
                "Authorization": this.authorization
            }
        });
    }
}