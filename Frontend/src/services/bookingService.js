import { apiGet, apiPost, apiPatch } from "./api";

export async function getAllBookings() {
    return await apiGet("/api/bookingrequest");
}

export async function addBooking(booking) {
    return await apiPost("/api/bookingrequest", booking);
}

export async function updateBookingStatus(id, status, adminResponse) {
    return await apiPatch(`/api/bookingrequest/${id}/status`, { status, adminResponse });
}
