import React, { Component } from 'react'
import { Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import Page from 'components/Page'
import AccountResource from 'components/Resource/AccountResource'

class NameBidPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Page className="ButtonPage" title="Name bid" breadcrumbs={[{ name: 'Name bid', active: true }]}>
        <AccountResource />
        <Row>
          <Col xs="12">
            <Card className="mb-3">
              <CardHeader>Bid for Premium account name</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for="accountName" sm={2}>
                      Premium Account Name
                    </Label>
                    <Col sm={10}>
                      <Input type="text" name="accountName" placeholder="12 characters, a-z, 1-5" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="cpuStake" sm={2}>
                      Bid(in EOS)
                    </Label>
                    <Col sm={10}>
                      <Input type="text" name="cpuStake" value="0.1" placeholder="Bid in EOS." />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardBody className="text-center">
                <Button color="primary" size="sm">
                  Submit bid
                </Button>
                <Button color="primary" size="sm">
                  Get bid Prices
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default NameBidPage
