import React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import bn from 'utils/bemnames'

import {
  Navbar,
  // NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'

import {
  MdNotificationsActive,
  MdNotificationsNone,
  MdInsertChart,
  MdPersonPin,
  MdMessage,
  MdSettingsApplications,
  MdHelp,
  MdClearAll,
  MdExitToApp
} from 'react-icons/lib/md'

import Avatar from 'components/Avatar'
import { UserCard } from 'components/Card'
import Notifications from 'components/Notifications'
import SearchInput from 'components/SearchInput'

import withBadge from 'hocs/withBadge'

import { notificationsData } from 'demos/header'

const bem = bn.create('header')

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  children: <small>5</small>
})(MdNotificationsActive)

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false
  }

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover
    })

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true })
    }
  }

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover
    })
  }

  handleSidebarControlButton = event => {
    event.preventDefault()
    event.stopPropagation()

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open')
  }

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
    const { isNotificationConfirmed } = this.state
    const { accountStore } = this.props

    const accountName = accountStore.loginAccountInfo ? accountStore.loginAccountInfo.account_name : 'Login'
    const balance = accountStore.eosBalance + ' EOS'

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          {accountStore.isLogin && (
            <NavItem className="d-inline-flex">
              <NavLink id="Popover1" className="position-relative">
                {isNotificationConfirmed ? (
                  <MdNotificationsNone size={25} className="text-secondary can-click" onClick={this.toggleNotificationPopover} />
                ) : (
                  <MdNotificationsActiveWithBadge
                    size={25}
                    className="text-secondary can-click animated swing infinite"
                    onClick={this.toggleNotificationPopover}
                  />
                )}
              </NavLink>
              <Popover placement="bottom" isOpen={this.state.isOpenNotificationPopover} toggle={this.toggleNotificationPopover} target="Popover1">
                <PopoverBody>
                  <Notifications notificationsData={notificationsData} />
                </PopoverBody>
              </Popover>
            </NavItem>
          )}

          <NavItem>
            {accountStore.isLogin ? (
              <NavLink id="Popover2">
                <Avatar onClick={this.toggleUserCardPopover} className="can-click" />
              </NavLink>
            ) : (
              <NavLink id="Popover2" onClick={this.onLoginClick}>
                login with scatter
              </NavLink>
            )}
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard title={accountName} subtitle={balance} className="border-light">
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdPersonPin /> Cpu usage
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdInsertChart /> Net usage
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdMessage /> Ram usage
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdExitToApp /> Signout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default compose(
  inject('accountStore'),
  observer
)(Header)
