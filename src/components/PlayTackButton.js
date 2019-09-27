import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { playTrack } from '../actions'

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    
`;

const PlayTrackButton = (props) => {
    console.log(props);
    console.log(props.token);
    console.log(props.device);
    console.log(props.track);
    return(
        <StyledButton onClick={()=> {props.playTrack(props.token, props.device, props.track)}}>
            <FontAwesomeIcon icon={['far','play-circle']} size="2x" color="white"/>
        </StyledButton>
    )
}

const mapStateToProps = (state) => {
    return { token: state.auth.token, device: state.player.deviceId }
}
export default connect(mapStateToProps, { playTrack })(PlayTrackButton);