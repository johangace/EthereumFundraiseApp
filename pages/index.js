import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
import Layout from './components/Layout'
import { Link } from '../routes'
import { json } from 'body-parser'
import { fetchQuery, postData } from './utils'

export async function getServerSideProps(context) {
  const campaigns = await factory.methods.getDeployedCampaigns().call()

  if (!campaigns) {
    return {
      notFound: true,
    }
  }

  const campaignItems = await fetchQuery('items')

  // console.log(campaignItems)
  return {
    // will be passed to the page component as props
    props: {
      campaigns,
      campaignItems: campaignItems,
    },
  }
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
    return (
      <Layout>
        {' '}
        <div>
          <h3> Open Campaigns</h3>
          {/* {this.props.campaignItems.map((i) => {
            return i.description
          })} */}
          {/* {this.props.Data} */}

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
