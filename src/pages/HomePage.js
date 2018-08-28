import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import { Card, CardBody, CardHeader, CardTitle, CardGroup, CardDeck, Row, Col, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap'

import Page from 'components/Page'

class HomePage extends Component {
  componentDidMount = async () => {
    const { eosioStore } = this.props
    eosioStore.getInfo()
  }

  render() {
    const { eosioStore } = this.props

    return (
      <Page>
        <Row>
          {!eosioStore.info && <Col>Now Loading...</Col>}
          {eosioStore.info && <Col>{JSON.stringify(eosioStore.info)}</Col>}
        </Row>
      </Page>
    )
  }
}

export default compose(
  inject('eosioStore'),
  observer
)(HomePage)
