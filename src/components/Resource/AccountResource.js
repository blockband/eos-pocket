import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'

class AccountResource extends Component {
  onLoginClick = async () => {
    try {
      const { accountStore } = this.props

      const result = await accountStore.login()

      if (!result) {
        alert('need install scatter')
      }
    } catch (e) {
      // todo - error handle
      // 423 Locked
      console.log(e)
    }
  }

  render() {
    const { accountStore } = this.props

    return (
      <Row>
        <Col xs="12">
          <Card className="mb-3">
            <CardHeader>Account Resource</CardHeader>
            {accountStore.isLogin ? (
              <CardBody className="text-center">
                <Row>
                  <Col xs="1" />
                  <Col xs="1">EOS</Col>
                  <Col xs="1">{accountStore.eosBalance} EOS</Col>
                  <Col xs="1">CPU</Col>
                  <Col xs="1">{accountStore.cpuMax}</Col>
                  <Col xs="1">NET</Col>
                  <Col xs="1">{accountStore.netMax}</Col>
                  <Col xs="1">RAM</Col>
                  <Col xs="1">{accountStore.ram}</Col>
                  <Col xs="1">REFUNDING</Col>
                  <Col xs="1">{accountStore.totalRefund}</Col>
                  <Col xs="1" />
                </Row>
              </CardBody>
            ) : (
              <CardBody className="text-center">
                <Link to="#!" onClick={this.onLoginClick}>
                  Login with scatter
                </Link>
              </CardBody>
            )}
          </Card>
        </Col>
      </Row>
    )
  }
}

export default compose(
  inject('accountStore'),
  observer
)(AccountResource)
