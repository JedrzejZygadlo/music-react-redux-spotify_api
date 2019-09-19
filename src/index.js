import React from 'react';
import ReactDOM from 'react-dom';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,combineReducers, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faPlay, faSearch } from "@fortawesome/free-solid-svg-icons";
import { fab,faSpotify} from "@fortawesome/free-brands-svg-icons";

import App from './components/App';
import reducers from './reducers'

library.add(fab,fas,faSpotify,faPlay,faSearch);

const reducer = storage.reducer(reducers);
const engine = createEngine('my-save-key');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStoreWithMiddleware(reducer,
    composeEnhancers(applyMiddleware(reduxThunk)));
const load = storage.createLoader(engine);
load(store)
  .then((newState) => console.log('Loaded state:', newState))
  .catch(() => console.log('Failed to load previous state'));
/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);
*/
ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>,
    document.querySelector('#root')
);