import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from 'config';
import { Metamask, Token } from '@kambria/contract-cli';

import 'static/styles/index.css';
import logo from 'logo.png';

import { Header, Footer, Nav, NavItem, PageLoader } from '@kambria/kambria-lego';

import routes from 'routes';
import {PrivateRouteWithRender} from 'routes/types';

import Fail from 'views/auth/Fail';
import Error404 from './views/errors/404';

import { updateInfo } from "redux/actions/blockchain.action";
import BlockchainAlert from "views/components/core/BlockchainAlert";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logo: {
        url: '/',
        image: logo
      },
      nav: [
        { url: '/report', title: 'Report', exact: false }
      ]
    };

    this.metamask = new Metamask();
    this.token = new Token(config.eth.KATT.ADDRESS, config.eth.KATT.DECIMALS, this.metamask.web3);
    this.tWatcher = null;

    this.init();
  }

  validateUser() {
    if (this.props.blockchain.NETWORK !== config.eth.NETWORK) return false;
    if (!this.props.blockchain.ACCOUNT) return false;
    if (!this.props.blockchain.TOKEN_BALANCE) return false;
    return true;
  }

  // init
  init() {
    // Fetch metamask
    this.metamask.fetch().then(re => {
      this.getStatusAndUpdateInfo(re);

      this.token.watch(re.ACCOUNT).then(tWatcher => {
        this.tWatcher = tWatcher;
        this.tWatcher.event.on("data", re => {
          console.log("re.BALANCE", re.BALANCE);
          this.props.updateInfo({ TOKEN_BALANCE: re.BALANCE });
        });
        tWatcher.event.on("error", er => {
          console.log(er);
          this.props.updateInfo({ TOKEN_BALANCE: 0 });
        });
      });
    })
      .catch(er => {
        console.log(er);
        var updateData = {
          NETWORK: null,
          NETWORK_NAME: null,
          ACCOUNT: null,
          BALANCE: null,
          CHANGED: null,
          TOKEN_BALANCE: null
        };
        this.getStatusAndUpdateInfo(updateData);
      });

    // Watch metamask & token
    this.metamask
      .watch()
      .then(watcher => {
        console.log("watcher", watcher);
        watcher.event.on("data", re => {
          console.log("watcher re", re);
          this.props.updateInfo(re); //blockchain reload so don't care about data
        });
        watcher.event.on("error", er => {
          console.log(er);
          var updateData = {
            NETWORK: null,
            NETWORK_NAME: null,
            ACCOUNT: null,
            BALANCE: null,
            CHANGED: null,
            TOKEN_BALANCE: null
          };
          this.getStatusAndUpdateInfo(updateData);
        });
      })
      .catch(er => {
        console.log(er);
        var updateData = {
          NETWORK: null,
          NETWORK_NAME: null,
          ACCOUNT: null,
          BALANCE: null,
          CHANGED: null,
          TOKEN_BALANCE: null
        };
        this.getStatusAndUpdateInfo(updateData);
      });

  }

  getStatusAndUpdateInfo = (data) => {
    this.metamask.metaStatus(config.eth.NETWORK).then(re => {
      re.message = this.returnMessageForMetaStatus(re.code);
      data = Object.assign(re, data);
      this.token.metaStatus().then(tmetaStt => {
        data = Object.assign({}, data, tmetaStt);
        this.props.updateInfo(data);
      }).catch(ertmetaStt => {
        data = Object.assign({}, data, ertmetaStt);
        this.props.updateInfo(data);
      });
    }).catch(er => {
      er.message = this.returnMessageForMetaStatus(er.code);
      data = Object.assign(er, data);
      this.props.updateInfo(data);
    });
  }

  returnMessageForMetaStatus = (code) => {
    let message;
    switch (code) {
      case 400:
        message = "Please install Metamask extension";
        break;
      case 401:
        message = "Please login to Metamask";
        break;
      case 402:
        message = "Please switch to Mainnet";
        break;
      case 403:
        message = "Please create an account with Metamask";
        break;
      case 404:
        message = "No Internet connection";
        break;
      case 200:
        message = "Success";
        break;
      case 405:
        message = "Please contact";
        break;
      case 201:
        message = "Success";
        break;
      default:
        break;
    }
    return message;
  }

  render() {
    const header =
    <section>
      {
        this.props.ui.metaSttShow && <BlockchainAlert blockchain={this.props.blockchain} key={1}/>
      }
      <Header logo={this.state.logo}>
        <Nav>
          {this.state.nav.map((item, index) => <NavItem key={index} item={item} />)}
        </Nav>
        {this.props.ui.status === 'loading' && <PageLoader type='top' />}
      </Header>;
    </section>


    const footer = <Footer />;

    return (
        <Switch>
          {
            routes.map((route, i) => route.type === 'public' ? <Route exact key={i} path={route.path} render={(props) => <route.component {...props} header={header} footer={footer} />} /> : <PrivateRouteWithRender exact key={i} condition={this.validateUser()} path={route.path} success={route.component} failure={Fail} header={header} footer={footer} />)
          }
          <Route render={(props) => <Error404 {...props} header={header} footer={footer} />} />
        </Switch>
    );
  }
}

const mapStateToProps = state => ({
  blockchain: state.blockchain,
  ui: state.ui
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateInfo,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));