import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import {
    EMPTY_SEARCH_MESSAGE,
    NOTHING_FOUND_ERROR,
    MOVIES_GETLIST_ERROR,
    API_ERROR,
    NUMBER_OF_CARDS_TO_SHOW_MOBILE,
    NUMBER_OF_CARDS_TO_SHOW
} from "../../utils/constants";

const Movies = ({
    isLoggedIn,
    isLoading,
    handleDeleteMovie,
    handleAddMovie,
    handleGetMovies,
    showPopup,
    handleError,
    filterMovies,
    myMovies
}) => {

    const [nothingIsFound, setNothingIsFound] = React.useState(false);
    const [errorText, setErrorText] = React.useState(NOTHING_FOUND_ERROR);
    const [moviesListFiltered, setMoviesFiltered] = React.useState([]);
    const [moviesListOnScreen, setMoviesListOnScreen] = React.useState([]);
    const [showMore, setShowMore] = React.useState(false);

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

    // определение лайков
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

    // при получении результата поиска
    const onGetFilteredMovies = (movies) => {
        const filteredResultWithLikes = populateWithLikes(movies);
        setMoviesFiltered(filteredResultWithLikes);
        const moviesToShow = getPortionOfMovies(filteredResultWithLikes, 0);
        setMoviesListOnScreen(moviesToShow);
        return moviesToShow;
    }

    const handleSearch = async (searchParam, shortFilter) => {
        setErrorText(NOTHING_FOUND_ERROR);
        localStorage.setItem('searchParam', searchParam);
        localStorage.setItem('shortFilter', shortFilter);
        if (searchParam === '') {
            showPopup(EMPTY_SEARCH_MESSAGE, true, true);
            return;
        }
        let movies = JSON.parse(localStorage.getItem('beatFilmsList'));
        if (!movies) {
            try {
                movies = await handleGetMovies();
            } catch (err) {
                handleError(MOVIES_GETLIST_ERROR);
                console.log(err);
                return;
            }
        }

        if (!movies) {
            setErrorText(API_ERROR);
            setNothingIsFound(true);
            return;
        }
        const filteredResult = filterMovies(movies, searchParam, shortFilter);
        const filteredResultWithLikes = populateWithLikes(filteredResult);
        localStorage.setItem('moviesListFiltered', JSON.stringify(filteredResultWithLikes));
        const moviesToShow = onGetFilteredMovies(filteredResultWithLikes);
        if (moviesToShow.length === 0) {
            setNothingIsFound(true);
        }
    }

    React.useEffect(() => {
        populateWithLikes(moviesListFiltered);
        populateWithLikes(moviesListOnScreen);
    }, [myMovies.length])

    React.useEffect(() => {
        checkShowMore();
    }, [moviesListOnScreen.length])

    // инициализация при логине\разлогине
    React.useEffect(() => {
        if (isLoggedIn) {
            const films = JSON.parse(localStorage.getItem('moviesListFiltered'));
            if (films) {
                onGetFilteredMovies(films);
            }
        }
    }, [isLoggedIn]);

    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
            />
            <SearchBar
                handleSearch={handleSearch}
                onShortsChange={handleSearch}
                restoreValues={true}
            />
            {isLoading ?
                <Preloader /> :
                <MoviesCardList
                    isSavedMovies={false}
                    moviesList={moviesListOnScreen}
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