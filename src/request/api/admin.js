import {post} from "@/request/http";

let baseUrl = '/admin/admins';

export function apiLogin(data) {
    let url = baseUrl + '/login';
    return post(url, data);
}