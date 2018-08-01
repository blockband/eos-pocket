import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardGroup,
  CardDeck,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
  Button
} from 'reactstrap'

import Page from 'components/Page'

class HomePage extends Component {
  constructor(props) {
    super(props)
    const { eosioStore } = this.props
    this.eosioStore = eosioStore
  }
  componentDidMount = async () => {
    this.eosioStore.getInfo()
  }

  render() {
    return (
      <Page>
        <Row>
          {!this.eosioStore.info && <Col>Now Loading...</Col>}
          {this.eosioStore.info && <Col>{JSON.stringify(this.eosioStore.info)}</Col>}
        </Row>
      </Page>
    )
  }
}

export default compose(
  inject('eosioStore'),
  observer
)(HomePage)
