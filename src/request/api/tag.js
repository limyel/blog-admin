import {delete_, get, post, put} from "@/request/http";

let baseUrl = 'admin/tags';

export function apiTagsAll() {
    return get(baseUrl, {pageSize: 999});
}

export function apiTags(pageNum, pageSize) {
    return get(baseUrl, {pageNum: pageSize, pageSize: pageSize});
}

export function apiTagSave(tag) {
    return post(baseUrl, tag);
}

export function apiTagDelete(id) {
    let url = baseUrl + '/' + id;
    return delete_(url);
}

export function apiTagUpdate(id, tag) {
    let url = baseUrl + '/' + id;
    return put(url, tag);
}