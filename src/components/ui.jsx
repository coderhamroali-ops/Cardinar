"use client";

import Link from "next/link";
import {CloseIcon} from "@/components/Icons";

export function Breadcrumbs({items}) {
    return (
        <nav className="flex flex-wrap items-center gap-1.5 py-6 text-[12px] text-brand-black">
            <Link href="/" className="hover:text-brand-red">Главная</Link>
            {items.map((item) => (
                <span key={item.label} className="flex items-center gap-1.5">
                    <span className="text-muted">›</span>
                    {item.href ? <Link href={item.href} className="hover:text-brand-red">{item.label}</Link> : <span>{item.label}</span>}
                </span>
            ))}
        </nav>
    );
}

export function Field({label, required, error, className = "", ...props}) {
    return (
        <label className={`block ${className}`}>
            <span className="mb-1.5 block text-[12px] font-medium">{label}{required && <span className="text-brand-red">*</span>}</span>
            <input {...props} required={required}
                   className="h-10 w-full rounded-sm border border-line px-3 text-[13px] outline-none placeholder:text-muted focus:border-brand-black"/>
            {error && <span className="mt-1 block text-[12px] text-brand-red">{error}</span>}
        </label>
    );
}

// Figma: kirish/ro'yxatdan o'tish maydonlari — yozuv chegaraning ustida
export function AuthInput({label, ...props}) {
    return (
        <label className="relative block">
            <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-muted">{label}</span>
            <input {...props} className="h-12 w-full rounded-sm border border-line px-4 text-[13px] outline-none focus:border-brand-black"/>
        </label>
    );
}

export function Modal({title, onClose, children}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
            <div className="relative w-full max-w-[460px] rounded-xl bg-white p-8" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-surface" aria-label="Закрыть">
                    <CloseIcon size={14}/>
                </button>
                {title && <h3 className="mb-3 text-[24px] font-medium">{title}</h3>}
                {children}
            </div>
        </div>
    );
}

export function QuantityStepper({value, onChange}) {
    return (
        <div className="inline-flex h-9 items-center rounded-sm bg-surface text-[13px]">
            <button type="button" onClick={() => onChange(value - 1)} className="h-full w-8 text-muted hover:text-brand-black">−</button>
            <span className="w-6 text-center">{value}</span>
            <button type="button" onClick={() => onChange(value + 1)} className="h-full w-8 text-muted hover:text-brand-black">+</button>
        </div>
    );
}

export function Pagination({page, totalPages, onChange}) {
    if (totalPages <= 1) return null;
    const pages = [...new Set([1, page - 1, page, page + 1, totalPages])].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
    return (
        <div className="flex items-center justify-center gap-6 py-10 text-[13px]">
            <button disabled={page <= 1} onClick={() => onChange(page - 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted disabled:opacity-40">‹</button>
            {pages.map((p, i) => (
                <span key={p} className="flex items-center gap-6">
                    {i > 0 && p - pages[i - 1] > 1 && <span className="text-muted">…</span>}
                    <button onClick={() => onChange(p)} className={p === page ? "font-bold text-brand-blue" : "text-muted hover:text-brand-black"}>{p}</button>
                </span>
            ))}
            <button disabled={page >= totalPages} onClick={() => onChange(page + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-brand-blue disabled:opacity-40">›</button>
        </div>
    );
}
