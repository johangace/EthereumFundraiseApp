import React, { Component } from 'react'
import Layout from '../components/Layout'
import Campaign from '../../ethereum/campaign'
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'
import ContributeForm from '../components/ContributeForm'
import { Link } from '../../routes'
export const getServerSideProps = async (context) => {
  const address = context.query.address
  // query the data based on the address and return as props
  const campaign = Campaign(address)

  const summary = await campaign.methods.getSummary().call()

  return {
    props: {
      address,
      minimumContribution: summary[0],
      balance: summary[0],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
    // queried data
  }
}

export default function CampaignShow(props) {
  const {
    address,
    minimumContribution,
    balance,
    requestCount,
    approversCount,
    manager,
  } = props
  function renderCards() {
    const items = [
      {
        header: web3.utils.fromWei(minimumContribution, 'ether'),
        meta: 'Minimum contribution (ETH)',
        description: `You must contribute at least ${minimumContribution} ETH to become an approver `,
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ETH)',
        description: 'Remaining Balance of the campaign',
      },
      {
        header: requestCount,
        meta: 'Number of Requests ',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who donated to the campaign and can approve a request.',
      },
    ]
    return <Card.Group items={items} center="true" />
  }

  return (
    <Layout>
      <h1> Campaign {address} </h1>

      <Grid>
        <Grid.Column width={11}>
          {' '}
          <h4> Campaign Manager: {manager}</h4>
          {renderCards()}
        </Grid.Column>

        <Grid.Column width={5}>
          {' '}
          <ContributeForm address={address} />
        </Grid.Column>

        <Grid.Column width={12}>
          <Grid.Row>
            <Link route={`/campaigns/${address}/requests`}>
              <a>
                <Button
                  labelPosition="left"
                  content="View Requests"
                  icon="eye"
                  primary
                  floated="left"
                />
              </a>
            </Link>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Layout>
  )
}
