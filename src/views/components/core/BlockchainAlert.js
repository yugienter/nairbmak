import React from 'react';

const BlockchainAlert = (props) => {
  let message = "" ;
  switch (props.blockchain.code) {
    case 401://status: 'METAMASK_FOUND_NO_LOGGED_IN',
      message = <div>Please login with Metamask to unlock all functionality</div>;
      break;
    case 402: //status:METAMASK_FOUND_LOGGED_IN_NETWORK_INVALID
      message = "Please select the correct network from Metamask.";
      break;
    case 400: //status:NO_METAMASK_INSTALLED
      message = "Metamask not installed. Some functionalities may not be accessible on this site.";
      break;
    case 405: //status:METAMASK_FOUND_NO_KAT
      message = "Your account does not have KAT. Some functionalities may not be accessible on this site.";
      break;
    default:
      message = props.blockchain.message;
      break;
  }
  return (
    <div className="blockchain-alert">
        {message}
    </div>
  );

};
export default BlockchainAlert;