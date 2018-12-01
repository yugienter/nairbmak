pragma solidity ^0.4.24;

import "./../helpers/SafeMath.sol";
import "./../WORK/WORKInterface.sol";
import "./../STAKE/STAKEInterface.sol";

contract TokenDistribution {
  using SafeMath for uint256;

  WORKInterface workToken;
  STAKEInterface stakeToken;
  uint256 duration = 162000;

  mapping (address => uint256) records;
  event Share(address indexed holder, uint256 value, bool ok);

  /**
   * Constructor
   */
  constructor(address _work, address _stake) public {
    workToken = WORKInterface(_work);
    stakeToken = STAKEInterface(_stake);
  }

  /**
   * Modifiers
   */
  modifier validHolder() {
    require(records[msg.sender] != block.number.sub(block.number % duration), "Invalid authentication");
    _;
  }
  
  function share() public validHolder returns (bool) {
    uint256 milestone = block.number.sub(block.number % duration);
    uint256 percentage = stakeToken.stakeOfAt(msg.sender, milestone).mul(100).div(stakeToken.totalSupplyAt(milestone));
    if(percentage < 1) return false;
    records[msg.sender] = milestone;
    uint256 value = percentage.mul(workToken.balanceOf(this)).div(100);
    bool ok = workToken.transfer(msg.sender, value);
    emit Share(msg.sender, value, ok);
    return ok;
  }
}