import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import $ from 'jquery'

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    $(document).ready(function() {
      var question = $(".faqs .question");
      var answer = $(".faqs .answer");
      $(question).on("click", function() {
        $(answer).slideUp("fast");
        $(question).removeClass("active");
        if (
          $(this)
            .next()
            .css("display") === "none"
        ) {
          $(this)
            .next()
            .slideDown("fast");
          $(this)
            .removeClass("active")
            .addClass("active");
        } else if (
          $(this)
            .next()
            .css("display") === "block"
        ) {
          $(this)
            .next()
            .slideUp("fast");
          $(this).removeClass("active");
        }
      });
    });
  }

  render() {
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