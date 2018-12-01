pragma solidity ^0.4.24;

interface WORKInterface {
  function name() external view returns (string);
  function symbol() external view returns (string);
  function decimals() external view returns (uint256);
  function balanceOf(address who) external view returns (uint256);
  function transfer(address to, uint256 value) external returns (bool);
  function allowance(address owner, address spender) external view returns (uint256);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
}