export const client_id = ''; // TUTAJ WPISZ SWOJE ID z SPOTIFY_API
export const response_type = 'token';
export const redirect_uri = 'http://localhost:3000/user';
export const scopes = [
    "playlist-read-private",
    "user-read-playback-state",
    "user-read-private",
    "user-read-email",
    "user-follow-read",
    "user-library-read"
];