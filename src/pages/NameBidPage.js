import React, { Component } from 'react'
import { Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import Page from 'components/Page'

class NameBidPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Page className="ButtonPage" title="Name bid" breadcrumbs={[{ name: 'Name bid', active: true }]} />
  }
}

export default NameBidPage
