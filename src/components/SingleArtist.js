import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  PlayTrackButton  from './PlayTackButton';
import { fetchArtistInfo } from '../actions';
import default_playlist from '../images/default_playlist.jpg';
import ImageWithButton from './ImageButton';
//Styles
const StyledPlaylistImage = styled.img `
    width: 200px;
    height: 200px;
    z-index: -1;
`;
const StyledArtistName = styled.p`
    color: white;
    font-family: "Caveat";
    font-size: 4em;
    text-align: center;
    margin: 0.2em auto;
`;
const StyledHeader = styled.p`
    color: white;
    font-family: "Caveat";
    font-size: 2em;
    text-align: left;
    margin-left: 3em;
    margin-top: 1em;
`;
const StyledTitle = styled.p`
    color: white;
    font-size: 1.2em;
    text-align: center;
    margin-top: 0.2em;
`;
const StyledText = styled.p`
    color: white;
`;
const StyledArtistInfoBox = styled.div`
    text-align: center;
`;

const StyledAlbumsAndArtistsGrid = styled.div`
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(5, minmax(250px, 1fr));
`;
const StyledAlbumBox = styled.div`
    text-align: center;
    margin-top: 1em;
`;
const StyledRelatedArtistsBox = styled.div`
    text-align: center;
    margin-top: 1em;
    position: relative;
`;
const StyledTrackContainer = styled.div `
    display: grid;
    grid-template-columns: 60px 500px 500px 100px;
    border-bottom: 1px solid grey;
`;
const StyledTopTracksBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
class SingleArtist extends React.Component{
    componentDidMount(){
        this.props.fetchArtistInfo(this.props.match.params.id, this.props.token);
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
    renderImage(images){
        if(images.length>0){
            return <StyledPlaylistImage src={images[0].url} />;
        }
        return <StyledPlaylistImage src={default_playlist} />;
                    
    }
    renderAlbums() {
        return this.props.singleArtist.artistAlbums.map(album => {
            return(
                <StyledAlbumBox>
                    <ImageWithButton images={album.images} href={`/album/${album.id}`}/>
                    <StyledTitle>{album.name}</StyledTitle>
                </StyledAlbumBox>
            )
        })
    }
    renderTopTracks() {
        return this.props.singleArtist.artistTopTracks.map(track => {
            return(
                <StyledTrackContainer>
                    <PlayTrackButton track={track.id}/>
                    <StyledText>{track.name}</StyledText>
                    <StyledText>{track.album.name}</StyledText>
                    <StyledText>{this.countToMinSek(track.duration_ms)}</StyledText>
                </StyledTrackContainer>
            )
        })
    }

    renderRelatedArtists() {
        return this.props.singleArtist.artistRelatedArtists.slice(0,10).map(relatedArtist => {
            return (
                <StyledRelatedArtistsBox>
                    <ImageWithButton images={relatedArtist.images} href={`/artist/${relatedArtist.id}`}/>
                    <StyledTitle>{relatedArtist.name}</StyledTitle>
                </StyledRelatedArtistsBox>
            )
        })
    }
    render(){
        if(this.props.singleArtist){
        return(
            <>
                <StyledArtistInfoBox>
                    <StyledArtistName>{this.props.singleArtist.artistInfo.name}</StyledArtistName>
                    {this.renderImage(this.props.singleArtist.artistInfo.images)}
                </StyledArtistInfoBox>

                <StyledHeader>Top Tracks</StyledHeader>
                <StyledTopTracksBox>
                    <StyledTrackContainer>
                        <StyledText></StyledText>
                        <StyledText>Tytuł</StyledText>
                        <StyledText>Album</StyledText>
                        <StyledText>Długość</StyledText>
                    </StyledTrackContainer>
                    {this.renderTopTracks()}
                </StyledTopTracksBox>

                <StyledHeader>Albums</StyledHeader>
                <StyledAlbumsAndArtistsGrid>
                    {this.renderAlbums()}
                </StyledAlbumsAndArtistsGrid>

                <StyledHeader>Related Artists</StyledHeader>
                <StyledAlbumsAndArtistsGrid>
                    {this.renderRelatedArtists()}
                </StyledAlbumsAndArtistsGrid>
            </>
        )
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return { token: state.auth.token, singleArtist: state.user.singleArtist}
}
export default connect(mapStateToProps, {fetchArtistInfo})(SingleArtist);