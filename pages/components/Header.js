import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from '../../routes'

export default class MenuExampleMenus extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={{ margin: '5px 0' }}>
        <Link route="/">
          <a className="item">
            {' '}
            <h3> LeapCrowd </h3>
          </a>
        </Link>
        <Menu.Menu position="right">
          <Link route="/">
            <a className="item">Campaigns</a>
          </Link>

          <Link route="/campaigns/new">
            <a className="item">+</a>
          </Link>
        </Menu.Menu>
      </Menu>
    )
  }
}
