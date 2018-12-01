import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import lego from 'static/images/lego.png';
import { Button } from '@kambria/kambria-lego';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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
            <h1>Welcome to Nairbmak Lego!</h1>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
          </p>
            <p>
              <Button type="secondary" icon={<FontAwesomeIcon icon={faCoffee} />} onButtonClick={this.onButtonClick}>Learn More</Button>
            </p>
          </div>
        </main>
        {this.props.footer}
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
