import NetworkProviderService from '../network-provider-service';

class MetaMaskService extends NetworkProviderService {

  constructor() {
    super();
    this.provider = window.ethereum;
    this.provider.autoRefreshOnNetworkChange = false;

    this.eventAccountsChanged = this.eventAccountsChanged.bind(this);
    this.eventChainChanged = this.eventChainChanged.bind(this);

    this.initEvents();
  }

  get provider() {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }
    return this._provider;
  }

  set provider(instance) {
    this._provider = instance;
  }

  isMetaMaskInstalled() {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  }

  async enable() {
    return this.provider.request({ method: 'eth_requestAccounts' });
  }

  initEvents() {
    this.provider.on('accountsChanged', this.eventAccountsChanged);
    this.provider.on('chainChanged', this.eventChainChanged);
  }

  eventAccountsChanged(value) {
    if (value.length) {
      this.emit('accountsChanged', value);
    } else {
      this.emit('disconnect');
    }
  }

  eventChainChanged(value) {
    this.emit('accountsChanged', window.parseInt(value));
  }

  clearEvents() {
    super.clearEvents();
    if (this.provider.off) {
      this.provider.off('accountsChanged', this.eventAccountsChanged);
      this.provider.off('chainChanged', this.eventChainChanged);
    }
  }

}

export default MetaMaskService;
