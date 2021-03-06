import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchUserFollowedArtists } from '../actions'
import default_playlist from '../images/default_playlist.jpg';

// Styles 

const StyledPlaylistsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    max-height: 400%
`;
const StyledSinglePlaylist = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;
const StyledHeader = styled.p `
    color: white;
    font-family: "Caveat";
    font-size: 2em;
    text-align: left;
    margin-left: 3em;
`;
const StyledTitle = styled.p `
    color: white;
    font-size: 1.2em;
    text-align: center;
`;

const StyledPlaylistImage = styled.img`
    width: 100%;
    height: 200px;
    z-index: -1;
`;
const StyledLink = styled(Link)`
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const StyledImageBox = styled.div `
    width: 200px;
    position: relative;
    &:hover ${StyledLink} {
        display: inline-block;
    }
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    :hover {
        color: #1ed761;
        transition: color 0.35s ease-in, color 0.35s ease-in;
    }
`;
const StyledButton = styled.button `
  margin: 1em 0;
  display: inline-block;
  font-family: "Caveat";
  font-size: 26px;
  width: 300px;
  padding: 8px;
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 1em;
  text-align: center;
  outline: none;
  text-decoration: none;
  transition: border-color 0.25s ease-out, color 0.25s ease-out;

  :active,
  :hover {
    color: #1ed761;
    border-color: #1ed761;
    transition: border-color 0.35s ease-in, color 0.35s ease-in;
  }
`;
const StyledContainer = styled.div `
  text-align: center;
`;

class UserFollowedArtists extends React.Component{
    componentDidMount(){
        this.props.fetchUserFollowedArtists(this.props.token);
    }
    renderImage(images){
        if(images.length>0){
            return <StyledPlaylistImage src={images[0].url} />;
        }
        return <StyledPlaylistImage src={default_playlist} />;
                    
    }
    renderArtists() {
        console.log(this.props.followedArtists)
        return this.props.followedArtists.map(artist => {
            return(
                <StyledSinglePlaylist key={artist.id}>      
                    <StyledImageBox>
                         {this.renderImage(artist.images)}
                        <StyledLink to ={`/artist/${artist.id}`} className="hidden">
                            <StyledFontAwesomeIcon icon={['fas','play']} size="4x" color="white"/>
                        </StyledLink>
                    </StyledImageBox>
                    <StyledTitle>{artist.name}</StyledTitle>
                </StyledSinglePlaylist>
            )
        })
    }
    render(){
        if (this.props.followedArtists) {
            return(
            <StyledContainer>
                <StyledHeader>Artyści</StyledHeader>
                <StyledPlaylistsGrid>
                    {this.renderArtists()}
                </StyledPlaylistsGrid>
                <StyledButton>Ulubieni artyści</StyledButton>
            </StyledContainer>
        )
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return { token: state.auth.token, followedArtists: state.user.artists}
}

export default connect(mapStateToProps, { fetchUserFollowedArtists })(UserFollowedArtists);