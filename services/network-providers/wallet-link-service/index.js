import WalletLink from 'walletlink';
import NetworkProviderService from '../network-provider-service';
import { NETWORK } from '../../../blockchain/config';
import { INFURA_NETWORK } from '../../../constants/blockchain-constants';
import { getInfuraUrl } from '../../../helpers/blockchain-helper';

class WalletLinkService extends NetworkProviderService {

  constructor() {
    super();

    this.walletLink = new WalletLink({
      appName: 'Mantra DAO',
      darkMode: false,
    });

    this.provider = this.walletLink.makeWeb3Provider(getInfuraUrl(), INFURA_NETWORK[NETWORK]);
  }

  get provider() {
    return this._provider;
  }

  set provider(instance) {
    this._provider = instance;
  }

  get walletLink() {
    return this._walletLink;
  }

  set walletLink(wallet) {
    this._walletLink = wallet;
  }

  async enable() {
    return this.provider.enable();
  }

}

export default WalletLinkService;
