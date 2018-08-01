import Eos from 'eosjs'
import React from 'react'
import { Button } from 'reactstrap'

// let keyProvider = '5KipfJe7WnKJT4DXRi8Kd9wrWcQoKUgdQckQxCahgPhdBRmYfLv';
// this.eos = Eos({
//   httpEndpoint: 'http://localhost:8888',
//   chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
//   keyProvider: keyProvider
// });

let testBtnClick = async () => {
  let contract = await this.eos.contract('pineapple')

  contract.hi('testuser', {
    authorization: ['pineapple@active']
  })
  console.log(contract)
}

class ContractButton extends React.Component {
  render() {
    return <Button onClick={testBtnClick}>Button</Button>
  }
}

export default ContractButton
