import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Metamask from 'blockchain/libs/metamask';
import Database from 'blockchain/libs/database';
import config from 'config';
// import $ from 'jquery'

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.metamask = new Metamask();
    this.database = new Database(config.eth.DATABASE.ADDRESS, this.metamask.web3);

    this.fetchReport("0x6a572F664f13831304835FF9CFd37174FdBD2DcD")
  }

  fetchReport(address) {
    for (var i = 0; i < 10; i++) {
      this.database.getBasicReportInfo(address, i).then(re => {
        if(re[0] != '0x'){
          // Add re to array here
        }
      }).catch(er => {
        console.log(er);
      })
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
              <div className="question">
                <p>What can I do with KAT on the platform?</p>
              </div>
              <div className="answer">
                <p>
                  KAT is necessary for participation, transaction, and
                  governance on Kambria. Bounties are rewarded using KAT.
                  Projects can receive KAT as contributions or sponsorship. KAT
                  can also be used to purchase products and services from
                  Kambria’s marketplace.
                </p>
                <br />
                <p>
                  From the governance side, KAT will be used to vote for experts
                  and stake on various operations across the community. It will
                  also be used to signal intent to participate in activities
                  like judging a competition or backing a legal issue.
                </p>
              </div>
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
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);