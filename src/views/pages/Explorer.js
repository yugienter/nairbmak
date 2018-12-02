import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Metamask from 'blockchain/libs/metamask';
import Database from 'blockchain/libs/database';
import config from 'config';
import { getAdrReport } from "../../redux/actions/adrReport.action.js";

// import $ from 'jquery'

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.metamask = new Metamask();
    this.database = new Database(config.eth.DATABASE.ADDRESS, this.metamask.web3);
  }

  componentWillReceiveProps(props) {
    if (props.blockchain && props.blockchain.ACCOUNT) {
      this.fetchReport(props.blockchain.ACCOUNT);
    }
  }

  fetchReport(address) {
    let k = 0;
    for (var i = 0; i < 10; i++) {
      this.database.getBasicReportInfo(address, i).then(re => {
        console.log(re)
        if (re[0] != '0x') {
          const hash = re[0].substr(2);
          this.props.getAdrReport({ hash: hash, isEncoded: true }, (data) => {
            this.setState((state, props) => ({
              data: [...state.data, data ]
            }));
          });
        }
      }).catch(er => {
        console.log(er);
      });
    }
  }

  // componentDidMount() {
  //   $(document).ready(function() {
  //     var question = $(".faqs .question");
  //     var answer = $(".faqs .answer");
  //     $(question).on("click", function() {
  //       $(answer).slideUp("fast");
  //       $(question).removeClass("active");
  //       if (
  //         $(this)
  //           .next()
  //           .css("display") === "none"
  //       ) {
  //         $(this)
  //           .next()
  //           .slideDown("fast");
  //         $(this)
  //           .removeClass("active")
  //           .addClass("active");
  //       } else if (
  //         $(this)
  //           .next()
  //           .css("display") === "block"
  //       ) {
  //         $(this)
  //           .next()
  //           .slideUp("fast");
  //         $(this).removeClass("active");
  //       }
  //     });
  //   });
  // }

  render() {
    // console.log(this.state)
    return (
      <div id="site_wrapper" className="contact-wrapper">
        {this.props.header}
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div id="faqs" className="faqs">
            <div className="container">
              {
                this.state.data.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="question active">
                        <p>{item.hash}</p>
                      </div>
                      <div className="answer" style={{ display: 'block' }}>
                        <pre><code>{JSON.stringify(item, null, 2)}</code></pre>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <br />
          <br />
        </div>
        {this.props.footer}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  blockchain: state.blockchain
});

const mapDispatchToProps = dispatch => ({
  getAdrReport: (options, callback) => dispatch(getAdrReport(options, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);