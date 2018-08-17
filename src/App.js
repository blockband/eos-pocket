import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm'
import GAListener from 'components/GAListener'
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout'
import CreateAccountPage from 'pages/accounts/CreateAccountPage'
import StakePage from 'pages/accounts/StakePage'
import RammarketPage from 'pages/accounts/RammarketPage'
import RefundPage from 'pages/accounts/RefundPage'

import AlertPage from 'pages/AlertPage'
import AuthModalPage from 'pages/AuthModalPage'
import AuthPage from 'pages/AuthPage'
import BadgePage from 'pages/BadgePage'
import ButtonGroupPage from 'pages/ButtonGroupPage'
import ButtonPage from 'pages/ButtonPage'
import CardPage from 'pages/CardPage'
import ChartPage from 'pages/ChartPage'
// pages
import DashboardPage from 'pages/DashboardPage'
import DropdownPage from 'pages/DropdownPage'
import FormPage from 'pages/FormPage'
import InputGroupPage from 'pages/InputGroupPage'
import ModalPage from 'pages/ModalPage'
import ProgressPage from 'pages/ProgressPage'
import TablePage from 'pages/TablePage'
import TypographyPage from 'pages/TypographyPage'
import WidgetPage from 'pages/WidgetPage'
import React from 'react'
import componentQueries from 'react-component-queries'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import './styles/reduction.css'

import HomePage from 'pages/HomePage'

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute exact path="/accounts/creates" layout={MainLayout} component={CreateAccountPage} />
            <LayoutRoute exact path="/accounts/stakes" layout={MainLayout} component={StakePage} />
            <LayoutRoute exact path="/accounts/rammarkets" layout={MainLayout} component={RammarketPage} />
            <LayoutRoute exact path="/accounts/refunds" layout={MainLayout} component={RefundPage} />

            <LayoutRoute exact path="/login" layout={EmptyLayout} component={props => <AuthPage {...props} authState={STATE_LOGIN} />} />
            <LayoutRoute exact path="/signup" layout={EmptyLayout} component={props => <AuthPage {...props} authState={STATE_SIGNUP} />} />
            <LayoutRoute exact path="/login-modal" layout={MainLayout} component={AuthModalPage} />
            <LayoutRoute exact path="/" layout={MainLayout} component={HomePage} />
            <LayoutRoute exact path="/buttons" layout={MainLayout} component={ButtonPage} />
            <LayoutRoute exact path="/cards" layout={MainLayout} component={CardPage} />
            <LayoutRoute exact path="/widgets" layout={MainLayout} component={WidgetPage} />
            <LayoutRoute exact path="/typography" layout={MainLayout} component={TypographyPage} />
            <LayoutRoute exact path="/alerts" layout={MainLayout} component={AlertPage} />
            <LayoutRoute exact path="/tables" layout={MainLayout} component={TablePage} />
            <LayoutRoute exact path="/badges" layout={MainLayout} component={BadgePage} />
            <LayoutRoute exact path="/button-groups" layout={MainLayout} component={ButtonGroupPage} />
            <LayoutRoute exact path="/dropdowns" layout={MainLayout} component={DropdownPage} />
            <LayoutRoute exact path="/progress" layout={MainLayout} component={ProgressPage} />
            <LayoutRoute exact path="/modals" layout={MainLayout} component={ModalPage} />
            <LayoutRoute exact path="/forms" layout={MainLayout} component={FormPage} />
            <LayoutRoute exact path="/input-groups" layout={MainLayout} component={InputGroupPage} />
            <LayoutRoute exact path="/charts" layout={MainLayout} component={ChartPage} />
            <LayoutRoute exact path="/register" layout={MainLayout} component={AuthPage} />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    )
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' }
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' }
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' }
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' }
  }

  if (width > 1200) {
    return { breakpoint: 'xl' }
  }

  return { breakpoint: 'xs' }
}

export default componentQueries(query)(App)
