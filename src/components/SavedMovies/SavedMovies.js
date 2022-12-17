import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = () => {
    return (
        <>
            <Header
                isLoggedIn={true}
            />
            <SearchBar />
            <MoviesCardList
                isSavedMovies={true}
            />
            <Footer />
        </>
    )
};

export default SavedMovies;