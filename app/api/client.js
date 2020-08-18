import { create } from "apisauce";
import cache from "../utils/cache";
import authStorage from "../auth/storage";
import settings from "../config/settings";

const apiClient = create({ baseURL: settings.apiUrl });

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();

  if (!authToken) return;

  request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    // if true --> store data in cache
    cache.store(url, response.data);
    return response;
  }
  // if this block gets executed, call to the server failed --> load data from cache
  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
