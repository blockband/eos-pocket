import Eos from 'eosjs'

class EosAgent {
    eos = Eos({
        httpEndpoint: 'https://api.eosnewyork.io',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    })

    getInfo = () => {
        return this.eos.getInfo({})
    }

    getRamMarket = () => {
        return this.eos.getTableRows(
            {
                "json": true,
                "scope": 'eosio',
                "code": 'eosio',
                "table": "rammarket",
              }
        )
    }

}

export default EosAgent