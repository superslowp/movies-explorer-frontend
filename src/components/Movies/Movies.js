import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const Movies = () => {
    return (
        <>
            <Header
                isLoggedIn={true}
            />
            <SearchBar />
            <MoviesCardList
                isSavedMovies={false}
            />
            <Footer />
        </>
    )
};

export default Movies;