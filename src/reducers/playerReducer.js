export default (state = {}, action) => {
    switch(action.type){
        case 'SAVE_DEVICE_ID':
            return {...state, deviceId: action.playload}
        case 'PLAY' :
            return {...state, isPlaying: true }
        case 'SET_CURRENT_TRACK':
            return {...state, currentTrack: {name: action.payload.name, artist: action.payload.artists[0].name, image: action.payload.album.images[0].url}}
        case 'CHANGE_TO_PLAYING':
            return {...state, isPlaying: true}
        case 'CHANGE_TO_PAUSED':
            return {...state, isPlaying: false}
        default:
        return state
    }

}