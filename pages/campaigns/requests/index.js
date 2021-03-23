import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import { Link } from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'

export class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    })
  }
  onFinalize = async () => {
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    })
  }

  render() {
    const { HeaderCell, Row, HeaderCellCell, Body, Cell } = Table
    const {
      description,
      value,
      recipient,
      approvalCount,
      complete,
      approvals,
    } = this.props.request

    const { id, approversCount } = this.props

    let canFinalize = approvalCount / approversCount > 0.5 ? true : false
    return (
      <Row disabled={complete} positive={canFinalize && !complete}>
        <Cell> {id}</Cell>
        <Cell> {description}</Cell>
        <Cell> {web3.utils.fromWei(value)}</Cell>
        <Cell> {recipient}</Cell>
        <Cell>
          {approvalCount} / {approversCount}
        </Cell>

        <Cell>
          {complete ? (
            ''
          ) : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {complete && canFinalize ? (
            'Finalized'
          ) : (
            <Button
              // content="Finalize"
              color="teal"
              onClick={this.onFinalize}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    )
  }
}

export default class Requests extends Component {
  static async getInitialProps(props) {
    const { address } = props.query
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()
    const approversCount = await campaign.methods.approversCount().call()
    //iterate every individual request
    //issue one call wait to resolve with promise
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((request, index) => {
          return campaign.methods.requests(index).call()
        }),
    )

    console.log(requests)

    //pass/add requests list of requests to object
    return { address, requests, requestCount, approversCount }
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
          id={index}
        ></RequestRow>
      )
    })
  }

  render() {
    const { Row, HeaderCell, Body, Header } = Table
    // console.log(this.props.description)
    return (
      <Layout>
        <h3 style={{ margin: '15px 0' }}>
          {' '}
          Found {this.props.requestCount} Requests{' '}
        </h3>

        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button
              style={{ margin: '10px 0' }}
              labelPosition="left"
              content="New Request"
              icon="add"
              primary
              floated="right"
            />
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell> <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell> <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approvers Count</HeaderCell>
              <HeaderCell>Approve </HeaderCell>{' '}
              <HeaderCell>Finalize </HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
      </Layout>
    )
  }
}
