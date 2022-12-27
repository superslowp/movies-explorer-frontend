import { MOVIES_BASE_URL, HEADERS } from './constants';

class MoviesApi {
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

    async getMovies() {
        const data = await fetch(`${this._baseUrl}`, {
            method: "GET",
            headers: this._headers
        })
        return this._handleResponse(data);
    }  
}

const moviesApi = new MoviesApi({
    baseUrl: MOVIES_BASE_URL,
    headers: HEADERS
});

export default moviesApi;