import { generateApiClient } from 'app/utils/apiUtilsMusic';

const configApi = generateApiClient('configApi');
export const getMusic = data => configApi.get(`?term=${data}`);
