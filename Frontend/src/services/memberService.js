import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export async function getMembers() {
    return await apiGet("/api/member");
}

export async function addMember(member) {
    return await apiPost("/api/member", member);
}

export async function updateMember(id, member) {
    return await apiPut(`/api/member/${id}`, { id, ...member });
}

export async function deleteMember(id) {
    return await apiDelete(`/api/member/${id}`);
}
