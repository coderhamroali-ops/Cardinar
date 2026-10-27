"use client";

import {useState} from "react";
import {request} from "@/lib/api";
import {Field} from "@/components/ui";

const EMPTY = {fullName: "", phoneNumber: "", email: "", comments: ""};

export default function ContactForm() {
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState(null);
    const set = (key) => (e) => setForm({...form, [key]: e.target.value});

    const submit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await request("/public/requests", {
                method: "POST",
                body: {...form, email: form.email || undefined, comments: form.comments || undefined},
            });
            setForm(EMPTY);
            setStatus("ok");
        } catch (err) {
            setStatus(err.message);
        }
    };

    return (
        <form onSubmit={submit} className="mt-10 space-y-5">
            <Field label="Ваше имя" required placeholder="Ваше имя" minLength={2} value={form.fullName} onChange={set("fullName")} className="max-w-[300px]"/>
            <Field label="Ваш номер телефона" required type="tel" placeholder="Ваш номер телефона" value={form.phoneNumber} onChange={set("phoneNumber")} className="max-w-[300px]"/>
            <Field label="Ваш Email" type="email" placeholder="Ваш Email" value={form.email} onChange={set("email")} className="max-w-[300px]"/>
            <label className="block max-w-[480px]">
                <span className="mb-1.5 block text-[12px] font-medium">Комментарии</span>
                <textarea value={form.comments} onChange={set("comments")} rows={6} maxLength={2000}
                          className="w-full rounded-sm border border-line p-3 text-[13px] outline-none focus:border-brand-black"/>
            </label>
            {status === "ok" && <p className="text-[13px] text-green-600">Спасибо! Мы свяжемся с вами в ближайшее время.</p>}
            {status && !["ok", "loading"].includes(status) && <p className="text-[13px] text-brand-red">{status}</p>}
            <button disabled={status === "loading"} className="h-11 w-[150px] rounded-sm bg-brand-black text-[12px] text-white disabled:opacity-60">
                отправить
            </button>
        </form>
    );
}
