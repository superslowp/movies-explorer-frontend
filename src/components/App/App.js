import React from 'react';
import './App.css';
import './App.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useNavigate, Route, Routes } from 'react-router-dom';
import mainApi from '../../utils/MainApi.js';
import {
  CONFLICT_ERROR,
  REGISTRATION_ERROR,
  AUTH_ERROR,
  LOGOUT_ERROR,
  MOVIE_ADD_ERROR,
  MOVIE_DELETE_ERROR,
  MOVIE_GET_ERROR,
  PROFILE_ERROR_MESSAGE,
  PROFILE_SUCCESS_MESSAGE,
  MOVIES_IMAGE_URL,
  SHORT_MOVIE_DURATION,
  NOT_AUTHORIZED_TEXT
} from '../../utils/constants.js'
import moviesApi from '../../utils/MoviesApi';

function App() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  const [popupMessage, setPopupMessage] = React.useState('');
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [myMovies, setMyMovies] = React.useState([]);
  const [isReady, setIsReady] = React.useState(false);

  const handleLogin = async ({ password, email }) => {
    setIsLoading(true);
    try {
      await mainApi.login(password, email);
      const user = await mainApi.auth();
      if (user._id) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      }
      await handleGetMyMovies();
      //onGetFilteredMovies(moviesListFiltered);
      setIsLoading(false);
    } catch (err) {
      handleError(AUTH_ERROR);
      console.log(err);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }

  const handleRegister = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      await mainApi.register(name, email, password);
      await handleLogin({ password, email })
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err.message.includes("Пользователь с таким email уже существует!")) {
        handleError(CONFLICT_ERROR);
        return;
      }
      handleError(REGISTRATION_ERROR);
      console.log(err);
      setIsLoading(false);
    };
  }

  const handleLogout = async () => {
    try {
      await mainApi.signout();
      onLogout();
    } catch (err) {
      handleError(LOGOUT_ERROR);
      checkIfUnauthorized(err);
      console.log(err);
    }
  }

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    setCurrentUser(null);
    setPopupMessage('');
    setIsPopupOpen(false);
    setMyMovies([]);
    navigate("/");
  }

  const handleUpdateUser = async (data) => {
    try {
      const user = await mainApi.updateUserInfo(data);
      setCurrentUser(user);
      showPopup(PROFILE_SUCCESS_MESSAGE, false)
    } catch (err) {
      handleError(PROFILE_ERROR_MESSAGE);
      checkIfUnauthorized(err);
      console.log(err);
    }
  }

  const handleAddMovie = async (data) => {
    const newMovie = {
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      director: data.director,
      country: data.country,
      year: data.year,
      duration: data.duration,
      description: data.description,
      image: MOVIES_IMAGE_URL + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail: MOVIES_IMAGE_URL + data.thumbnail
    }
    try {
      const res = await mainApi.addMovie(newMovie);
      if (res._id) {
        setMyMovies([...myMovies, res]);
        return res;
      }
    } catch (err) {
      handleError(MOVIE_ADD_ERROR);
      checkIfUnauthorized(err);
      console.log(err);
    }
  }

  const handleDeleteMovie = async (_id) => {
    try {
      const res = await mainApi.deleteMovie(_id);
      if (!res) {
        throw new Error();
      }
      const newMyMovies = myMovies.filter((movie) => {
        return movie._id !== _id;
      });
      setMyMovies(newMyMovies);
      return true;
    } catch (err) {
      handleError(MOVIE_DELETE_ERROR);
      checkIfUnauthorized(err);
      console.log(err);
      return false;
    }
  }

  const handleGetMovies = async () => {
    try {
      setIsLoading(true);
      const movies = await moviesApi.getMovies();
      localStorage.setItem('beatFilmsList', JSON.stringify(movies))
      return movies;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const handleGetMyMovies = async () => {
    try {
      const data = await mainApi.getMovies();
      setMyMovies(data);
    } catch (err) {
      handleError(MOVIE_GET_ERROR);
      checkIfUnauthorized(err);
      console.log(err);
    }
  }

  const closePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => {
      setIsError(false);
      setPopupMessage('');
    }, 700);
  }

  const showPopup = (text, isError, closeAuto = false) => {
    setIsPopupOpen(true);
    setPopupMessage(text);
    setIsError(isError);
    if (closeAuto) {
      setTimeout(() => {
        closePopup();
      }, 1000);
    }
  }

  const checkIfUnauthorized = (err) => {
    if (err?.message === NOT_AUTHORIZED_TEXT) {
      setTimeout(onLogout, 2000);      
    }
  }

  const handleError = (errText) => {
    showPopup(errText, true)
  }

  const searchByTitle = (movies, searchParam) => {
    if (searchParam !== '') {
      return movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchParam) || movie.nameEN.toLowerCase().includes(searchParam);
      })
    }
    return movies;
  }

  const searchByShort = (movies, shortFilter) => {
    if (shortFilter === true) {
      return movies.filter((movie) => {
        return movie.duration <= SHORT_MOVIE_DURATION;
      })
    }
    return movies;
  }

  const filterMovies = (movies, searchParam, shortFilter) => {
    setIsLoading(true);
    const filteredByName = searchByTitle(movies, searchParam);
    const filteredByShort = searchByShort(filteredByName, shortFilter);
    setIsLoading(false);
    return filteredByShort;
  }

  // инициализация
  React.useEffect(() => {
    setIsReady(false);
    mainApi.auth()
      .then((user) => {
        if (user._id) {
          setIsLoggedIn(true);
          setCurrentUser(user);
        } else {
          setIsLoggedIn(false);
          setCurrentUser({});
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsReady(true)
        }
          , 500);
      });
  }, []);

  // инициализация при логине\разлогине
  React.useEffect(() => {
    if (isLoggedIn) {
      handleGetMyMovies()
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isReady && <div className="App">
        <Routes>
          <Route
            path='/movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  handleDeleteMovie={handleDeleteMovie}
                  handleAddMovie={handleAddMovie}
                  handleGetMovies={handleGetMovies}
                  showPopup={showPopup}
                  handleError={handleError}
                  filterMovies={filterMovies}
                  myMovies={myMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies
                  isLoggedIn={isLoggedIn}
                  handleDeleteMovie={handleDeleteMovie}
                  moviesList={myMovies}
                  showPopup={showPopup}
                  filterMovies={filterMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  isLoggedIn={isLoggedIn}
                  handleLogout={handleLogout}
                  handleUpdateUser={handleUpdateUser}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                handleRegister={handleRegister}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                handleLogin={handleLogin}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='*'
            element={<NotFound />}
          />
          <Route
            path='/'
            element={<Main
              isLoggedIn={isLoggedIn}
            />
            }
          />
        </Routes>
        <PopupWithMessage
          isError={isError}
          popupText={popupMessage}
          isOpen={isPopupOpen}
          onClose={closePopup} />
      </div>}
    </CurrentUserContext.Provider>
  );
}

export default App;