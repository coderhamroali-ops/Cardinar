// 500000 -> "500 000 сум"
export function formatPrice(value) {
    return `${Math.round(Number(value ?? 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум`;
}

// "2022-10-03T..." -> "03.10.2022"
export function formatDate(value) {
    const d = new Date(value);
    return [d.getDate(), d.getMonth() + 1].map((n) => String(n).padStart(2, "0")).join(".") + "." + d.getFullYear();
}

export const productImage = (product) => product?.images?.[0]?.image;

export const STATUS_LABELS = { new: "NEW", sale: "SALE", hit: "HIT" };

export const PAYMENT_LABELS = {
    cash: "Наличные",
    payme: "Payme",
    click: "Click",
    uzum: "Uzum bank",
};

export const ORDER_STATUS = {
    processing: { label: "в обработке", className: "border-amber-500 text-amber-600" },
    delivered: { label: "доставлено", className: "border-brand-blue text-brand-blue" },
    canceled: { label: "отменено", className: "border-brand-red text-brand-red" },
};
