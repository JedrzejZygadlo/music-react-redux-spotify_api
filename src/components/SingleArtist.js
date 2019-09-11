import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchArtistInfo } from '../actions';
import default_playlist from '../images/default_playlist.jpg';
const StyledPlaylistImage = styled.img `
    width: 100%;
    height: 200px;
    z-index: -1;
`;

class SingleArtist extends React.Component{
    componentDidMount(){
        this.props.fetchArtistInfo(this.props.match.params.id, this.props.token);
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
                <div>
                    <h1>{album.name}</h1>
                    {this.renderImage(album.images)}
                </div>
            )
        })
    }
    renderTopTracks() {
        return this.props.singleArtist.artistTopTracks.map(track => {
            return(
                <div>
                    <h1>{track.name}</h1>
                    <h1>{track.album.name}</h1>
                    <h1>{track.duration_ms}</h1>
                </div>
            )
        })
    }

    renderRelatedArtists() {
        return this.props.singleArtist.artistRelatedArtists.map(relatedArtist => {
            return (
                <div>
                    <h1>{relatedArtist.name}</h1>
                    {this.renderImage(relatedArtist.images)}
                </div>
            )
        })
    }
    render(){
        if(this.props.singleArtist){
        return(
            <div>
                <div>
                    <h1>{this.props.singleArtist.artistInfo.name}</h1>
                    {this.renderImage(this.props.singleArtist.artistInfo.images)}
                </div>

                <div>
                    <h1>Albums</h1>
                    {this.renderAlbums()}
                </div>

                <div>
                    {this.renderTopTracks()}
                </div>

                <div>
                    {this.renderRelatedArtists()}
                </div>
            </div>
        )
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return { token: state.auth.token, singleArtist: state.user.singleArtist}
}
export default connect(mapStateToProps, {fetchArtistInfo})(SingleArtist);