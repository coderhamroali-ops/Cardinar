"use client";

import {useState} from "react";
import {request} from "@/lib/api";
import {ArrowRight} from "@/components/Icons";

function Line({label, required, ...props}) {
    return (
        <label className="block">
            <span className="text-[11px] font-medium">{label}{required && <span className="text-brand-red">*</span>}</span>
            <input {...props} required={required}
                   className="block w-full border-b border-white/70 bg-transparent py-1.5 text-[13px] outline-none focus:border-white"/>
        </label>
    );
}

// Figma: "Нужна помощь с выбором?" — har bir sahifa pastidagi qora blok
export default function HelpForm() {
    const [form, setForm] = useState({fullName: "", phoneNumber: "", username: ""});
    const [status, setStatus] = useState(null);
    const set = (key) => (e) => setForm({...form, [key]: e.target.value});

    const submit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await request("/public/requests", {
                method: "POST",
                body: {
                    fullName: form.fullName,
                    phoneNumber: form.phoneNumber,
                    comments: form.username ? `Нужна помощь с выбором. Username: ${form.username}` : "Нужна помощь с выбором",
                },
            });
            setForm({fullName: "", phoneNumber: "", username: ""});
            setStatus("ok");
        } catch (err) {
            setStatus(err.message);
        }
    };

    return (
        <section className="my-16 grid gap-10 rounded-sm bg-brand-black px-8 py-10 text-white md:grid-cols-2 md:px-16">
            <div>
                <h2 className="text-[26px] font-medium uppercase leading-tight">Нужна помощь<br/>с выбором?</h2>
                <p className="mt-3 max-w-[300px] text-[14px] text-white/90">Оставьте свои контакты и наш специалист проконсультирует вас</p>
                <span className="mt-6 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white"><ArrowRight/></span>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-5 md:max-w-[300px]">
                <Line label="Имя" required value={form.fullName} onChange={set("fullName")} minLength={2}/>
                <Line label="Номер телефона" required type="tel" value={form.phoneNumber} onChange={set("phoneNumber")} placeholder="+998"/>
                <Line label="Username" value={form.username} onChange={set("username")}/>
                <button disabled={status === "loading"} className="mt-3 h-10 rounded-sm bg-[#EBEBEB] text-[12px] text-brand-black hover:bg-white disabled:opacity-60">
                    отправить
                </button>
                {status === "ok" && <p className="text-[12px] text-green-400">Спасибо! Мы скоро свяжемся с вами.</p>}
                {status && !["ok", "loading"].includes(status) && <p className="text-[12px] text-red-400">{status}</p>}
            </form>
        </section>
    );
}
