import { create } from 'apisauce';
import mapKeysDeep from 'map-keys-deep';
import { camelCase, snakeCase } from 'lodash';
import { Config } from 'app/config';

export const apiClients = {
  configApi: null,
  default: null
};
export const getApiClient = (type = 'configApi') => apiClients[type];
export const generateApiClient = (type = 'configApi') => {
  switch (type) {
    case 'configApi':
      apiClients[type] = createApiClientWithTransForm(Config.API_URL_MUSIC);
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(Config.API_URL_MUSIC);
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = baseURL => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform(response => {
    const { data } = response;
    if (response.data) {
      // response.data = mapKeysDeep(data.results, keys => camelCase(keys));
      response.data = data.results;
    }
    return response;
  });

  api.addRequestTransform(request => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, keys => snakeCase(keys));
    }
    return request;
  });
  return api;
};
