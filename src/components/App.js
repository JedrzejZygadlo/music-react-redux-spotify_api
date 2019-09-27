import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { createGlobalStyle} from 'styled-components'
import MainPage from './MainPage';
import AboutUser from './AboutUser';
import SinglePlaylist from './SinglePlaylist';
import SingleArtist from './SingleArtist';
import SingleAlbum from './SingleAlbum';
import SearchResult from './SearchResult';
import Header from './Header';
import history from '../history';
const GlobalStyle = createGlobalStyle `
  html,body {
    margin: 0;
    padding: 0;
    background-color: black;
  }
`;

const StyledApp = styled.div`
    margin-top: 140px;   
`;

const App = () => {
    return (
        <Router history={history}>
            <GlobalStyle />
                <Header />
                <Route exact={true} path="/" component={MainPage}/>
                <StyledApp> 
                    <Switch>
                    <Route exact={true} path="/playlist/:id" component={SinglePlaylist}/>
                    <Route exact={true} path="/artist/:id" component={SingleArtist}/>
                    <Route exact={true} path="/album/:id" component={SingleAlbum}/>
                    <Route exact={true} path="/search" component={SearchResult}/>
                    </Switch>
                </StyledApp>        
        </Router>
    )
};

export default App;