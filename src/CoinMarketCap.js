import axios from 'axios'

const PATH_BASE = 'https://api.coinmarketcap.com/v2'
const PATH_SEARCH_EOS = '/ticker/1765/'
const PARAM_SEARCH = 'convert=KRW'
const URL = `${PATH_BASE}${PATH_SEARCH_EOS}?${PARAM_SEARCH}`

export function getEosMarket() {
  return axios.get(URL)
}
