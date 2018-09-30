import { connect } from "react-redux";
import List from '../screens/List';
import { getFilms } from '../data/apiActions'

const mapStateToProps = state => {
    return {
        totalFilmData: state.totalFilmData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoad: () => dispatch(getFilms()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);