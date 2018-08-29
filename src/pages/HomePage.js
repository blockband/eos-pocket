import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import { Row, Col, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap'

import Page from 'components/Page'

class HomePage extends Component {
  componentDidMount = async () => {
    const { eosioStore } = this.props
    eosioStore.getInfo()
    this.interval = setInterval(eosioStore.getRamInfo, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { eosioStore } = this.props

    return (
      <Page>
        <Row>
          {!eosioStore.info && <Col>Now Loading...</Col>}
          {eosioStore.info && <Col>{JSON.stringify(eosioStore.info)}</Col>}
          {eosioStore.ramInfo && <Col>{JSON.stringify(eosioStore.ramInfo)}</Col>}
        </Row>
        <Row>{eosioStore.ramPrice}</Row>
      </Page>
    )
  }
}

export default compose(
  inject('eosioStore'),
  observer
)(HomePage)
