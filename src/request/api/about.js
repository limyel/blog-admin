import {get} from "@/request/http";

let baseUrl = '/admin/abouts';

export function apiAbouts(pageNum, pageSize) {
    return get(baseUrl, {'pageNum': pageNum, 'pageSize': pageSize});
}