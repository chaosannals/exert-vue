import axios, {
    type InternalAxiosRequestConfig,
    type AxiosInstance,
} from 'axios';
import { useCommonStore } from '../stores/common';
import { isEmpty } from 'lodash';

export const HTTP_BASE_URL = process.env.NODE_ENV == 'production' ? '' : '/api';

console.log('http base url:', HTTP_BASE_URL);

export const http: AxiosInstance = axios.create({
    baseURL: HTTP_BASE_URL,
    timeout: 40000,
});

http.interceptors.request.use(async (config: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>> => {
    const common = useCommonStore();
    if (!isEmpty(common.token)) {
        config.headers['Authorization'] = `Bearer ${common.token}`;
    }
    return config;
});
