var EventEmitter = require('events');
var Distribution_ABI = require('../build/contracts/TokenDistribution.json').abi;

const ADDRESS_ERROR = 'Invalid address';
const INSTANCE_ERROR = 'Cannot create token distribution instance';

class Distribution {
  constructor(Distribution_ADDRESS, web3Instance) {
    class Emitter extends EventEmitter { }
    this.emitter = new Emitter();

    if (!web3Instance) return false;
    this.web3 = web3Instance;

    if (!Distribution_ABI) return false;
    if (!Distribution_ADDRESS || !this.web3.isAddress(Distribution_ADDRESS)) return false;
    var Distribution_CONTRACT = this.web3.eth.contract(Distribution_ABI).at(Distribution_ADDRESS);

    this.DISTRIBUTION = {
      ABI: Distribution_ABI,
      ADDRESS: Distribution_ADDRESS,
      INSTANCE: Distribution_CONTRACT
    }
  }

  /**
   * Statics
   */
  static get ABI() { return Distribution_ABI }

  /**
   * Share the value
   * return number
   */
  share() {
    var self = this;
    return new Promise((resolve, reject) => {
      self.DISTRIBUTION.INSTANCE.share({ from: self.web3.eth.coinbase }, (er, txId) => {
        if (er) return reject(er);
        return resolve(txId);
      });
    });
  }

  /**
   * Watch any changes
   */
  watch() {
    var self = this;
    return new Promise((resolve, reject) => {
      if (!self.DISTRIBUTION) return reject(INSTANCE_ERROR);
      var watcher = self.DISTRIBUTION.INSTANCE.allEvents();
      watcher.watch((er, event) => {
        if (er) return self.emitter.emit('error', er);
        return self.emitter.emit('data', event);
      });

      var stopWatching = function () {
        watcher.stopWatching();
        self.emitter.removeAllListeners();
      }

      return resolve({ stopWatching: stopWatching, event: self.emitter });
    });
  }
}

module.exports = Distribution;