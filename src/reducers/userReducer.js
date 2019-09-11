export default (state = {}, action) => {
    switch(action.type){
        case 'FETCH_USER_PROFILE':
            return {...state, profile: action.payload};
        case 'FETCH_USER_PLAYLISTS':
            return {...state, playlists: action.payload};
        case 'FETCH_USER_FOLLOWED_ARTISTS':
            return {...state, artists: action.payload};
        case 'FETCH_CURRENT_USER_SAVED_ALBUMS':
            return {...state, albums: action.payload};
        case 'FETCH_CURRENT_USER_SAVED_TRACKS':
            return {...state, tracks: action.payload};
        case 'FETCH_USER_CURRENT_PLAYBACK':
            return {...state, playback: action.payload};
        case 'FETCH_SINGLE_PLAYLIST':
            return {...state, singlePlaylist: action.payload}
        case 'FETCH_SINGLE_ALBUM':
            return {...state, singleAlbum: action.payload}
        case 'FETCH_ARTIST_INFO':
            return {...state, singleArtist: action.payload}
        case 'SEARCH_INFORMATION':
            return {...state, searchInfo: action.payload}
        default: 
            return state;
    }
}