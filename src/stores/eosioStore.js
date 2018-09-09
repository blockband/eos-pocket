import { decorate, observable, action } from 'mobx'
import EosAgent from '../EosAgent'
import * as marketApi from '../CoinMarketCap'

const eosAgent = new EosAgent()

class EosioStore {
  info = null
  ramInfo = null
  eosMarketInfo = null

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

  getEosMarket = async () => {
    try {
      const eosMarket = await marketApi.getEosMarket()

      this.eosMarketInfo = eosMarket
    } catch (e) {}
  }

  // Todo. computed 설정
  getRamPriceEosPerByte() {
    let ramInfoRow = this.ramInfo ? this.ramInfo.rows[0] : null
    if (!ramInfoRow) return null

    let connectorBalance = parseFloat(ramInfoRow.quote.balance)
    let tokenOutstandingSupply = parseFloat(ramInfoRow.base.balance)
    return connectorBalance / tokenOutstandingSupply
  }

  getRamPriceEosPerKB() {
    let ramPriceEosPerByte = this.getRamPriceEosPerByte()
    return ramPriceEosPerByte * 1024
  }
}

decorate(EosioStore, {
  info: observable,
  ramInfo: observable,
  eosMarketInfo: observable,
  getInfo: action,
  getRamMarket: action,
  getEosMarket: action
})

export default EosioStore
