import { decorate, observable, action } from 'mobx'
import EosAgent from '../EosAgent'

const eosAgent = new EosAgent()

class EosioStore {
    info = null;
    ramInfo = null;

    getInfo = async () => {
        try {
          const eosInfo = await eosAgent.getInfo()
    
          this.info = eosInfo
        } catch (e) {}
    }

    getRamMarket = async () => {
        try {
          const ramInfo = await eosAgent.getRamMarket()
    
          this.ramInfo = ramInfo
        } catch (e) {}
    }
}

decorate(EosioStore, {
    info: observable,
    ramInfo: observable,
    getInfo: action,
    getRamMarket: action
})
  
export default EosioStore
