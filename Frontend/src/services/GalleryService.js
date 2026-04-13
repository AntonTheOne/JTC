import { apiGet } from "./api";

export async function getAllGalleryItems() {
    return await apiGet("/api/gallery");
}