import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './containers/Home'
import Test from './containers/Test'

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} /> 
                <Route exact path="/test" component={Test} /> 
            </Switch>
        );
    }
}

export default Routes;