let Web3 = require('web3');
let NetworkProviderService = require('../network-provider-service');

console.log(NetworkProviderService)

class InfuraService extends NetworkProviderService {

  constructor() {
    super();
    this._provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/INFURA_KEY');
  }

  get provider() {
    return this._provider;
  }

  async enable() {
    return [];
  }

}

module.exports = InfuraService;
