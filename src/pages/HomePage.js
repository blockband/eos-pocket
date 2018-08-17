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
  componentDidMount = async () => {
    const { stores } = this.props
    stores.getInfo()
  }

  render() {
    const { stores } = this.props

    return (
      <Page>
        <Row>
          {!stores.info && <Col>Now Loading...</Col>}
          {stores.info && <Col>{JSON.stringify(stores.info)}</Col>}
        </Row>
      </Page>
    )
  }
}

export default compose(
  inject('stores'),
  observer
)(HomePage)
