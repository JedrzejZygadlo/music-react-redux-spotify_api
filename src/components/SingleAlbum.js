import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchSingleAlbum } from '../actions';
import default_img from '../images/default_playlist.jpg';
import TrackList from './TrackList';
const StyledAlbumName = styled.p `
    color: white;
    font-family: "Caveat";
    font-size: 4em;
    text-align: center;
    margin: 0.2em auto;
`;

const StyledHeader = styled.p `
    color: white;
    font-family: "Caveat";
    font-size: 2em;
    text-align: center;
    margin: 0.2em 0;
`;
const StyledImage = styled.img `
    width: 200px;
    height: 200px;
    margin: 0.5em 0;
`;
const StyledText = styled.p `
    color: white;
`;
const StyledAlbumInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledSingleAlbumBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
class SingleAlbum extends React.Component {
    componentDidMount(){
        this.props.fetchSingleAlbum(this.props.match.params.id, this.props.token)
    }
    renderImage(images){
        if(images.length>0){
            return <StyledImage src={images[0].url} />;
        }
        return <StyledImage src={default_img} />;
                    
    }
    renderArtists(){
        return this.props.singleAlbum.artists.map(artist => {
            return <span>{artist.name}</span>;
        })
    }
    renderTracks(){
        return this.props.singleAlbum.tracks.items.map(track => {
            return (
                <div>
                    <h1>{track.name}</h1>
                    <h1>{track.duration_ms}</h1>
                </div>
            )
        })
    }
    render(){
        if(this.props.singleAlbum){
        return(
            <StyledSingleAlbumBox>
                <StyledAlbumInfo>
                    <StyledAlbumName>{this.props.singleAlbum.name}</StyledAlbumName>
                    {this.renderImage(this.props.singleAlbum.images)}
                    <StyledHeader>Artyści: {this.renderArtists()}</StyledHeader>{this.renderArtists()}
                    <StyledHeader>Wytwórnia: {this.props.singleAlbum.label}</StyledHeader>
                </StyledAlbumInfo>
                <TrackList tracks={this.props.singleAlbum.tracks.items}/>
            </StyledSingleAlbumBox>
        )
        }
        return null;
    }
}
const mapStateToProps = (state) => {
    return { token: state.auth.token, singleAlbum: state.user.singleAlbum}
}

export default connect(mapStateToProps, { fetchSingleAlbum })(SingleAlbum);