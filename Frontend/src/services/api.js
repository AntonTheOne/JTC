const BASE = "http://localhost:8000";

export async function apiGet(url) {
    const response = await fetch(BASE + url);
    return await response.json();
}

export async function apiPost(url, body) {
    const response = await fetch(BASE + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}