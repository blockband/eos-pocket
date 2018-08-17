import { decorate, observable, action } from 'mobx'
import EosAgent from '../EosAgent'

const eosAgent = new EosAgent()

class EosioStore {
  info = null

  getInfo = async () => {
    try {
      const eosInfo = await eosAgent.getInfo()

      this.info = eosInfo
    } catch (e) {}
  }
}

decorate(EosioStore, {
  info: observable,
  getInfo: action
})

export default EosioStore
