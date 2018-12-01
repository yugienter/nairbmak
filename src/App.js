import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from 'config';
import Metamask from 'blockchain/libs/metamask';
import Work from 'blockchain/libs/work';
import Database from 'blockchain/libs/database';

import 'static/styles/index.css';
import logo from 'logo.png';

import { Header, Nav, NavItem, PageLoader } from '@kambria/kambria-lego';

import routes from 'routes';
import { PrivateRouteWithRender } from 'routes/types';

import Fail from 'views/auth/Fail';
import Error404 from './views/errors/404';

import { updateInfo } from "redux/actions/blockchain.action";
import BlockchainAlert from "views/components/core/BlockchainAlert";
import Modal from 'react-bootstrap4-modal';


class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      logo: {
        url: '/',
        image: logo
      },
      nav: [
        { url: '/report', title: 'Report', exact: false },
        { url: '/view-report', title: 'ViewReport', exact: false },
        { url: '/share', title: 'Share', exact: false },
        { url: '/explorer', title: 'Explorer', exact: false }
      ],
      visibleModalScore:false,
      visibleModalClose:false,
      inputNumberClose:0,
      selectNumber:10,
      inputNumber:0
    };

    this.metamask = new Metamask();
    this.work = new Work(config.eth.WORK.ADDRESS, this.metamask.web3);
    this.database = new Database(config.eth.DATABASE.ADDRESS, this.metamask.web3);
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

      this.work.watch(re.ACCOUNT).then(tWatcher => {
        this.tWatcher = tWatcher;
        this.tWatcher.event.on("data", re => {
          this.props.updateInfo({ TOKEN_BALANCE: re.BALANCE });
        });
        tWatcher.event.on("error", er => {
          this.props.updateInfo({ TOKEN_BALANCE: 0 });
        });
      });
    })
      .catch(er => {
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
    this.metamask.watch().then(watcher => {
      watcher.event.on("data", re => {
        this.props.updateInfo(re); //blockchain reload so don't care about data
      });
      watcher.event.on("error", er => {
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
    }).catch(er => {
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
      this.work.metaStatus().then(tmetaStt => {
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

  handleClickBtnScore = (e) => {
    e.preventDefault();
    this.setState({visibleModalScore : true});
  };

  closeModalScore = () => {
    this.setState({visibleModalScore : false});
  }

  handleNumber = e => {
    let { name, value } = e.target;
    this.setState({ [name] : value});
  };

  handleClickBtnClose = (e) => {
    e.preventDefault();
    this.setState({visibleModalClose : true});
  };

  closeModalClose = () => {
    this.setState({visibleModalClose : false});
  }

  handleModalClose = () => {
    if( Number.isInteger(this.state.inputNumberClose) ){
      this.database.closeReport(this.state.inputNumberClose)
        .then(re => {
          this.setState({visibleModalClose : false});
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  render() {
    const header =
      <section>
        {
          this.props.ui.metaSttShow && <BlockchainAlert blockchain={this.props.blockchain} key={1} />
        }
        <a className="fab-buy" href="#">
          Buy
        </a>
        <a className="fab-score" href="#" onClick={this.handleClickBtnScore}>
          Score
        </a>
        <a className="fab-close" href="#" onClick={this.handleClickBtnClose}>
          Close
        </a>
        <Modal visible={this.state.visibleModalScore} dialogClassName="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close-button" onClick={this.closeModalScore}/>
              <div className="content">
              {/* <span className="title">{this.state.messageDone}</span> */}
              <select name="selectNumber" onChange={this.handleNumber} value={this.state.selectNumber}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
              <input type="text" name="inputNumber" style={{ width: "98%", float: "left" }} placeholder="Just input from 0 to 60" value={this.state.inputNumber} onChange={this.handleNumber} />

              </div>
              <input type="button" className="button" value="Score" onClick={this.handleModalClose}/>
              {/* <Button type="primary" customStyle={{"display": "block", "margin": "0 auto 20px"}} onClick={this.updateModal1}>Cập nhật</Button> */}
            </div>
          </div>
        </Modal>
        <Modal visible={this.state.visibleModalClose} dialogClassName="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close-button" onClick={this.closeModalClose}/>
              <div className="content">
              <input type="text" name="inputNumberClose" style={{ width: "98%", float: "left" }} placeholder="Just input number" value={this.state.inputNumberClose} onChange={this.handleNumber} />
              </div>
              <input type="button" className="button" value="Close" onClick={this.closeModalClose}/>
              {/* <Button type="primary" customStyle={{"display": "block", "margin": "0 auto 20px"}} onClick={this.updateModal1}>Cập nhật</Button> */}
            </div>
          </div>
        </Modal>

        <Header logo={this.state.logo}>
          <Nav>
            {this.state.nav.map((item, index) => <NavItem key={index} item={item} />)}
          </Nav>
          {this.props.ui.status === 'loading' && <PageLoader type='top' />}
        </Header>;
      </section>

    return (
      <Switch>
        {
          routes.map((route, i) => route.type === 'public' ? <Route exact key={i} path={route.path} render={(props) => <route.component {...props} header={header} />} /> : <PrivateRouteWithRender exact key={i} condition={this.validateUser()} path={route.path} success={route.component} failure={Fail} header={header} />)
        }
        <Route render={(props) => <Error404 {...props} header={header} />} />
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