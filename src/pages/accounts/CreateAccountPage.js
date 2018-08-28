import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import { Row, Col, Card, CardHeader, CardBody, Badge, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import Page from 'components/Page'

class CreateAccountPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cpuStake: 0.1,
      netStake: 0.1,
      buyRam: 4096
    }
  }

  handleChange = event => {
    let obj = {}

    obj[event.target.name] = event.target.value

    this.setState(obj)
  }

  onCreateAccountClick = async () => {}

  render() {
    return (
      <Page className="ButtonPage" title="Create Account" breadcrumbs={[{ name: 'Account', active: true }]}>
        <Row>
          <Col xs="12">
            <Card className="mb-3">
              <CardHeader>Available EOS</CardHeader>
              <CardBody className="text-center">0.1454 EOS</CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="mb-3">
              <CardHeader>Create Account</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for="accountName" sm={2}>
                      Account Name
                    </Label>
                    <Col sm={10}>
                      <Input type="text" name="accountName" placeholder="12 characters, a-z, 1-5" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="ownerKey" sm={2}>
                      Owner Public Key
                    </Label>
                    <Col sm={10}>
                      <Input type="text" name="ownerKey" placeholder="Owner public key is required." />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="activeKey" sm={2}>
                      Active Public Key
                    </Label>
                    <Col sm={10}>
                      <Input type="text" name="activeKey" placeholder="Active public key is required." />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="cpuStake" sm={2}>
                      Cpu Stake(in EOS)
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="cpuStake"
                        value={this.state.cpuStake}
                        placeholder="CPU stake in EOS."
                        onChange={this.handleChange.bind(this)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="netStake" sm={2}>
                      Net Stake(in EOS)
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="netStake"
                        value={this.state.netStake}
                        placeholder="NET stake in EOS."
                        onChange={this.handleChange.bind(this)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="ramBytes" sm={2}>
                      Ram Buy(in bytes)
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="ramBytes"
                        value={this.state.buyRam}
                        placeholder="Ram buy in bytes"
                        onChange={this.handleChange.bind(this)}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardBody className="text-center">
                <Button color="primary" size="sm" onClick={this.onCreateAccountClick}>
                  Create
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default compose(
  inject('eosioStore'),
  observer
)(CreateAccountPage)
