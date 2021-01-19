let Web3 = require('web3');
let InfuraService = require('../network-providers/infura-service');

class Web3Service {

  constructor() {
    this._providerInstance = new InfuraService();
    this._web3 = new Web3(this._providerInstance.provider);

    this.events = {};
  }

  get web3() {
    return this._web3;
  }

  get eth() {
    if (!this.web3.eth) {
      throw new Error('Eth not available');
    }
    return this.web3.eth;
  }

  get providerInstance() {
    return this._providerInstance;
  }

  set providerInstance(instance) {
    this._providerInstance = instance;
  }

  changeProvider(instance) {
    this.providerInstance.clearEvents();
    this.providerInstance = instance;
    this.web3.setProvider(this.providerInstance.provider);
  }

  disconnect() {
    if (this.providerInstance.disconnect) {
      this.providerInstance.disconnect();
    }
    this.changeProvider(new InfuraService());
  }

}

module.exports = new Web3Service();
