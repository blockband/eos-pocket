import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from '../Routes'
import { Provider } from 'mobx-react'

import eosioStore from '../stores/eosioStore'

const stores = new eosioStore()

class App extends Component {
  render() {
    return (
      <Provider stores={stores}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
