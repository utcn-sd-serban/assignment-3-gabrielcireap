const BASE_URL = "http://localhost:8080";

export default class RestClient {
    constructor(username, password) {
        this.authorization = "Basic " + btoa(username + ":" + password);
    }

    loadUsers() {
        return fetch(BASE_URL + "/users", {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    ban(id) {
        return fetch(BASE_URL + "/users/ban/" + id, {
            method: "PUT",
            headers: {
                "Authorization": this.authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    register(username, password, email) {
        let userRegisterDTO = {
            username,
            password,
            email,
            score: 0,
            isAdmin: false,
            isBanned: false
        }

        return fetch(BASE_URL + "/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRegisterDTO)
        }).then(response => response.status);
    }

    login(username, password) {
        return fetch(BASE_URL + "/login", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }
}