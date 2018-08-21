import React, { Component, Fragment } from 'react'
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
} from 'reactstrap'

import Page from 'components/Page'

class TransferPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Page
        className="ButtonPage"
        title="Transfer"
        breadcrumbs={[{ name: 'Transfer', active: true }]}
      >
        <Row>
          <Col xs="12">
            <Card className="mb-3">
              <CardHeader>Available</CardHeader>
              <CardBody className="text-center">0.1454 EOS</CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="mb-3">
              <CardHeader>Transfer Token</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for="selectToken" sm={2}>
                      Select Token
                    </Label>
                    <Col sm={10}>
                      <Input type="select" name="selectToken">
                        <option>EOS</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="receiveAccount" sm={2}>
                      Receive Account Name
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="receiveAccount"
                        placeholder="Receive account is required."
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="quantity" sm={2}>
                      Quantity
                    </Label>
                    <Col sm={10}>
                      <Input type="text" name="quantity" value="0.1" placeholder="Quantity" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="memo" sm={2}>
                      Memo
                    </Label>
                    <Col sm={10}>
                      <Input type="text" name="memo" placeholder="Memo" />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardBody className="text-center">
                <Button color="primary" size="sm">
                  Send
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default TransferPage
