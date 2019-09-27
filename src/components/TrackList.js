import React from 'react';
import styled from 'styled-components';
import PlayTrackButton from './PlayTackButton';

const StyledTrackListGrid = styled.div `
    display: grid;
    grid-template-columns: 60px 100px 400px 100px;
    border-bottom: 1px solid grey;
    justify-content: center;
`;
const StyledText = styled.p `
    color: white;
`;
const countToMinSek = (ms) => {
        var sek = ms/1000;
        const min = Math.floor(sek / 60);
        sek= parseInt(sek % 60);
        if(sek<10){
            sek = '0' + sek;
        }
        const result = min + ':' + sek;
        return result 
    }
const renderTracks = (tracks) => {
    return tracks.map(track => {
        return(
            <StyledTrackListGrid>
                    <PlayTrackButton track={track.id}/>
                    <StyledText>{track.track_number}</StyledText>
                    <StyledText>{track.name}</StyledText>
                    <StyledText>{countToMinSek(track.duration_ms)}</StyledText>
            </StyledTrackListGrid>
        )
    })
}
const TrackList = (props) => {
    console.log(props);
    return(
        <>
            <StyledTrackListGrid>
                    <StyledText></StyledText>
                    <StyledText>Numer</StyledText>
                    <StyledText>Tytuł</StyledText>   
                    <StyledText>Długość</StyledText>
            </StyledTrackListGrid>
            {renderTracks(props.tracks)}
        </>
    )
}

export default TrackList;
