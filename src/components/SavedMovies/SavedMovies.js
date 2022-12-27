import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = ({ moviesList, handleDeleteMovie, handleSearch }) => {
    return (
        <>
            <Header
                isLanding={false}
            />
            <SearchBar 
                handleSearch={handleSearch}
            />
            <MoviesCardList
                isSavedMovies={true}
                moviesList={moviesList}
                handleDeleteMovie={handleDeleteMovie}
            />
            <Footer />
        </>
    )
};

export default SavedMovies;