import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { createGlobalStyle} from 'styled-components'
import MainPage from './MainPage';
import AboutUser from './AboutUser';

const GlobalStyle = createGlobalStyle `
  html,body {
    margin: 0;
    padding: 0;
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
                </StyledApp>        
        </HashRouter>
    )
};

export default App;