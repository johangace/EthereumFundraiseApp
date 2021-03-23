import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
import Layout from './components/Layout'
import { Link } from '../routes'

export async function getStaticProps(context) {
  const campaigns = await factory.methods.getDeployedCampaigns().call()

  if (!campaigns) {
    return {
      notFound: true,
    }
  }

  return {
    // will be passed to the page component as props
    props: { campaigns },
  }
  // - At most once every second
  //, revalidate: 1, // In seconds
}

export default class CampaignIndex extends Component {
  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a> View Campaign</a>
          </Link>
        ),
        fluid: true,
      }
    })
    return (
      <Card.Group
        style={{ overflowWrap: 'break-word' }}
        key={items.address}
        items={items}
      />
    )
  }
  render() {
    console.log(this.props)
    return (
      <Layout>
        {' '}
        <div>
          <h3> Open Campaigns</h3>

          <Link route="/campaigns/new">
            <a>
              <Button
                labelPosition="left"
                content="Create a Campaign"
                icon="add"
                primary
                floated="right"
              />
            </a>
          </Link>
        </div>
        {this.renderCampaigns()}{' '}
      </Layout>
    )
  }
}
