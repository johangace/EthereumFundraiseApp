import React, { Component } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'
import Campaign from '../../ethereum/campaign'

export default class ContributeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contribution: '',
      errorMessage: '',
      loading: false,
      successMessage: '',
      loadingMessage: '',
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const campaign = Campaign(this.props.address)

    try {
      const accounts = await web3.eth.getAccounts()
      this.setState({
        loading: true,
        errorMessage: '',
        successMessage: '',
        loadingMessage: 'Working on your request...',
      })
      await campaign.methods.contribute().send({
        //metamask calculates gas
        from: accounts[0],
        value: web3.utils.toWei(this.state.contribution, 'ether'),
      })
      this.setState({ successMessage: 'Your Transaction was completed' })
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <>
        <h3> Contribute to the Campaign</h3>
        <Form
          //returns double oposite => truthy
          loading={!!this.state.loading}
          onSubmit={this.onSubmit}
          error={!!this.state.errorMessage}
          success={!!this.state.successMessage}
        >
          <Form.Field>
            {' '}
            <label> Your Contribution</label>
            <Input
              label="ETH"
              labelPosition="right"
              value={this.state.contribution}
              onChange={(event) =>
                this.setState({ contribution: event.target.value })
              }
            />
          </Form.Field>
          <Button primary> Contribute!</Button>
          <Message error header="Oops!" content={this.state.errorMessage} />

          <Message
            success
            header="Success!!"
            content={this.state.successMessage}
          />
        </Form>
        {this.state.loading && <Message header={this.state.loadingMessage} />}
      </>
    )
  }
}
