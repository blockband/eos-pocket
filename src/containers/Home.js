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
            onClick={stores.increase}>
            +
          </button>
          <div>
            {!stores.info && <span>Now Loading...</span>}
            {stores.info && <span>{JSON.stringify(stores.info)}</span>}
          </div>
          <div>{ stores.count }</div>
      </div>
    );
  }
}

export default compose(
  inject('stores'),
  observer
)(Home)
