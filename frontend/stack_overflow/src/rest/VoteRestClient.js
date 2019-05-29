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
        }).then(response => response.status);
    }

    downvoteQuestion(id) {
        return fetch(BASE_URL + "/questions/" + id + "/downvote", {
            method: "PUT",
            headers: {
                "Authorization": this.authorization
            }
        }).then(response => response.status);
    }

    upvoteAnswer(id) {
        return fetch(BASE_URL + "/answers/" + id + "/upvote", {
            method: "PUT",
            headers: {
                "Authorization": this.authorization
            }
        }).then(response => response.status);
    }

    downvoteAnswer(id) {
        return fetch(BASE_URL + "/answers/" + id + "/downvote", {
            method: "PUT",
            headers: {
                "Authorization": this.authorization
            }
        }).then(response => response.status);
    }
}