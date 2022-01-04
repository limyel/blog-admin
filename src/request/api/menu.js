import {get} from "@/request/http";

let baseUrl = '/admin/menus'

export function apiMenus() {
    let url = baseUrl;
    return get(url);
}