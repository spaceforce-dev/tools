// eslint-disable-next-line import/no-extraneous-dependencies
import { WsProvider } from '@polkadot/rpc-provider';
import NetworkProviderService from '../network-provider-service';
import { getKusamaUrl } from '../../../helpers/blockchain-helper';

class KusamaService extends NetworkProviderService {

  constructor() {
    super();

    this._provider = new WsProvider(getKusamaUrl());
  }

  get provider() {
    return this._provider;
  }

  async enable() {
    return [];
  }

}

export default KusamaService;
