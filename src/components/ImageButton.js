import React from 'react';
import styled from 'styled-components';
import EnterButton from './EnterButton';
import default_img from '../images/default_playlist.jpg';

const StyledImage = styled.img `
    width: 200px;
    height: 200px;
    z-index: -1;
`;
const StyledImageWithButtonBox = styled.div`
    position: relative;
`;

const renderImage = (images) =>{
        if(images.length>0){
            return <StyledImage src={images[0].url} />;
        }
        return <StyledImage src={default_img} />;
                    
}
const ImageWithButton = (props) => {
    return(
        <StyledImageWithButtonBox>
            {renderImage(props.images)}
            <EnterButton href={props.href}></EnterButton>
        </StyledImageWithButtonBox>
    )
}
export default ImageWithButton;
/*
   renderAlbums() {
        return this.props.singleArtist.artistAlbums.map(album => {
            return(
                <StyledAlbumBox>
                    {this.renderImage(album.images)}
                    <StyledTitle>{album.name}</StyledTitle>
                    <EnterButton href={`/album/${album.id}`}></EnterButton>
                </StyledAlbumBox>
            )
        })
    }



*/