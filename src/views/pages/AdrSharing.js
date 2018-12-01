import React from 'react';

class AdrSharing extends React.Component {

  render() {

    return (
      <div id="site_wrapper">
        <div className="site-upper adr-sharing">
          {this.props.header}
          <div className="page-hero">
            <h1 className="heading">asdfsad</h1>
            <span className="description">asdfas</span>
          </div>;
        </div>
        <section className='AdrSharing__main'>
          <form onSubmit={this.redeem} className="form-horizontal" id="redeem-form">
            <div className="form-group">
              <label htmlFor="redeem-address">Eth address</label>
              <input value={'asdfas'} onChange={this.onChangeAddress} type="text" className={"form-control "} id="redeem-address" name="redeem-address" />
            </div>
            <div className="form-group">
              <label htmlFor="redeem-code">Redeem code</label>
              <input value={'asfs'} onChange={this.onChangeCode} type="text" className={"form-control "} id="redeem-code" name="redeem-code" />
            </div>
            <div className="form-group">
              <button id="redeem-submit" form="redeem-form" type="submit" className="btn btn-default">Withdraw</button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}
export default AdrSharing;