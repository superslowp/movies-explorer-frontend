import React from "react";
import "./SearchBar.css"

const SearchBar = ({ handleSearch }) => {

    const [searchParam, setSearchParam] = React.useState('');
    const [shortFilter, setShortFilter] = React.useState(false);

    const onSearchChange = (e) => {
        setSearchParam(e.target.value);
    }

    const onShortFilterChange = (e) => {
        setShortFilter(e.target.checked);
        handleSearch(searchParam, e.target.checked);
    }

    const submitSearch = (e) => {
        e.preventDefault();
        handleSearch(searchParam, shortFilter);
    }

/*    React.useEffect(() => {
        const shortFilter = JSON.parse(localStorage.getItem('isChecked'))
        const searchParam = localStorage.getItem('inputValue')
        if (shortFilter) {
            setShortFilter(shortFilter)
        }
        if (searchParam) {
            setSearchParam(searchParam)
        }
    }, []) */

    return (
        <form
            className="searchbar"
            onSubmit={submitSearch}
        >
            <fieldset className="searchbar__wrapper">
                <input
                    name="movie"
                    type="text"
                    className='searchbar__input'
                    placeholder="Фильм"
                    onChange={onSearchChange}
                    value={searchParam || ''}
                />
                <button
                    className="searchbar__button"
                    type="submit"
                />
            </fieldset>
            <div className="searchbar__line" />
            <div className="searchbar__checkbox-wrapper">
                <input
                    className="searchbar__checkbox"
                    type='checkbox'
                    name="shortFilm"
                    onChange={onShortFilterChange}
                    checked={shortFilter}
                />
                <span className="searchbar__checkbox-label">Короткометражки</span>
            </div>
        </form>
    );
};

export default SearchBar;