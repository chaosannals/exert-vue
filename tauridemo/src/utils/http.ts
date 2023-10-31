import { getClient, Body, Response, ResponseType, RequestOptions } from '@tauri-apps/api/http';
import { stringify } from 'qs';
import { useUserStore } from '../stores/UserStore';
import { isEmpty } from 'lodash';

const API_ADDRESS = 'http://127.0.0.1:3001';

const apiSetting = (): RequestOptions => {
    const setting: RequestOptions = {
        timeout: 30,
        responseType: ResponseType.JSON,
    };
    const user = useUserStore();
    if (!isEmpty(user.token)) {
        setting.headers = {
            'Authorization': `Bearer ${user.token}`
        };
    }
    return setting;
}

export const apiGet = async <T>(url: string, query: any): Promise<Response<T>> => {
    const uri = `${API_ADDRESS}${url}?${stringify(query)}`;
    const client = await getClient();
    return await client.get(uri, apiSetting());
};

export const apiPost = async <T>(url: string, data: any): Promise<Response<T>> => {
    const client = await getClient();
    const uri = `${API_ADDRESS}${url}`;
    return await client.post(
        uri,
        Body.json(data),
        apiSetting()
    );
};

export const apiPostForm = async <T>(url: string, data: any): Promise<Response<T>> => {
    const client = await getClient();
    const uri = `${API_ADDRESS}${url}`;
    return await client.post(
        uri,
        Body.form(data),
        apiSetting()
    );
}