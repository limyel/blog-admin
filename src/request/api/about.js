import {delete_, get, post, put} from "@/request/http";

let baseUrl = '/admin/abouts';

export function apiAbouts(pageNum, pageSize) {
    return get(baseUrl, {'pageNum': pageNum, 'pageSize': pageSize});
}

export function apiAboutUpdate(id, data) {
    let url = baseUrl + '/' + id;
    return put(url, data);
}

export function apiAboutSave(data) {
    let url = baseUrl;
    return post(url, data);
}

export function apiAboutDelete(id) {
    let url = baseUrl + '/' + id;
    return delete_ (url);
}