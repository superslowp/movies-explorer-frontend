import { BASE_URL, HEADERS } from './constants';

class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse = async (data) => {
        const res = await data.json()
        if (data.ok) {
            return res
        } else {
            return Promise.reject(res);
        }
    }

    async register(name, email, password) {
        const data = await fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password,
                email,
                name
            })
        })
        return this._handleResponse(data);
    }

    async login(password, email) {
        const data = await fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                password,
                email
            })
        })
        return this._handleResponse(data);
    }

    async signout() {
        const data = await fetch(`${this._baseUrl}/signout`, {
            method: "GET",
            headers: this._headers,
            credentials: 'include'
        })
        return this._handleResponse(data);
    }

    async auth() {
        const data = await fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: this._headers,
        })
        return this._handleResponse(data);
    }

    async updateUserInfo({ name, email }) {
        const data = await fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name,
                email
            })
        })
        return this._handleResponse(data);
    }

    async getMovies() {
        const data = await fetch(`${this._baseUrl}/movies`, {
            method: "GET",
            credentials: 'include',
            headers: this._headers
        })
        return this._handleResponse(data);
    }

    async addMovie(movieData) {
        const data = await fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                ...movieData
            })
        })
        return this._handleResponse(data);
    }

    async deleteMovie(_id) {
        const data = await fetch(`${this._baseUrl}/movies/${_id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers            
        })
        return this._handleResponse(data);
    }
}

const mainApi = new MainApi({
    baseUrl: BASE_URL,
    headers: HEADERS
});

export default mainApi;