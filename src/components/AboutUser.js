import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchUserProfile, fetchUserCurrentPlayback, searchInformation } from '../actions';
import CurrentUserPlaylists from './CurrentUserPlaylists';
import UserFollowedArtists from './UserFollowedArtists';
import CurrentUserSavedAlbums from './CurrentUserSavedAlbums';
import CurrentUserSavedTracks from './CurrentUserSavedTracks';
import Search from './Search';
import Player from './Player';

const StyledBox = styled.div`
    margin-top: 140px;
`;
class AboutUser extends React.Component{
    componentDidMount(){
        this.props.fetchUserProfile(this.props.token);
        this.props.fetchUserCurrentPlayback(this.props.token);
    }
    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.searchInformation(formValues, this.props.token);
    }
    render(){
        console.log(this.props.user);
        if(this.props.user.profile){
            return (
            <StyledBox>
            {/*
                <h1>
                    {this.props.user.profile.display_name}
                </h1>
                <img src={this.props.user.profile.images[0].url}></img>s
            */
            }
            {/*
                <Search onSubmit={this.onSubmit} />
            */}  
                
                <CurrentUserPlaylists />
                <UserFollowedArtists />
                <CurrentUserSavedAlbums />
                <CurrentUserSavedTracks />
            </StyledBox>
        )
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return { token: state.auth.token, user: state.user}
}

export default connect(mapStateToProps, { fetchUserProfile, fetchUserCurrentPlayback, searchInformation })(AboutUser);