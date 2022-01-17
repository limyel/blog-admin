import {delete_, get, post, put} from "@/request/http";

let baseUrl = "/admin/about-items";

export function apiAboutItems(id) {
    let url = baseUrl + '/about/' + id;
    return get(url);
}

export function apiAboutItemSave(data) {
    return post(baseUrl, data);
}

export function apiAboutItemUpdate(id, data) {
    let url = baseUrl + '/' + id;
    return put(url, data);
}

export function apiAboutItemDelete(id) {
    let url = baseUrl + '/' + id;
    return delete_(url);
}