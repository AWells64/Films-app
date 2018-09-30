import axios from '../axios';
import { setFilms } from './stateActions';

export const getFilms = () => dispatch => {
    axios.get('/films/').then(({data}) => {
        dispatch(setFilms(data));
    });
};