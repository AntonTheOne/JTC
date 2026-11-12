import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export async function getAllGigs() {
    return await apiGet("/api/gig");
}

export async function addGig(gig) {
    return await apiPost("/api/gig", gig);
}

export async function updateGig(id, gig) {
    return await apiPut(`/api/gig/${id}`, { id, ...gig });
}

export async function deleteGig(id) {
    return await apiDelete(`/api/gig/${id}`);
}
