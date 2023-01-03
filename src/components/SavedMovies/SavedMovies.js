import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { EMPTY_SEARCH_MESSAGE, NOTHING_FOUND_ERROR } from "../../utils/constants";
const SavedMovies = ({ isLoggedIn,
    moviesList,
    handleDeleteMovie,
    filterMovies,
    showPopup
}) => {

    const [myMoviesFiltered, setMyMoviesFiltered] = React.useState([]);
    const [nothingIsFound, setNothingIsFound] = React.useState(false);
    const [errorText, setErrorText] = React.useState(NOTHING_FOUND_ERROR);

    const handleSearch = (searchParam, shortFilter, allowEmpty = false) => {
        if (!allowEmpty && searchParam === '') {
            showPopup(EMPTY_SEARCH_MESSAGE, true, true);
            return;
        }
        setErrorText(NOTHING_FOUND_ERROR);
        setNothingIsFound(false);
        const filteredResult = filterMovies(moviesList, searchParam, shortFilter);
        setMyMoviesFiltered(filteredResult);
        if (filteredResult.length === 0) {
            setNothingIsFound(true);
        }
    }

    const onShortsChange = (searchParam, shortFilter) => {
        handleSearch(searchParam, shortFilter, true);
    }

    React.useEffect(() => {
        setMyMoviesFiltered(moviesList);
    }, [moviesList]);

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
                moviesList={myMoviesFiltered}
                handleDeleteMovie={handleDeleteMovie}
                nothingIsFound={nothingIsFound}
                errorText={errorText}
            />
            <Footer />
        </>
    )
};

export default SavedMovies;