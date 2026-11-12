import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export async function getAllGalleryItems() {
    return await apiGet("/api/gallery");
}

export async function addGalleryItem(image) {
    return await apiPost("/api/gallery", image);
}

export async function updateGalleryItem(id, image) {
    return await apiPut(`/api/gallery/${id}`, { id, ...image });
}

export async function deleteGalleryItem(id) {
    return await apiDelete(`/api/gallery/${id}`);
}
