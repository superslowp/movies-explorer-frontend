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
  MOVIES_GETLIST_ERROR,
  PROFILE_ERROR_MESSAGE,
  PROFILE_SUCCESS_MESSAGE,
  EMPTY_SEARCH_MESSAGE,
  MOVIES_IMAGE_URL,
  API_ERROR,
  NOTHING_FOUND_ERROR,
  NUMBER_OF_CARDS_TO_SHOW,
  NUMBER_OF_CARDS_TO_SHOW_MOBILE,
  SHORT_MOVIE_DURATION
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
  const [moviesListFiltered, setMoviesFiltered] = React.useState([]);
  const [moviesListOnScreen, setMoviesListOnScreen] = React.useState([]);

  const [nothingIsFound, setNothingIsFound] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);

  const [errorText, setErrorText] = React.useState(NOTHING_FOUND_ERROR);
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
      onGetFilteredMovies(moviesListFiltered);
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
      setIsLoggedIn(false);
      localStorage.clear();
      setCurrentUser(null);
      setMoviesFiltered([]);
      setPopupMessage('');
      setIsPopupOpen(false);
      setMyMovies([]);
      setMoviesListOnScreen([]);
      setNothingIsFound(false);
      navigate("/");
    } catch (err) {
      handleError(LOGOUT_ERROR);
      console.log(err);
    }

  }

  const handleUpdateUser = async (data) => {
    try {
      const user = await mainApi.updateUserInfo(data);
      setCurrentUser(user);
      showPopup(PROFILE_SUCCESS_MESSAGE, false)
    } catch (err) {
      handleError(PROFILE_ERROR_MESSAGE);
      console.log(err);
    }
  }

  const populateWithLikes = (movies) => {
    return movies.map((movie) => {
      const foundMovie = myMovies.find((myMovie) => {
        return myMovie.movieId === movie.id
      });
      if (foundMovie) {
        movie.isLiked = true;
        movie._id = foundMovie._id;
      } else {
        movie.isLiked = false;
      }
      return movie;
    })
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
      handleError(MOVIE_ADD_ERROR)
      console.log(err);
    }
  }

  const handleDeleteMovie = async (_id) => {
    try {
      const res = await mainApi.deleteMovie(_id);
      if (!res) {
        throw new Error;
      }
      const newMyMovies = myMovies.filter((movie) => {
        return movie._id !== _id;
      });
      setMyMovies(newMyMovies);
      return true;
    } catch (err) {
      handleError(MOVIE_DELETE_ERROR);
      console.log(err);
      return false;
    }
  }

  const handleGetMovies = async () => {
    try {
      const movies = await moviesApi.getMovies();
      localStorage.setItem('beatFilmsList', JSON.stringify(movies))
      return movies;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const handleGetMyMovies = async () => {
    try {
      const data = await mainApi.getMovies();
      setMyMovies(data);
    } catch (err) {
      handleError(MOVIE_GET_ERROR);
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

  const handleError = (errText) => {
    showPopup(errText, true)
  }

  // нарезка массива
  const getNumberOfFilmsOnPage = () => {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth <= 767) {
      return NUMBER_OF_CARDS_TO_SHOW_MOBILE;
    }
    else {
      return NUMBER_OF_CARDS_TO_SHOW;
    }
  }

  const handleGetMoreMovies = () => {
    const portion = getPortionOfMovies(moviesListFiltered, moviesListOnScreen.length);
    setMoviesListOnScreen(moviesListOnScreen.concat(portion));
  }

  const getPortionOfMovies = (movies, startPos) => {
    return movies.slice(startPos, startPos + getNumberOfFilmsOnPage());
  }

  const checkShowMore = () => {
    if (moviesListFiltered.length === moviesListOnScreen.length) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  }

  // функции для поиска
  const checkIfNothingIsFound = (movies) => {
    if (movies.length === 0) {
      setNothingIsFound(true);
    }
  }

  const checkSearchParam = (searchParam) => {
    if (searchParam === '') {
      showPopup(EMPTY_SEARCH_MESSAGE, true, true);
      return false;
    }
    return true;
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

  const handleSearch = async (searchParam, shortFilter) => {
    setErrorText(NOTHING_FOUND_ERROR);
    localStorage.setItem('searchParam', searchParam);
    localStorage.setItem('shortFilter', shortFilter);
    if (!checkSearchParam(searchParam)) {
      return;
    }
    setIsLoading(true);
    let movies = JSON.parse(localStorage.getItem('beatFilmsList'));
    if (!movies) {
      try {
        movies = await handleGetMovies();
      } catch (err) {
        handleError(MOVIES_GETLIST_ERROR);
        console.log(err);
        setIsLoading(false);
        return;
      }
    }

    if (!movies) {
      setErrorText(API_ERROR);
      setNothingIsFound(true);
      setIsLoading(false);
      return;
    }
    const filteredResult = filterMovies(movies, searchParam, shortFilter);
    const filteredResultWithLikes = populateWithLikes(filteredResult);
    localStorage.setItem('moviesListFiltered', JSON.stringify(filteredResultWithLikes));
    const moviesToShow = onGetFilteredMovies(filteredResultWithLikes);
    checkIfNothingIsFound(moviesToShow);
    setIsLoading(false);
  }

  const onGetFilteredMovies = (movies) => {
    const filteredResultWithLikes = populateWithLikes(movies);
    setMoviesFiltered(filteredResultWithLikes);
    const moviesToShow = getPortionOfMovies(filteredResultWithLikes, 0);
    setMoviesListOnScreen(moviesToShow);
    return moviesToShow;
  }

  React.useEffect(() => {
    checkShowMore();
  }, [moviesListOnScreen.length])

  React.useEffect(() => {
    populateWithLikes(moviesListFiltered);
    populateWithLikes(moviesListOnScreen);
  }, [myMovies.length])

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
        .then(() => {
          const films = JSON.parse(localStorage.getItem('moviesListFiltered'));
          if (films) {
            onGetFilteredMovies(films);
          }
        })
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
                  handleAddMovie={handleAddMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  handleSearch={handleSearch}
                  moviesList={moviesListOnScreen}
                  nothingIsFound={nothingIsFound}
                  showMore={showMore}
                  handleGetMoreMovies={handleGetMoreMovies}
                  onShortsChange={handleSearch}
                  errorText={errorText}
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
                  isLoading={isLoading}
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