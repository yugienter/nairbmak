pragma solidity ^0.4.18;

import "./StandardToken.sol";


/**
 * @title WORK Token
 * 
 * @dev Contructor of the deployment
 */
contract WORK is StandardToken {
  
  string name_;
  string symbol_;
  uint256 decimals_;

  /**
   * @dev constructor
   */
  constructor() public {
    name_ = "WORK";
    symbol_ = "WORK";
    decimals_ = 18;
    totalSupply_ = 5000000000 * 10 ** decimals_;

    balances[msg.sender] = totalSupply_; // coinbase
  }

  function name() public view returns (string) {
    return name_;
  }

  function symbol() public view returns (string) {
    return symbol_;
  }

  function decimals() public view returns (uint256) {
    return decimals_;
  }
}