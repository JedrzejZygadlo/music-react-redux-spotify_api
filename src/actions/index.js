import spotify from '../apis/spotify';

export const setToken = (token) => {
    return{ 
        type: 'SET_TOKEN',
        payload: token    
    }
}

export const fetchUserProfile = (token) => async dispatch => {
    const response = await spotify.get('v1/me', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    console.log(response.data);
    dispatch({type: 'FETCH_USER_PROFILE', payload: response.data})
}

export const fetchUserPlaylists = (token) => async dispatch => {
    const response = await spotify.get('v1/me/playlists', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    console.log(response);
    dispatch({type: 'FETCH_USER_PLAYLISTS', payload: response.data})
}

export const fetchUserCurrentPlayback = (token) => async dispatch => {
    const response = await spotify.get('v1/me/player', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    console.log(response);
    dispatch({type: 'FETCH_USER_CURRENT_PLAYBACK', payload: response.data})
}