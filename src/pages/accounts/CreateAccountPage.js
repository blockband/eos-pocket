import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import ecc from 'eosjs-ecc'

import { Row, Col, Card, CardHeader, CardBody, Badge, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import Page from 'components/Page'
import AccountResource from 'components/Resource/AccountResource'

const ACCOUNT_PATTERN = /^[a-z1-5]{12}$/g
const MIN_CPU_STAKE_IN_EOS = 0.1
const MIN_NET_STAKE_IN_EOS = 0.1
const MIN_RAM_BUYING_IN_BYTES = 3096

class CreateAccountPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accountName: '',
      ownerKey: '',
      activeKey: '',
      cpuStake: 0.1,
      netStake: 0.1,
      buyRam: 4096,
      privateKey: '',
      publicKey: '',
      copiedPrivateKey: false,
      copiedPublicKey: false,
      isTransfer: false
    }
  }

  onGenerateKeyClick = async () => {
    const privateKeyPair = await this.genKeyPair()

    this.setState({
      privateKey: privateKeyPair.privateKey,
      publicKey: privateKeyPair.publicKey
    })
  }

  genKeyPair = async () => {
    const privateKey = await ecc.randomKey()

    if (privateKey) {
      const publicKey = ecc.privateToPublic(privateKey)

      return {
        privateKey,
        publicKey
      }
    }

    return {
      privateKey: '',
      publicKey: ''
    }
  }

  handleChange = event => {
    let obj = {}

    obj[event.target.name] = event.target.value

    this.setState(obj)
  }

  onCreateAccountClick = async () => {
    if (!ACCOUNT_PATTERN.test(this.state.accountName)) {
      // todo invalid error msg
      return
    }

    if (!ecc.isValidPublic(this.state.ownerKey)) {
      // todo invalid error msg
      return
    }

    if (!ecc.isValidPublic(this.state.activeKey)) {
      // todo invalid error msg
      return
    }

    if (this.state.cpuStake < MIN_CPU_STAKE_IN_EOS) {
      // todo invalid error msg
      return
    }

    if (this.state.netStake < MIN_NET_STAKE_IN_EOS) {
      // todo invalid error msg
      return
    }

    if (this.state.buyRam < MIN_RAM_BUYING_IN_BYTES) {
      // todo invalid error msg
      return
    }

    const data = {
      creator: {
        name: '',
        authority: ''
      },
      accountName: this.state.accountName,
      ownerPubKey: this.state.ownerKey,
      activePubKey: this.state.activeKey,
      cpuStake: this.state.cpuStake,
      netStake: this.state.netStake,
      ramPurchase: this.state.buyRam,
      isTransfer: this.state.isTransfer ? 1 : 0
    }

    const { eosioStore } = this.props

    const result = await eosioStore.createNewAccount(data)
  }

  render() {
    return (
      <Page className="ButtonPage" title="Create Account" breadcrumbs={[{ name: 'Account', active: true }]}>
        <AccountResource />
        <Row>
          <Col xs="12">
            <Card className="mb-3">
              <CardHeader>Generate Key</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for="privateKey" sm={2}>
                      Private key
                    </Label>
                    <Col sm={10}>
                      <Input type="text" name="privateKey" placeholder="Private key" value={this.state.privateKey} disabled={true} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="publicKey" sm={2}>
                      Public key
                    </Label>
                    <Col sm={10}>
                      <Input type="text" name="publicKey" placeholder="Public key" value={this.state.publicKey} disabled={true} />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardBody className="text-center">
                <Button color="primary" size="sm" onClick={this.onGenerateKeyClick}>
                  Generate
                </Button>
              </CardBody>
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
                      <Input
                        type="text"
                        name="accountName"
                        value={this.state.accountName}
                        placeholder="12 characters, a-z, 1-5"
                        onChange={this.handleChange.bind(this)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="ownerKey" sm={2}>
                      Owner Public Key
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="ownerKey"
                        value={this.state.ownerKey}
                        placeholder="Owner public key is required."
                        onChange={this.handleChange.bind(this)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="activeKey" sm={2}>
                      Active Public Key
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="activeKey"
                        value={this.state.activeKey}
                        placeholder="Active public key is required."
                        onChange={this.handleChange.bind(this)}
                      />
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
                  <FormGroup row>
                    <Label for="isTransfer" sm={2}>
                      Transfer EOS
                    </Label>
                    <Col sm={10}>
                      <Input type="checkbox" name="isTransfer" value={this.state.isTransfer} onChange={this.handleChange.bind(this)} />
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
