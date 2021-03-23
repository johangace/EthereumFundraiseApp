import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'
import Campaign from '../../../ethereum/campaign'

export const getServerSideProps = async (context) => {
  const address = context.query.address

  return {
    props: {
      address,
    },
  }
}
export default class RequestNew extends Component {
  state = {
    value: '',
    decription: '',
    recipient: '',
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    successMessage: '',
    loadingMessage: '',
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({
      loading: true,
      errorMessage: '',
      successMessage: '',
      loadingMessage: 'Working on your request...',
    })
    const campaign = Campaign(this.props.address)
    const { description, value, recipient } = this.state

    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({
          from: accounts[0],
        })
      this.setState({ successMessage: 'Your request was created' })
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }
  render() {
    return (
      <Layout>
        <Form
          loading={!!this.state.loading}
          onSubmit={this.onSubmit}
          error={!!this.state.errorMessage}
          success={!!this.state.successMessage}
        >
          <Form.Field>
            <label> Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            ></Input>
          </Form.Field>
          <Form.Field>
            <label> Value (ETH)</label>
            <Input
              label="ETH"
              labelPosition="right"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            ></Input>
          </Form.Field>
          <Form.Field>
            <label> Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            ></Input>
          </Form.Field>
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
          <Message error header="Oops!" content={this.state.errorMessage} />

          <Message
            success
            header="Success!!"
            content={this.state.successMessage}
          />
        </Form>
        {this.state.loading && <Message header={this.state.loadingMessage} />}
      </Layout>
    )
  }
}
