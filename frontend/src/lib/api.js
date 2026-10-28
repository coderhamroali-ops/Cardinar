export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Server komponentlar uchun: xato bo'lsa fallback qaytaradi, sahifa yiqilmaydi
export async function getJson(path, fallback = null) {
    try {
        const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
        return res.ok ? await res.json() : fallback;
    } catch {
        return fallback;
    }
}

export function fileUrl(path) {
    if (!path) return "";
    if (/^(https?:|data:)/.test(path)) return path;
    return `${API_URL}/${path.replace(/^\/+/, "")}`;
}

export const getToken = () => (typeof window === "undefined" ? null : localStorage.getItem("token"));

// Brauzer uchun: token avtomatik qo'shiladi, xato bo'lsa backend xabari bilan Error tashlanadi
export async function request(path, { method = "GET", body } = {}) {
    const token = getToken();
    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        const message = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
        throw new Error(message || `Ошибка ${res.status}`);
    }
    return data;
}
