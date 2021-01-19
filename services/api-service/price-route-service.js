import BaseApiService from '../base-api-service';

class PriceRouteService extends BaseApiService {

  route = 'price';

  /**
   * Get price mantra DAO
   */
  async getMantraDAO() {
    return this.client.get('/mantra-dao');
  }

  /**
   * Get price rio DeFi
   */
  async getRioDeFi() {
    return this.client.get('/rio-defi');
  }

  /**
   * Get price ethereum
   */
  async getEth() {
    return this.client.get('/ethereum');
  }

}

export default PriceRouteService;
