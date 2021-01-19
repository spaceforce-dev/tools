import {
  get, post, patch, put, del,
} from '../util/fetch-data';

export default class BaseApiService {

  route = null;

  constructor(url, fields = {}) {
    this.url = url;
    Object.keys(fields).forEach((key) => {
      this[key] = fields[key];
    });
  }

  get client() {
    return {
      get: (...params) => this._get(...params),
      post: (...params) => this._post(...params),
      patch: (...params) => this._patch(...params),
      put: (...params) => this._put(...params),
      del: (...params) => this._del(...params),
    };
  }

  _getUrl() {
    return `${this.url}${this.route ? `/${this.route}` : ''}`;
  }

  _get(method, data, options) {
    return get(`${this._getUrl()}${method}`, data, options);
  }

  _post(method, data, options) {
    return post(`${this._getUrl()}${method}`, data, options);
  }

  _patch(method, data, options) {
    return patch(`${this._getUrl()}${method}`, data, options);
  }

  _put(method, data, options) {
    return put(`${this._getUrl()}${method}`, data, options);
  }

  _del(method, data, options) {
    return del(`${this._getUrl()}${method}`, data, options);
  }

}
