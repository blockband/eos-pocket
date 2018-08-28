import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'mobx-react'

import App from './App'

import EosioStore from 'stores/eosioStore'

const eosioStore = new EosioStore()

const stores = {
  eosioStore
}

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)
