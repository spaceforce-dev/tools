// eslint-disable-next-line import/no-extraneous-dependencies
import { WsProvider } from '@polkadot/rpc-provider';
import NetworkProviderService from '../network-provider-service';
import { getPolkadotUrl } from '../../../helpers/blockchain-helper';

class PolkadotService extends NetworkProviderService {

  constructor() {
    super();

    this._provider = new WsProvider(getPolkadotUrl());
  }

  get provider() {
    return this._provider;
  }

  async enable() {
    return [];
  }

}

export default PolkadotService;
