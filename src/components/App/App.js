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
  PROFILE_ERROR_MESSAGE,
  PROFILE_SUCCESS_MESSAGE,
  EMPTY_SEARCH_MESSAGE
} from '../../utils/constants.js'
import moviesApi from '../../utils/MoviesApi';

function App() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  const [apiMessage, setApiMessage] = React.useState('');
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [myMovies, setMyMovies] = React.useState([]);
  const [myMoviesFiltered, setMyMoviesFiltered] = React.useState([]);
  const [MoviesList, setMovies] = React.useState([]);
  const [MoviesListFiltered, setMoviesFiltered] = React.useState([]);



  // функциональность для работы с API
  const checkToken = async () => {
    const user = await mainApi.auth();
    if (user._id) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      return true;
    }
    return false;
  }

  const handleLogin = async ({ password, email }) => {
    setIsLoading(true);
    try {
      await mainApi.login(password, email);
      await checkToken();
      setIsLoading(false);
    } catch (err) {
      handleError(AUTH_ERROR);
      console.log(err);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }

  const handleRegister = async ({ name, email, password }) => {
    console.log(name, email, password);
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
      navigate("/");
    } catch (err) {
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

  const handleAddMovie = async (data) => {
    try {
      const res = await mainApi.addMovie(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteMovie = async (_id) => {
    try {
      await mainApi.deleteMovie(_id);
      const newMyMovies = myMovies.filter((movie) => {
        return movie._id !== _id;
      });
      const newMyMoviesFiltered = myMoviesFiltered.filter((movie) => {
        return movie._id !== _id;
      });
      setMyMovies(newMyMovies);
      setMyMoviesFiltered(newMyMoviesFiltered);
    } catch (err) {
      console.log(err);
    }
  }

  const handleGetMovies = async () => {
    try {
      return await moviesApi.getMovies();
    } catch (err) {
      console.log(err);
    }
  }

  const handleGetMyMovies = async () => {
    try {
      const data = await mainApi.getMovies();
      setMyMovies(data);
      setMyMoviesFiltered(data);
    } catch (err) {
      console.log(err);
    }
  }

  const closePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => {
      setIsError(false);
      setApiMessage('');
    }, 700);
  }

  const showPopup = (text, isError, closeAuto = false) => {
    setIsPopupOpen(true);
    setApiMessage(text);
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

  // функциональность для работы с фильмами 

  const filterMovies = (moviesList, searchParam, shortFilter) => {
    
    let result = moviesList;

    if (searchParam !== '') {
      result = moviesList.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchParam) || movie.nameEN.toLowerCase().includes(searchParam);
      })
    }
        
    if (shortFilter === true) {
      result = result.filter((movie) => {   
        return movie.duration <= 40;
      })
    }

    return result;
  }

  const handleSearch = (searchParam, shortFilter) => {

  }

  const handleSearchMyMovies = (searchParam, shortFilter) => {
    const filteredResult = filterMovies(myMovies, searchParam, shortFilter);
    setMyMoviesFiltered(filteredResult);
  }

  React.useEffect(() => {
    checkToken()
  }, []);

  React.useEffect(() => {
    handleGetMyMovies();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path='/'
            element={<Main
              isLoggedIn={isLoggedIn}
            />
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                Component={Movies}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                handleAddMovie={handleAddMovie}
                handleDeleteMovie={handleDeleteMovie}
                handleSearch={handleSearch}
                moviesList={MoviesListFiltered}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={<ProtectedRoute
              Component={SavedMovies}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              handleDeleteMovie={handleDeleteMovie}
              moviesList={myMoviesFiltered}
              handleSearch={handleSearchMyMovies}
            />
            }
          />
          <Route
            path='/profile'
            element={<ProtectedRoute
              Component={Profile}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              handleUpdateUser={handleUpdateUser}
            />
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
        </Routes>
        <PopupWithMessage
          isError={isError}
          popupText={apiMessage}
          isOpen={isPopupOpen}
          onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;