import React, { Component, Fragment } from "react"
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap"

import Page from "components/Page"

class CreateAccountPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Page
        className="ButtonPage"
        title="Create Account"
        breadcrumbs={[{ name: "Accounts", active: true }]}
      >
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
                      <Input
                        type="text"
                        name="ownerKey"
                        placeholder="Owner public key is required."
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
                        placeholder="Active public key is required."
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
                        value="0.1"
                        placeholder="CPU stake in EOS."
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
                        value="0.1"
                        placeholder="NET stake in EOS."
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
                        value="4096"
                        placeholder="Ram buy in bytes"
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardBody className="text-center">
                <Button color="primary" size="sm">
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

export default CreateAccountPage
