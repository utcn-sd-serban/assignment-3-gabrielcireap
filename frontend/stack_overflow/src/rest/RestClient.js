const BASE_URL = "http://localhost:8080";

export default class RestClient {
    constructor(username, password) {
        this.authorization = "Basic " + btoa(username + ":" + password);
    }

    loadUsers() {
        return fetch(BASE_URL + "/users", {
            method: "GET",
            headers: {
                "Authorization": this.authorization
            }
        }).then(response => response.json());
    }

    getLoggedUser(username, password) {
        let userRegisterDTO = {
            username: username,
            password: password,
            email: "",
            score: "",
            isAdmin: "",
            isBanned: ""
        };

        return fetch(BASE_URL + "/login", {
            method: "POST",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRegisterDTO)
        }).then(response => response.json());
    }
}