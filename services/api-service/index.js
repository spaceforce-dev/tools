import { API_URL } from '../../blockchain/config';
import PriceRouteService from './price-route-service';

class ApiService {

  constructor(url) {
    this.price = new PriceRouteService(url);
  }

}

export default new ApiService(API_URL);
