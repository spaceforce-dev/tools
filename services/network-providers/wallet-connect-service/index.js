import WalletConnectProvider from '@walletconnect/web3-provider';
import NetworkProviderService from '../network-provider-service';
import { INFURA_API_KEY } from '../../../blockchain/config';

class WalletConnectService extends NetworkProviderService {

  constructor() {
    super();
    this.provider = new WalletConnectProvider({
      infuraId: INFURA_API_KEY,
    });

    this.eventAccountsChanged = this.eventAccountsChanged.bind(this);
    this.eventChainChanged = this.eventChainChanged.bind(this);
    this.eventDisconnect = this.eventDisconnect.bind(this);

    this.initEvents();
  }

  get provider() {
    return this._provider;
  }

  set provider(instance) {
    this._provider = instance;
  }

  async enable() {
    return this.provider.enable();
  }

  async disconnect() {
    return this.provider.disconnect();
  }

  initEvents() {
    this.provider.on('accountsChanged', this.eventAccountsChanged);
    this.provider.on('chainChanged', this.eventChainChanged);
    this.provider.on('disconnect', this.eventDisconnect);
  }

  eventAccountsChanged(value) {
    this.emit('accountsChanged', value);
  }

  eventChainChanged(value) {
    this.emit('accountsChanged', value);
  }

  eventDisconnect() {
    this.emit('disconnect');
  }

  clearEvents() {
    super.clearEvents();
    if (this.provider.off) {
      this.provider.off('accountsChanged', this.eventAccountsChanged);
      this.provider.off('chainChanged', this.eventChainChanged);
      this.provider.off('disconnect', this.eventChainChanged);
    }
  }

}

export default WalletConnectService;
