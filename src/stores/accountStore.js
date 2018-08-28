import { decorate, observable, action } from 'mobx'
import eosAgent from '../EosAgent'

class AccountStore {
  isLogin = false
  account = null

  login = async () => {
    let result = await eosAgent.loginWithScatter()

    if (result) {
      this.isLogin = true

      this.loadAccountInfo()

      return true
    } else {
      return false
    }
  }

  logout = async () => {
    await eosAgent.logout()

    this.isLogin = false
    this.account = null
  }

  loadAccountInfo = async () => {}
}

decorate(AccountStore, {
  isLogin: observable,
  login: action
})

export default AccountStore
