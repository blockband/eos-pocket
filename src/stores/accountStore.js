import { decorate, observable, action } from 'mobx'
import eosAgent from '../EosAgent'

class AccountStore {
  isLogin = false
  account = null

  login = async () => {
    let account = await eosAgent.loginWithScatter()

    if (account) {
      this.account = account
      this.isLogin = true

      this.loadAccountInfo()
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
