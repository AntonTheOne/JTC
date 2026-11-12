// Alla anrop till backend går genom den här filen.
// Adressen sätts med VITE_API_URL i .env (se .env.example).
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

function authHeaders() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(url, { method = "GET", body } = {}) {
    const response = await fetch(API_BASE + url, {
        method,
        headers: {
            ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
            ...authHeaders(),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    // Utgången eller ogiltig inloggning: logga ut och skicka till inloggningen.
    if (response.status === 401) {
        localStorage.removeItem("token");
        if (window.location.pathname.startsWith("/admin")) {
            window.location.assign("/login");
        }
        throw new Error("Du behöver logga in igen.");
    }

    if (!response.ok) {
        throw new Error(`Anropet till ${url} misslyckades (${response.status}).`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

export const apiGet = (url) => request(url);
export const apiPost = (url, body) => request(url, { method: "POST", body });
export const apiPut = (url, body) => request(url, { method: "PUT", body });
export const apiPatch = (url, body) => request(url, { method: "PATCH", body });
export const apiDelete = (url) => request(url, { method: "DELETE" });
