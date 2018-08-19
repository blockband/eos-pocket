import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

class Home extends Component {
  render() {
    const { stores } = this.props;
    console.log(stores)

    return (
      <div>
          <button
            onClick={stores.getInfo}>
            GetInfo
          </button>
          <button
            onClick={stores.getRamMarket}>
            GetRamInfo
          </button>
          <div>
            {!stores.info && <span>Info. Now Loading...</span>}
            {stores.info && <span>{JSON.stringify(stores.info)}</span>}
          </div>
          <div>
            {!stores.ramInfo && <span>RamInfo. Now Loading...</span>}
            {stores.ramInfo && <span>{JSON.stringify(stores.ramInfo)}</span>}
          </div>
      </div>
    );
  }
}

export default compose(
  inject('stores'),
  observer
)(Home)
