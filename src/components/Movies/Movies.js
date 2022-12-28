import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

const Movies = ({ isLoggedIn,
    isLoading,
    moviesList,
    handleSearch,
    handleDeleteMovie,
    handleAddMovie,
    nothingIsFound,
    showMore,
    handleGetMoreMovies,
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
            {isLoading ?
                <Preloader /> :
                <MoviesCardList
                    isSavedMovies={false}
                    moviesList={moviesList}
                    handleDeleteMovie={handleDeleteMovie}
                    handleAddMovie={handleAddMovie}
                    nothingIsFound={nothingIsFound}
                    showMore={showMore}
                    handleGetMoreMovies={handleGetMoreMovies}
                    errorText={errorText}
                />
            }
            <Footer />
        </>
    )
};

export default Movies;