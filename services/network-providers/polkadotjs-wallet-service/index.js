import NetworkProviderService from '../network-provider-service';
import PolkadotService from '../polkadot-service';
import { DAPP_NAME } from '../../../blockchain/config';

class PolkadotJsService extends NetworkProviderService {

  constructor() {
    super();
    this.provider = window.__polkadotjs;
    this.provider.autoRefreshOnNetworkChange = false;

    // this.eventAccountsChanged = this.eventAccountsChanged.bind(this);
    // this.eventChainChanged = this.eventChainChanged.bind(this);

    // this.initEvents();
  }

  get provider() {
    if (!this.isPolkadotJsInstalled()) {
      throw new Error('Polkadot.js is not installed');
    }
    return this._provider;
  }

  set provider(instance) {
    this._provider = instance;
  }

  isPolkadotJsInstalled() {
    const { __polkadotjs } = window;
    return Boolean(__polkadotjs);
  }

  async enable() {
    // eslint-disable-next-line no-return-await
    return await PolkadotService(DAPP_NAME);
  }

  //   initEvents() {
  //     this.provider.on('accountsChanged', this.eventAccountsChanged);
  //     this.provider.on('chainChanged', this.eventChainChanged);
  //   }

  //   eventAccountsChanged(value) {
  //     if (value.length) {
  //       this.emit('accountsChanged', value);
  //     } else {
  //       this.emit('disconnect');
  //     }
  //   }

  //   eventChainChanged(value) {
  //     this.emit('accountsChanged', window.parseInt(value));
  //   }

  // clearEvents() {
  //   super.clearEvents();
  //   this.provider.off('accountsChanged', this.eventAccountsChanged);
  //   this.provider.off('chainChanged', this.eventChainChanged);
  // }

}

export default PolkadotJsService;
