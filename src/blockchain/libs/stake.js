var EventEmitter = require('events');
var STAKE_ABI = require('../build/contracts/STAKE.json').abi;

const ADDRESS_ERROR = 'Invalid address';
const INSTANCE_ERROR = 'Cannot create STAKE instance';

class Stake {
  constructor(STAKE_ADDRESS, web3Instance) {
    class Emitter extends EventEmitter { }
    this.emitter = new Emitter();

    if (!web3Instance) return false;
    this.web3 = web3Instance;

    if (!STAKE_ABI) return false;
    if (!STAKE_ADDRESS || !this.web3.isAddress(STAKE_ADDRESS)) return false;
    var STAKE_CONTRACT = this.web3.eth.contract(STAKE_ABI).at(STAKE_ADDRESS);

    this.STAKE = {
      ABI: STAKE_ABI,
      ADDRESS: STAKE_ADDRESS,
      INSTANCE: STAKE_CONTRACT
    }
  }

  /**
   * Statics
   */
  static get ABI() { return STAKE_ABI }

  /**
   * Ger balance of STAKE
   * @param string - address
   * return number
   */
  stakeOf(address) {
    var self = this;
    return new Promise((resolve, reject) => {
      if (!self.web3.isAddress(address)) return reject(ADDRESS_ERROR);
      self.STAKE.INSTANCE.stakeOf(address, (er, balance) => {
        if (er) return reject(er);
        return resolve(Number(balance));
      });
    });
  }

  /**
   * Ger total supply of STAKE
   * return number
   */
  totalSupply() {
    var self = this;
    return new Promise((resolve, reject) => {
      self.STAKE.INSTANCE.totalSupply((er, totalSupply) => {
        if (er) return reject(er);
        return resolve(Number(totalSupply));
      });
    });
  }

}

module.exports = Stake;