import { getClient, Body, Response, ResponseType } from '@tauri-apps/api/http';
import { stringify } from 'qs';

const API_ADDRESS = 'http://127.0.0.1:3001';

const API_CLIENT_SETTING = {
    timeout: 30,
    responseType: ResponseType.JSON,
};

export const apiGet = async <T>(url: string, query: any): Promise<Response<T>> => {
    const uri = `${API_ADDRESS}${url}?${stringify(query)}`;
    const client = await getClient();
    return await client.get(uri, API_CLIENT_SETTING);
};

export const apiPost = async <T>(url: string, data: any): Promise<Response<T>> => {
    const client = await getClient();
    const uri = `${API_ADDRESS}${url}`;
    return await client.post(uri,
        Body.json(data),
        API_CLIENT_SETTING
    );
};

export const apiPostForm = async <T>(url: string, data: any): Promise<Response<T>> => {
    const client = await getClient();
    const uri = `${API_ADDRESS}${url}`;
    return await client.post(uri,
        Body.form(data),
    );
}