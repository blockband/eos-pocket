import Eos from 'eosjs'
import * as Values from 'constants/Values'

const singleton = Symbol()
const singletonEosAgent = Symbol()

const ENDPOINT = Values.NETWORK.protocol + '://' + Values.NETWORK.host + ':' + Values.NETWORK.port

class EosAgent {
  constructor(eosAgent) {
    if (eosAgent !== singletonEosAgent) {
      throw new Error('Cannot construct singleton')
    }

    this.scatter = null
    this._initialized = false
    this.identity = null
    this.loginAccount = null

    this.eos = Eos({
      httpEndpoint: ENDPOINT,
      chainId: Values.NETWORK.chainId
    })
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new EosAgent(singletonEosAgent)
    }

    return this[singleton]
  }

  initScatter = scatter => {
    this.scatter = scatter
    this._initialized = true
  }

  isInitScatter = () => {
    return this._initialized
  }

  initEosAgent = id => {
    if (id) {
      this.scatter.useIdentity(id)
      console.log('Possible identity', this.scatter.identity)
      const loginAccount = this.scatter.identity.accounts.find(acc => acc.blockchain === Values.NETWORK.blockchain)

      this.loginAccount = loginAccount
      this.identity = id

      this.eos = this.scatter.eos(Values.NETWORK, Eos, Values.CONFIG)

      return true
    }
  }

  loginWithScatter = async () => {
    if (!this.scatter) {
      return false
    }

    let id = await this.scatter.getIdentity(Values.requiredFields)

    return this.initEosAgent(id)
  }

  logout = async () => {
    if (!this.scatter) {
      return
    }

    let res = await this.scatter.forgetIdentity()

    this._initialized = false
    this.identity = null
    this.loginAccount = null
    this.eos = Eos({
      httpEndpoint: ENDPOINT,
      chainId: Values.NETWORK.chainId
    })

    console.log('logout : ' + res)
  }

  getInfo = () => {
    return this.eos.getInfo({})
  }
}

export default EosAgent.instance
