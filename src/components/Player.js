import React from 'react';
import { connect } from 'react-redux';
import { saveDeviceId, setCurrentTrack, changeToPaused, changeToPlaying } from '../actions';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//styles
const StyledPlayerBox = styled.div`
    background-color: #3e3e3e;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 90px;
    margin: 15px 0 15px 60px;
`;
const StyledButton = styled.button`
    background-color: transparent;
    border: none;
`;
const StyledCurrentTrackView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const StyledCurrentTrackHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    margin: 0 0.5em;
`;
const StyledTrackName = styled.p`
    font-size: 1em;
    color: white;
    margin: 0.2em;
    font-weight: bold;
`;
const StyledArtistName = styled.p `
    font-size: 1em;
    color: white;
    margin: 0.2em;
    
`;
const StyledTrackImage = styled.img`
    width: 60px;
    height: 60px; 
    margin-left: 10px;
`;

class Player extends React.Component{
    componentDidMount(){
        window.onSpotifyPlayerAPIReady = () => {
            console.log(this.props.token);
            var player = new window.Spotify.Player({
                name: 'Web Playback SDK Template',
                getOAuthToken: cb => { cb(this.props.token); }
            });
            this.player = player
            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });
        
            player.addListener('player_state_changed', state => {
                    this.currentState();
            });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                this.props.saveDeviceId(device_id);
            });

            // Connect to the player!
            player.connect();
        }
    }
    // Play 
    resumeTrack = () => {
        this.player.resume().then(() => {
            
        });
        this.props.changeToPlaying();
    };
    pauseTrack = () => {
        this.player.pause().then(() => {
            
        })
        this.props.changeToPaused();
    }
    currentState = async() => {
        await this.player.getCurrentState().then(state => {
        console.log(state)
        if (!state) {
            console.error('User is not playing music through the Web Playback SDK');
            return;
        }

        let {
            current_track,
            next_tracks: [next_track]
        } = state.track_window;
        console.log(current_track);
        this.props.setCurrentTrack(current_track);
        });
    }
    nextTrack = () => {
        this.player.nextTrack().then(() => {
            console.log('Set to next track!');
        });
    }
    previousTrack = () => {
         this.player.previousTrack().then(() => {
            console.log('Set to previous track!');
        });
    }
    renderCurrentTrack = () => {
        console.log(this.props.currentTrack);
        if(this.props.currentTrack){
            return(
                <StyledCurrentTrackView>
                    <StyledTrackImage src={this.props.currentTrack.image}></StyledTrackImage>
                    <StyledCurrentTrackHeader>
                        <StyledTrackName>{this.props.currentTrack.name}</StyledTrackName>
                        <StyledArtistName>{this.props.currentTrack.artist}</StyledArtistName>
                    </StyledCurrentTrackHeader>
                </StyledCurrentTrackView>
            )
        }
        return null;
    }
    renderPlayPause = () => {
        if(this.props.isPlaying){
            return(
                <StyledButton onClick={this.pauseTrack}>
                    <FontAwesomeIcon icon={['far','pause-circle']} size="3x" color="white" />
                </StyledButton>
            )   
        } else {
            return (
                <StyledButton onClick={this.resumeTrack}>
                    <FontAwesomeIcon icon={['far','play-circle']} size="3x" color="white" />
                </StyledButton>
            )
        }
    }
    render(){
        
        return(
            <StyledPlayerBox>
                {this.renderCurrentTrack()}
                <StyledButton onClick={this.previousTrack}>
                    <FontAwesomeIcon icon={['fas','step-backward']} size="3x" color="white" />
                </StyledButton>
                {this.renderPlayPause()}
                <StyledButton onClick={this.nextTrack}>
                    <FontAwesomeIcon icon={['fas','step-forward']} size="3x" color="white" />
                </StyledButton>
            </StyledPlayerBox>
            
        )
    }
}
const mapStateToProps = (state) => {
    return { token: state.auth.token, savedDeviceId: state.player.deviceId, currentTrack: state.player.currentTrack, isPlaying: state.player.isPlaying}
}
export default connect(mapStateToProps, { saveDeviceId, setCurrentTrack, changeToPaused, changeToPlaying })(Player);