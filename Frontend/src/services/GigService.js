import { apiGet } from "./api";

export async function getAllGigs() {
    return await apiGet("/api/gig");
}

