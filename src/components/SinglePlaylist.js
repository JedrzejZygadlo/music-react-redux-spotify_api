import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchSinglePlaylist } from '../actions';
import default_playlist from '../images/default_playlist.jpg';

// Styles
const StyledPlaylistImage = styled.img `
    width: 200px;
    height: 200px;
`;
const StyledText = styled.p`
    color: white;
`;
const StyledTrackContainer= styled.div`
    display: grid;
    grid-template-columns: 300px 300px 300px 100px;
    border-bottom: 1px solid grey;
`;
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledPlaylistHead = styled.div`
    margin: 1em 0;
    width: 60%;
    display: grid;
    grid-template-columns: 250px 1fr;
`;
const StyledPlaylistInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
`;
class SinglePlaylist extends React.Component {
    componentDidMount(){
        this.props.fetchSinglePlaylist(this.props.match.params.id, this.props.token)
    }
    renderImage(images){
        if(images.length>0){
            return <StyledPlaylistImage src={images[0].url} />;
        }
        return <StyledPlaylistImage src={default_playlist} />;
                    
    }
    countToMinSek(ms){
        var sek = ms/1000;
        const min = Math.floor(sek / 60);
        sek= parseInt(sek % 60);
        if(sek<10){
            sek = '0' + sek;
        }
        const result = min + ':' + sek;
        return result 
    }
    renderTracks(){
        return this.props.playlist.tracks.items.map(track=> {
            
            return (
                <StyledTrackContainer>
                    <StyledText>{track.track.name}</StyledText>
                    <StyledText>{track.track.album.name}</StyledText>
                    <StyledText>{track.track.artists[0].name}</StyledText>
                    <StyledText>{this.countToMinSek(track.track.duration_ms)}</StyledText>
                </StyledTrackContainer>
            )
        })
    }
    render(){
        if (this.props.playlist) {
        return(
            <StyledContainer>
                <StyledPlaylistHead>
                    {this.renderImage(this.props.playlist.images)}
                     <StyledPlaylistInfo>
                    <StyledText>{this.props.playlist.name}</StyledText>
                    <StyledText>{this.props.playlist.description}</StyledText>
                    </StyledPlaylistInfo>
                </StyledPlaylistHead>
                <StyledTrackContainer>
                    <StyledText>Tytuł</StyledText>
                    <StyledText>Album</StyledText>
                    <StyledText>Artysta</StyledText>
                    <StyledText>Długość</StyledText>
                </StyledTrackContainer>
                {this.renderTracks()}
            </StyledContainer>
        )
        }
        return null;
    }
}
const mapStateToProps = (state) => {
    return { token: state.auth.token, playlist: state.user.singlePlaylist}
}
export default connect(mapStateToProps, {fetchSinglePlaylist})(SinglePlaylist);