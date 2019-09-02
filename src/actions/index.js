import spotify from '../apis/spotify';


export const signIn = () => async (dispatch,getState) => {
    const client_id = '8a99f92ef2034f8db7feeef6a68beda7';
    const response_type = 'token';
    const redirect_uri = 'http://localhost:3000/user';
    const response = await spotify.get(`https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`);
    dispatch({type: 'SIGN_IN', payload: response});
};


export const setToken = (token) => {
    return{ 
        type: 'SET_TOKEN',
        payload: token    
    }
}

