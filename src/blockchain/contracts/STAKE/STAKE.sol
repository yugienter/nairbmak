pragma solidity ^0.4.24;

import "./StandardSTAKE.sol";

contract STAKE is StandardSTAKE {
  string name_;
  string symbol_;
  uint256 decimals_;

  constructor () public {
    name_ = "STAKE";
    symbol_ = "STAKE";
    decimals_ = 18;
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