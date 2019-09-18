import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledLink = styled(Link)`
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    :hover {
        color: #1ed761;
        transition: color 0.35s ease-in, color 0.35s ease-in;
    }
`;
const ButtonContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    &:hover ${StyledLink} {
        display: inline-block;
    }
`;

const EnterButton = (props) => {
    return(
        <ButtonContainer>
            <StyledLink to={props.href} className="hidden">
                <StyledFontAwesomeIcon icon={['fas','play']} size="4x" color="white"/>
            </StyledLink>
        </ButtonContainer>
    )
}

export default EnterButton;