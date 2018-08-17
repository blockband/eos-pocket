import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'mobx-react'

import App from './App'

import EosioStore from 'stores/EosioStore'

const stores = new EosioStore()

ReactDOM.render(
  <Provider stores={stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)
