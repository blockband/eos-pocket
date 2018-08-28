import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import eosAgent from './EosAgent'

import App from './App'

import EosioStore from 'stores/eosioStore'
import AccountStore from 'stores/accountStore'

const eosioStore = new EosioStore()
const accountStore = new AccountStore()

const stores = {
  eosioStore,
  accountStore
}

document.addEventListener('scatterLoaded', async scatterExtension => {
  console.log('scatterloaded')

  if (window.scatter) {
    eosAgent.initScatter(window.scatter)

    if (window.scatter.identity) {
      eosAgent.initEosAgent(window.scatter.identity)
      await accountStore.loadAccountInfo()
    }
  }
})

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)
