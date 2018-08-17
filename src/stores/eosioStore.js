import { decorate, observable, action } from 'mobx'
import EosAgent from '../EosAgent'

const eosAgent = new EosAgent()

class EosioStore {
    info = null;
    count = 0;

    getInfo = async () => {
        try {
          const eosInfo = await eosAgent.getInfo()
    
          this.info = eosInfo
        } catch (e) {}
    }

    increase = () => {
        this.count++;
    }
}

decorate(EosioStore, {
    info: observable,
    count: observable,
    getInfo: action,
    increase: action
})
  
export default EosioStore
