import { apiGet, apiPost, apiDelete, apiPut } from "./api";

export async function getAllPosts() {
    return await apiGet("/api/posts");
}

export async function addPost(postData) {
    return await apiPost("/api/posts", postData);
}

export async function deletePost(id) {
    return await apiDelete(`/api/posts/${id}`);
}

export async function updatePost(postData) {
    return await apiPut("/api/posts", postData);
}