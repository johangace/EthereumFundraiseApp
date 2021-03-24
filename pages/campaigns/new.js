import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'
import { fetchQuery, postData } from '../utils'

export default class CampaignNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      minimumContribution: '',
      errorMessage: '',
      loading: false,
      successMessage: '',
      loadingMessage: '',
      description: '',
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({
      loading: true,
      errorMessage: '',
      successMessage: '',
      loadingMessage: 'Working on your request...',
    })
    try {
      const accounts = await web3.eth.getAccounts()
      await postData({
        id: accounts[0],
        description: this.state.description,
      })

      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          //metamask calculates gas
          from: accounts[0],
        })
      this.setState({ successMessage: 'Your Transaction was completed' })

      Router.pushRoute('/')
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <Layout>
        <h3> Create New Campaign</h3>
        <Form
          //returns double oposite => truthy
          loading={!!this.state.loading}
          onSubmit={this.onSubmit}
          error={!!this.state.errorMessage}
          success={!!this.state.successMessage}
        >
          <Form.Field>
            {' '}
            <label> Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            {' '}
            <label> Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Button loading={this.state.loading} primary>
            {' '}
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
