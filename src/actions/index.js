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
    const response = await spotify.get('v1/me/playlists?limit=5', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    console.log(response);
    dispatch({type: 'FETCH_USER_PLAYLISTS', payload: response.data.items})
}
export const fetchUserFollowedArtists = (token) => async dispatch => {
    const response = await spotify.get('v1/me/following?type=artist&limit=5', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    console.log(response);
    dispatch({type: 'FETCH_USER_FOLLOWED_ARTISTS', payload: response.data.artists.items})
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
export const fetchCurrentUserSavedAlbums = (token) => async dispatch => {
    const response = await spotify.get('v1/me/albums?limit=5', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    console.log(response);
    dispatch({type: 'FETCH_CURRENT_USER_SAVED_ALBUMS', payload: response.data.items})
}
export const fetchCurrentUserSavedTracks = (token) => async dispatch => {
    const response = await spotify.get('v1/me/tracks?limit=5', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    console.log(response);
    dispatch({type: 'FETCH_CURRENT_USER_SAVED_TRACKS', payload: response.data.items})
}
export const fetchSinglePlaylist = (playlistId, token) => async dispatch => {
    const response = await spotify.get(`v1/playlists/${playlistId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    console.log(response);
    dispatch({type: 'FETCH_SINGLE_PLAYLIST', payload: response.data})
}
export const fetchArtistInfo = (artistId,token) => async dispatch => {
    const artistInfo = await spotify.get(`v1/artists/${artistId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    const artistAlbums = await spotify.get(`v1/artists/${artistId}/albums`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    const artistTopTracks = await spotify.get(`v1/artists/${artistId}/top-tracks?country=PL`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    const artistRelatedArtists = await spotify.get(`v1/artists/${artistId}/related-artists?limit=10`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    dispatch({ 
        type: 'FETCH_ARTIST_INFO',
        payload: {
            "artistInfo": artistInfo.data,
            "artistAlbums": artistAlbums.data.items,
            "artistTopTracks": artistTopTracks.data.tracks,
            "artistRelatedArtists": artistRelatedArtists.data.artists
        }
    })
}

export const fetchSingleAlbum = (albumId, token) => async dispatch => {
    const response = await spotify.get(`v1/albums/${albumId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    dispatch({type: 'FETCH_SINGLE_ALBUM', payload: response.data})
}

export const searchInformation = (formValues,token) => async dispatch => {
    console.log(formValues);
    const response = await spotify.get(`/v1/search?q=${formValues.search}&type=${formValues.category.value}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    dispatch({ type: 'SEARCH_INFORMATION', payload: response.data});

}