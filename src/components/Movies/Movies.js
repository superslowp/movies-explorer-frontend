import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

const Movies = ({ isLoading, moviesList, handleSearch, handleDeleteMovie, handleAddMovie }) => {

    return (
        <>
            <Header
                isLanding={false}
            />
            <SearchBar
                handleSearch={handleSearch}
            />
            {isLoading ? 
                <Preloader/> :
                <MoviesCardList
                    isSavedMovies={false}
                    moviesList={moviesList}
                    handleDeleteMovie={handleDeleteMovie}
                    handleAddMovie={handleAddMovie}
                />
            }
            <Footer />
        </>
    )
};

export default Movies;