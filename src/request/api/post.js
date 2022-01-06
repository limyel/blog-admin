import {delete_, get, post, put} from "@/request/http";

let baseUrl = '/admin/posts';

export function apiPosts(pageNum, pageSize) {
    let url = baseUrl;
    let params = {'pageNum': pageNum, 'pageSize': pageSize};
    return get(url, params);
}

export function apiPost(id) {
    let url = baseUrl + '/' + id;
    return get(url);
}

export function apiPostUpdate(id, post) {
    let url = baseUrl + '/' + id;
    return put(url, post);
}

export function apiPostSave(post_) {
    let url = baseUrl;
    return post(url, post_);
}

export function apiPostDelete(id) {
    let url = baseUrl + '/' + id;
    return delete_(url);
}