import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = ({ isLoggedIn,
    moviesList,
    handleDeleteMovie,
    handleSearch,
    nothingIsFound,
    onShortsChange,
    errorText
}) => {
    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
            />
            <SearchBar
                handleSearch={handleSearch}
                onShortsChange={onShortsChange}
            />
            <MoviesCardList
                isSavedMovies={true}
                moviesList={moviesList}
                handleDeleteMovie={handleDeleteMovie}
                nothingIsFound={nothingIsFound}
                errorText={errorText}
            />
            <Footer />
        </>
    )
};

export default SavedMovies;