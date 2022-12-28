export const BASE_URL = "https://api.slowmovies.nomoredomains.club";
//export const BASE_URL = "http://127.0.0.1:3000";

export const MOVIES_BASE_URL = "https://api.nomoreparties.co/beatfiflm-movies";
export const MOVIES_IMAGE_URL = "https://api.nomoreparties.co/";

export const HEADERS = {    
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}


export const CONFLICT_ERROR = 'Пользователь с таким email уже существует';
export const REGISTRATION_ERROR  = 'При регистрации пользователя произошла ошибка';
export const AUTH_ERROR = 'Вы ввели неправильный логин или пароль';
export const PROFILE_ERROR_MESSAGE = 'При обновлении профиля произошла ошибка';
export const PROFILE_SUCCESS_MESSAGE = 'Данные успешно изменены!';
export const LOGOUT_ERROR = "Ошибка при выходе из профиля";
export const MOVIE_ADD_ERROR = "Ошибка при добавлении фильма";
export const MOVIE_DELETE_ERROR = "Ошибка при удалении фильма";
export const MOVIE_GET_ERROR = "Ошибка при получении списка сохраненных фильмов";
export const MOVIES_GETLIST_ERROR = "Ошибка при получении списка фильмов c Beatfilm";
export const API_ERROR = "Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
export const NOTHING_FOUND_ERROR = "Ничего не найдено";

export const EMPTY_SEARCH_MESSAGE = 'Нужно ввести ключевое слово';