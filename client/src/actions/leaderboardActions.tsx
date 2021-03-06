import axios from 'axios';
import { GET_LEADERBOARD, LEADERBOARD_LOADING, GET_ERRORS } from './types';
import { Dispatch } from 'redux';

export const getLeaderboard = (_id: string) => async(dispatch: Dispatch) => {
    
    try {

        dispatch(setLeaderboardLoading());

        let res = await axios.get(`/api/leaderboard/${_id}`);

        dispatch({
            type: GET_LEADERBOARD,
            payload: res.data
        });

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const setLeaderboardLoading = () => {

    return {
        type: LEADERBOARD_LOADING
    }
}