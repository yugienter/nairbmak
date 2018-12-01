pragma solidity ^0.4.24;

interface STAKEInterface {
  function totalSupply() external view returns (uint256);
  function totalSupplyAt(uint256 _blockNumber) external view returns (uint256);
  function stakeOf(address _owner) external view returns (uint256);
  function stakeOfAt(address _owner, uint256 _blockNumber) external view returns (uint256);
}