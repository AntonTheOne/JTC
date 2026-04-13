import { apiGet } from "./api";

export async function getMembers() {
    return await apiGet("/api/member");
}