const INITIAL_STATE = {
    token: null,
    isSignedIn: null
};
export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_TOKEN':
            return { ...state, token: action.payload, isSignedIn: true };
        default:
            return state;
    }   
};