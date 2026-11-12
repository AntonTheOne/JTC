import { apiPost } from "./api";

export async function login(username, password) {
    return await apiPost("/api/auth/login", { username, password });
}
