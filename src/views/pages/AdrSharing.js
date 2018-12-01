import React from 'react';
import Metamask from 'blockchain/libs/metamask';
import Stake from 'blockchain/libs/stake';
import Distribution from 'blockchain/libs/distribution';
import config from 'config';

class AdrSharing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountOfStake: 0,
      milestone: 0,
      TXID: ''
    }
    this.share = this.share.bind(this);

    this.metamask = new Metamask();
    this.stake = new Stake(config.eth.DATABASE.ADDRESS, this.metamask.web3);
    this.distribution = new Distribution(config.eth.DISTRIBUTION.ADDRESS, this.metamask.web3);

    this.metamask.fetch()
      .then(data => this.stake.stakeOf(data.ACCOUNT))
      .then(data => {
        this.setState({
          amountOfStake: data
        });
        this.metamask.web3.eth.getBlockNumber((err, milestone) => {
          if (err) return console.log(err);
          this.setState({
            milestone: milestone - milestone % 7
          });
        });
      })
      .catch(err => {
        console.log('== fetch ==', err);
      });
  }

  share(e) {
    e.preventDefault();
    this.distribution.share().then(re => {
      this.setState({TXID: re})
    }).catch(er => {
      console.log(er)
    });
  }


  render() {

    return (
      <div id="site_wrapper">
        <div className="site-upper adr-sharing">
          {this.props.header}
          <div className="page-hero">
            <h1 className="heading">STAKE</h1>
            <span className="description">Long term token</span>
          </div>;
        </div>
        <section className='AdrSharing__main'>
          <form onSubmit={this.share} className="form-horizontal" id="redeem-form">
            <div className="form-group">
              <label htmlFor="redeem-address">Milestone</label>
              <input value={this.state.milestone} onChange={this.onChangeAddress} type="text" className={"form-control "} id="redeem-address" name="redeem-address" />
            </div>
            <div className="form-group">
              <label htmlFor="redeem-code">Amount of STAKE</label>
              <input value={this.state.amountOfStake / 10 ** 18} onChange={this.onChangeCode} type="text" className={"form-control "} id="redeem-code" name="redeem-code" />
            </div>
            <div className="form-group">
              <button id="redeem-submit" form="redeem-form" type="submit" className="btn btn-default">Withdraw</button>
            </div>
            <span id="redeem-error-message">{this.state.TXID}</span>
          </form>
        </section>
      </div>
    );
  }
}
export default AdrSharing;