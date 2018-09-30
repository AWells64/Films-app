const setFilmsToList = (state, films) => {
    return {
        ...state,
        totalFilmData: [
            ...state.totalFilmData,
            ...films
        ]
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'setFilms': return setFilmsToList(state, action.films)
        default: return state;
    }
}

export default reducer;