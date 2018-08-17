import logo200Image from 'assets/img/logo/logo_200.png'
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg'
import SourceLink from 'components/SourceLink'
import React from 'react'
import FaGithub from 'react-icons/lib/fa/github'
import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdBorderAll,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdPages,
  MdRadioButtonChecked,
  MdSend,
  MdStar,
  MdTextFields,
  MdViewCarousel,
  MdViewDay,
  MdViewList,
  MdWeb,
  MdWidgets
} from 'react-icons/lib/md'
import { NavLink } from 'react-router-dom'
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink
} from 'reactstrap'
import bn from 'utils/bemnames'

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}

const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/explorers', name: 'block explorer', exact: false, Icon: MdWeb },
  { to: '/transfers', name: 'transfers', exact: false, Icon: MdWeb },
  { to: '/bids', name: 'name bids', exact: false, Icon: MdInsertChart }
]

const navAccounts = [
  { to: '/accounts/creates', name: 'create', exact: false, Icon: MdRadioButtonChecked },
  { to: '/accounts/stakes', name: 'stake', exact: false, Icon: MdRadioButtonChecked },
  { to: '/accounts/rammarkets', name: 'ram market', exact: false, Icon: MdRadioButtonChecked },
  { to: '/accounts/refunds', name: 'refund', exact: false, Icon: MdRadioButtonChecked }
]

const navVotes = [
  { to: '/votings', name: 'voting', exact: false, Icon: MdTextFields },
  { to: '/proxy', name: 'proxy', exact: false, Icon: MdBorderAll }
]

const bem = bn.create('sidebar')

class Sidebar extends React.Component {
  state = {
    isOpenAccounts: false,
    isOpenVotes: false
  }

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`]

      return {
        [`isOpen${name}`]: !isOpen
      }
    })
  }

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img src={logo200Image} width="40" height="30" className="pr-2" alt="" />
              <span className="text-white">
                Reduction <FaGithub />
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            <NavItem className={bem.e('nav-item')} onClick={this.handleClick('Accounts')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Accounts</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenAccounts ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform'
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenAccounts}>
              {navAccounts.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem className={bem.e('nav-item')} onClick={this.handleClick('Votes')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdSend className={bem.e('nav-item-icon')} />
                  <span className="">Votes</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenVotes ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform'
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenVotes}>
              {navVotes.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
        </div>
      </aside>
    )
  }
}

export default Sidebar
