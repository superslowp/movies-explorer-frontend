import React from 'react';
import './App.css';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Route, Routes } from 'react-router-dom';
import Profile from '../Profile/Profile';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={<Main />}
        />
        <Route
          path='/movies'
          element={<Movies />}
        />
        <Route
          path='/saved-movies'
          element={<SavedMovies />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
        <Route
          path='/signup'
          element={
            <Register
            />
          }
        />
        <Route
          path='/signin'
          element={
            <Login
            />
          }
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
