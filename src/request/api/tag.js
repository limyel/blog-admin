import {get} from "@/request/http";

let baseUrl = 'admin/tags';

export function apiTags() {
    return get(baseUrl, {pageSize: 999});
}