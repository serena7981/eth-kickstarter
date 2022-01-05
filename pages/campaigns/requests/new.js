import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import campaignContract from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Router, Link } from "../../../routes";

class CampaignRequestsNew extends Component {
  state = {
    address: "",
    description: "",
    amount: "",
    recipient: "",
    errorMessage: "",
    isLoading: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { description, amount, recipient } = this.state;

    this.setState({ isLoading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = await campaignContract(this.props.address);

      await contract.methods
        .createRequest(
          description,
          web3.utils.toWei(amount, "ether"),
          recipient
        )
        .send({
          from: accounts[0],
        });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Amount in Ether</label>
            <Input
              value={this.state.amount}
              onChange={(event) =>
                this.setState({ amount: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.isLoading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignRequestsNew;
