import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { createGlobalStyle} from 'styled-components'
import MainPage from './MainPage';
import AboutUser from './AboutUser';
import SinglePlaylist from './SinglePlaylist';
import SingleArtist from './SingleArtist';
import SingleAlbum from './SingleAlbum';

const GlobalStyle = createGlobalStyle `
  html,body {
    margin: 0;
    padding: 0;
    background-color: black;
  }
`;

const StyledApp = styled.div`
    height: 100vh;
    
`;

const App = () => {
    return (
        <HashRouter>
            <GlobalStyle />
                <StyledApp>
                    <Route path='/' exact component={MainPage}/>
                    <Route path='/user' exact component={AboutUser}/>
                    <Route path='/playlist/:id' exact component={SinglePlaylist}/>
                    <Route path='/artist/:id' exact component={SingleArtist}/>
                    <Route path='/album/:id' exact component={SingleAlbum}/>
                </StyledApp>        
        </HashRouter>
    )
};

export default App;