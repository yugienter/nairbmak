var EventEmitter = require('events');
var TOKEN_ABI = require('../api/contracts/WORK.json').abi;

// Errors
const NULL_ERROR = 'Empty event';
const ACCOUNT_ERROR = 'Cannot get account';
const ADDRESS_ERROR = 'Invalid address';
const INSTANCE_ERROR = 'Cannot create WORK instance';
const STATUS = {
  METAMASK_FOUND_NO_WORK: {
    loggedIn: false,
    code: 405,
    status: 'METAMASK_FOUND_NO_WORK',
    message: 'Has no WORK'
  },
  METAMASK_FOUND_WORK: {
    loggedIn: true,
    code: 201,
    status: 'METAMASK_FOUND_WORK',
    message: 'Success'
  }
}
// Events
const TRANSFER = 'Transfer';

class Token {
  constructor(TOKEN_ADDRESS, web3Instance) {
    class Emitter extends EventEmitter { }
    this.emitter = new Emitter();

    this.USER = {
      ACCOUNT: null,
      BALANCE: null
    }

    if (!web3Instance) return false;
    this.web3 = web3Instance;

    if (!TOKEN_ABI) return false;
    if (!TOKEN_ADDRESS || !this.web3.isAddress(TOKEN_ADDRESS)) return false;
    console.log(1, TOKEN_ABI,TOKEN_ADDRESS)
    var CONTRACT = this.web3.eth.contract(TOKEN_ABI).at(TOKEN_ADDRESS);

    this.TOKEN = {
      ABI: TOKEN_ABI,
      ADDRESS: TOKEN_ADDRESS,
      INSTANCE: CONTRACT
    }
  }

  /**
   * Statics
   */
  static get ABI() { return TOKEN_ABI }

  /**
   * Check token totally
   */
  metaStatus() {
    var self = this;
    return new Promise((resolve, reject) => {
      self.balanceOf(self.web3.eth.coinbase).then(re => {
        if (!re) return reject(STATUS.METAMASK_FOUND_NO_WORK);
        return resolve(STATUS.METAMASK_FOUND_WORK)
      }).catch(er => {
        if (er) return reject(STATUS.METAMASK_FOUND_NO_WORK);
      });
    });
  }

  /**
   * Get decimals
   */
  decimals() {
    var self = this;
    return new Promise((resolve, reject) => {
      self.TOKEN.INSTANCE.decimals((er, decimals) => {
        if (er) return reject(er);
        return resolve(decimals);
      });
    });
  }

  /**
   * Get token balance
   * @param {*} address 
   */
  balanceOf(address) {
    var self = this;
    return new Promise((resolve, reject) => {
      if (!self.web3.isAddress(address)) return reject(ADDRESS_ERROR);
      self.TOKEN.INSTANCE.balanceOf(address, (er, balance) => {
        if (er) return reject(er);
        return resolve(Number(balance));
      });
    });
  }

  /**
   * Get allowance
   * @param {*} allower 
   * @param {*} allowee 
   */
  allowance(allower, allowee) {
    var self = this;
    return new Promise((resolve, reject) => {
      if (!self.web3.isAddress(allower)) return reject(ADDRESS_ERROR);
      if (!self.web3.isAddress(allowee)) return reject(ADDRESS_ERROR);
      self.TOKEN.INSTANCE.allowance(allower, allowee, (er, balance) => {
        if (er) return reject(er);
        return resolve(Number(balance));
      });
    });
  }

  /**
   * Transfer token
   * @param {*} to 
   * @param {*} amount 
   */
  transfer(to, amount) {
    var self = this;
    return new Promise((resolve, reject) => {
      if (!self.web3.isAddress(to)) return reject(ADDRESS_ERROR);
      self.TOKEN.INSTANCE.transfer(
        to,
        amount,
        { from: self.web3.eth.coinbase },
        (er, txId) => {
          if (er) return reject(er);
          return resolve(txId);
        });
    });
  }

  /**
   * Approve token
   * @param {*} to 
   * @param {*} amount 
   */
  approve(to, amount) {
    var self = this;
    return new Promise((resolve, reject) => {
      if (!self.web3.isAddress(to)) return reject(ADDRESS_ERROR);
      self.TOKEN.INSTANCE.approve(
        to,
        amount,
        { from: self.web3.eth.coinbase },
        (er, txId) => {
          if (er) return reject(er);
          return resolve(txId);
        });
    });
  }

  /**
   * Transfer token from allower
   * @param {*} to 
   * @param {*} amount 
   */
  transferFrom(from, to, amount) {
    var self = this;
    return new Promise((resolve, reject) => {
      if (!self.web3.isAddress(from)) return reject(ADDRESS_ERROR);
      if (!self.web3.isAddress(to)) return reject(ADDRESS_ERROR);
      self.TOKEN.INSTANCE.transferFrom(
        from,
        to,
        amount,
        { from: self.web3.eth.coinbase },
        (er, txId) => {
          if (er) return reject(er);
          return resolve(txId);
        });
    });
  }

  /**
   * Watch any changes of balance (Token not Eth)
   */
  watch(address) {
    var self = this;
    return new Promise((resolve, reject) => {
      // Set global vars
      self.USER.ACCOUNT = address;
      self.balanceOf(address).then(re => {
        self.USER.BALANCE = re;
        let data = JSON.parse(JSON.stringify(self.USER));
        return self.emitter.emit('data', data);
      }).catch(er => {
        return self.emitter.emit('error', er);
      });
      // Watch balance
      if (!self.TOKEN) return reject(INSTANCE_ERROR);
      var watcher = self.TOKEN.INSTANCE.allEvents();
      watcher.watch((er, event) => {
        if (er) return self.emitter.emit('error', er);
        if (!event || !event.args) return self.emitter.emit('error', NULL_ERROR);
        // Transfer event
        if (event.event === TRANSFER) {
          if (!self.USER.ACCOUNT) return self.emitter.emit('error', ACCOUNT_ERROR);
          if (event.args.from.toLowerCase() === self.USER.ACCOUNT.toLowerCase()
            || event.args.to.toLowerCase() === self.USER.ACCOUNT.toLowerCase()) {
            self.balanceOf(self.USER.ACCOUNT).then(re => {
              self.USER.BALANCE = re;
              let data = JSON.parse(JSON.stringify(self.USER));
              data.event = event;
              return self.emitter.emit('data', data);
            }).catch(er => {
              return self.emitter.emit('error', er);
            });
          }
        }
        // Other events
        else {
          let data = JSON.parse(JSON.stringify(self.USER));
          data.event = event;
          return self.emitter.emit('data', data);
        }
      });

      var stopWatching = function () {
        watcher.stopWatching();
        self.emitter.removeAllListeners();
      }

      return resolve({ stopWatching: stopWatching, event: self.emitter });
    });
  }
}

module.exports = Token;