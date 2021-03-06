import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import lego from 'static/images/pill.png';

import { updateMessageStatus } from 'redux/actions/ui.action';
import TopActionsBar from 'views/components/core/TopActionsBar';


class Home extends React.Component {

  onButtonClick = () => alert('click');


  showBlinkMessage() {
    //this function to scroll top and make blik 3s
    var bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.style.height = null;
    window.scrollTo(0, 0);
    if (bodyElement.style.height === null) {
      bodyElement.style.height = '100%';
    }
    var blockchainAlert = document.getElementsByClassName('blockchain-alert');
    if (blockchainAlert.length) {
      blockchainAlert[0].classList.add('blink');
      window.clearTimeout(this.timeout);
      this.timeout = window.setTimeout(() => {
        blockchainAlert[0].classList.remove('blink');
      }, 3000);
    }
  }

  updateMessageStatus(code) {
    if (code && ![200, 201].includes(code)) {
      this.props.updateMessageStatus(true);
    }
  }

  componentDidMount() {
    this.updateMessageStatus(this.props.blockchain.code);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.blockchain.code !== nextProps.blockchain.code) {
      this.updateMessageStatus(nextProps.blockchain.code);
    }
  }

  render() {
    return (
      <div id="site_wrapper">
        <div className="site-upper">
          {this.props.header}
          <TopActionsBar />
        </div>
        <main className="main bg-white">
          <div className="container text-center" style={{marginTop: 40}}>
            <img src={lego} className="lego-logo" alt="Lego logo" />
            <hr />
            <h1>Welcome to Nairbmak!</h1>
            <p>Drug distribution information</p>
          </div>
        </main>
      </div>);
  }
}

const mapStateToProps = state => ({
  blockchain: state.blockchain,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateMessageStatus
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
