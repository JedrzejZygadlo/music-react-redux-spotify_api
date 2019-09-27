import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from './Search';
import Player from './Player';
import {searchInformation} from '../actions';

const StyledHeaderBox = styled.div`
    position: fixed;
    top: 0;
    z-index: 5;
    background-color: black;
    width: 100%;
    display: grid;
    grid-template-columns: 100px 700px 1fr 600px;

`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    align-self: center;
    justify-self:center;
`;

class Header extends React.Component {
    onSubmit = (formValues) => {
        this.props.searchInformation(formValues, this.props.token);
    }
    render(){
        console.log(this.props.token);
        if(this.props.token){
            return (
                <StyledHeaderBox>
                    <StyledFontAwesomeIcon icon={['fas','bars']} size="4x" color="#1ed761"/>
                    <Search onSubmit={this.onSubmit} />
                    <div></div>
                    <Player />
                </StyledHeaderBox>
             )
        }
        return null;
   
    }
}
const mapStateToProps = (state) => {
    return { token: state.auth.token }
}
export default connect(mapStateToProps, { searchInformation })(Header);