import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import Home from './containers/Home';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react'

import eosioStore from './stores/eosioStore'

const stores = {
    eosioStore
}

ReactDOM.render(
    <Provider stores={stores}>
        <App />
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
