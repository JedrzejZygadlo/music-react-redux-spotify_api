import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setToken } from '../actions';
import { client_id, response_type, redirect_uri, scopes} from '../apis/env';
import AboutUser from './AboutUser';
import background from '../images/background2.jpg';

//Styles
const StyledBackground = styled.div`
    background-image:  url(${background});
    position: relative;
    opacity: 0.92;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const StyledLoginBox = styled.div`
    position: absolute;
    bottom: 10%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
const StyledText = styled.p`
    font-family: 'Caveat';
    font-size: 40px;
    color: white;
    margin: 0.5em 0;
`;
const StyledSpotyifyContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 0.5em;
`;
const StyledHeader = styled.h1`
    color: white;
    font-size: 32px;
    margin: 0;
    padding-left: 0.4em;
`;

const StyledButton = styled.button`
  margin: 1em 0;
  display: inline-block;
  font-family: "Caveat";
  font-size: 32px;
  width: 200px;
  padding: 8px;
  background-color: transparent;
  color: #fff;
  border: 3px solid #fff;
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

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";


class MainPage extends React.Component {
    componentDidMount() {
        let spotifyToken = hash.access_token;
        console.log(spotifyToken);
        if(spotifyToken) {
            this.props.setToken(spotifyToken)
        }
    }
    onSignInClick = () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join('%20')}&response_type=${response_type}`
    };

    render(){  
        console.log(this.props.isSignedIn);
        if(!this.props.isSignedIn){
            return (
                <StyledBackground>
                    <StyledLoginBox>
                        <StyledText>Ciesz się muzyką korzystając ze</StyledText>
                        <StyledSpotyifyContent>
                            <FontAwesomeIcon icon={["fab","spotify"]} size="4x" color="white"/>
                            <StyledHeader>SPOTIFY</StyledHeader>
                        </StyledSpotyifyContent>
                        <StyledButton onClick={this.onSignInClick}>
                          Zaloguj się
                        </StyledButton> 
                    </StyledLoginBox>      
                </StyledBackground>
        )
        } 
        return (
            <AboutUser />
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return { token: state.auth.token, isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {setToken})(MainPage);