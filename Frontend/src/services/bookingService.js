import { apiGet } from "./api";

export async function getAllBookings() {
  return await apiGet("/api/bookingrequest");
}