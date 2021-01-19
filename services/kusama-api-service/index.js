import KusamaProvider from '../network-providers/kusama-service';

const { ApiPromise } = require('@polkadot/api');

class KusamaService {

  constructor() {
    this._providerInstance = new KusamaProvider().provider;

    this._web3 = ApiPromise.create({ provider: this._providerInstance });

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
    this.changeProvider(new KusamaProvider());
  }

}

export default new KusamaService();
