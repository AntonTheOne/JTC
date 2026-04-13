import { apiGet } from "./api";

export async function getAllPosts() {
    return await apiGet("/api/posts");
}