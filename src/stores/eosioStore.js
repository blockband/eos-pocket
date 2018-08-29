import { decorate, observable, action, computed } from 'mobx'
import eosAgent from '../EosAgent'

class EosioStore {
  info = null
  global = null
  ramInfo = null
  ramPrice = 0

  getInfo = async () => {
    try {
      const eosInfo = await eosAgent.getInfo()

      this.info = eosInfo

      // {"server_version":"60947c0c","chain_id":"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906","head_block_num":6034331,"last_irreversible_block_num":6033999,"last_irreversible_block_id":"005c124f52b8ff52faf9a1088879163327759deefd35fe7dd1d82e7ab292508c","head_block_id":"005c139b3f9f1d8c2419c906ad774a19661784270671b987aaad877964db5db2","head_block_time":"2018-07-15T15:59:03.500","head_block_producer":"eoscleanerbp","virtual_block_cpu_limit":200000000,"virtual_block_net_limit":1048576000,"block_cpu_limit":199900,"block_net_limit":1048576}
    } catch (e) {}
  }

  getGlobalInfo = async () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'global'
    }

    const globalInfo = await eosAgent.getTableRows(query)
    if (globalInfo) {
      this.global = globalInfo.rows[0]
    }

    //{"rows":[{"max_block_net_usage":1048576,"target_block_net_usage_pct":1000,"max_transaction_net_usage":524288,"base_per_transaction_net_usage":12,"net_usage_leeway":500,"context_free_discount_net_usage_num":20,"context_free_discount_net_usage_den":100,"max_block_cpu_usage":200000,"target_block_cpu_usage_pct":1000,"max_transaction_cpu_usage":150000,"min_transaction_cpu_usage":100,"max_transaction_lifetime":3600,"deferred_trx_expiration_window":600,"max_transaction_delay":3888000,"max_inline_action_size":4096,"max_inline_action_depth":4,"max_authority_depth":6,"max_ram_size":"68719476736","total_ram_bytes_reserved":"54375646207","total_ram_stake":"37909516538","last_producer_schedule_update":"2018-07-13T06:03:12.000","last_pervote_bucket_fill":"1531461791000000","pervote_bucket":241663153,"perblock_bucket":33931983,"total_unpaid_blocks":87234,"total_activated_stake":"3078799576275","thresh_activated_stake_time":"1529505892000000","last_producer_schedule_size":21,"total_producer_vote_weight":"10100489608007821312.00000000000000000","last_name_close":"2018-07-11T15:27:03.500"}],"more":false}
  }

  getRamInfo = async () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'rammarket'
    }

    const ramInfo = await eosAgent.getTableRows(query)
    if (ramInfo) {
      this.ramInfo = ramInfo.rows[0]

      const ramBalance = parseFloat(this.ramInfo.quote.balance)
      const eosBalance = parseFloat(this.ramInfo.base.balance)
      this.ramPrice = (ramBalance / eosBalance) * 1024
    }
  }

  /**
   * data = {
   * creator: {
   *  name: 'creator account name',
   *  authority: 'creator permission'
   * },
   * accountName: 'new account name',
   * ownerPubKey: 'new account owner public key',
   * activePubKey: 'new account active public key',
   * cpuStake: 'cpu stake in EOS',
   * netStake: 'net stake in EOS',
   * ramPurchase: 'ram buying in bytes',
   * isTransfer: 'transfer EOS to new account, 0 or 1'
   * }
   */
  createNewAccount = async data => {
    const cb = tr => {
      const options = { authorization: [`${data.creator.name}@${data.creator.authority}`] }

      tr.newaccount(
        {
          creator: data.creator.name,
          name: data.accountName,
          owner: data.ownerPubKey,
          active: data.activePubKey
        },
        options
      )

      tr.buyrambytes(
        {
          payer: data.creator.name,
          receiver: data.accountName,
          bytes: data.ramPurchase
        },
        options
      )

      tr.delegatebw(
        {
          from: data.creator.name,
          receiver: data.accountName,
          stake_net_quantity: Number(data.netStake).toFixed(4) + ' EOS',
          stake_cpu_quantity: Number(data.cpuStake).toFixed(4) + ' EOS',
          transfer: data.isTransfer
        },
        options
      )
    }

    await eosAgent.createTransaction(cb)
  }
}
decorate(EosioStore, {
  info: observable,
  ramInfo: observable,
  ramPrice: observable,
  getInfo: action
})

export default EosioStore
