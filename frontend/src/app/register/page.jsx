"use client";

import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {Suspense, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {AuthInput, Breadcrumbs} from "@/components/ui";

function RegisterForm() {
    const {register} = useAuth();
    const router = useRouter();
    const next = useSearchParams().get("next") || "/orders";
    const [form, setForm] = useState({fullName: "", phoneNumber: "", email: "", password: "", confirm: "", agree: false});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const set = (key) => (e) => setForm({...form, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value});

    const submit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirm) return setError("Пароли не совпадают");
        setError("");
        setLoading(true);
        try {
            const {confirm: _c, agree: _a, ...payload} = form;
            await register(payload);
            router.push(next);
        } catch (err) {
            setError(err.message === "Email or phone number is already registered" ? "Этот e-mail или телефон уже зарегистрирован" : err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submit} className="mx-auto max-w-[400px] space-y-6 pb-24 pt-10">
            <h1 className="text-[20px]">Регистрация</h1>
            <AuthInput label="Имя" required minLength={2} value={form.fullName} onChange={set("fullName")}/>
            <AuthInput label="Телефон" type="tel" required placeholder="+998 90 123 45 67" value={form.phoneNumber} onChange={set("phoneNumber")}/>
            <AuthInput label="E-mail" type="email" required value={form.email} onChange={set("email")}/>
            <AuthInput label="Пароль" type="password" required minLength={8} value={form.password} onChange={set("password")}/>
            <AuthInput label="Подтверждение пароля" type="password" required minLength={8} value={form.confirm} onChange={set("confirm")}/>
            <label className="flex items-start gap-2 text-[11px]">
                <input type="checkbox" required checked={form.agree} onChange={set("agree")} className="mt-0.5"/>
                <span>Я прочитал <u className="text-brand-primary">«Условиями пользовательского соглашения»</u> и согласен с условиями</span>
            </label>
            {error && <p className="text-[12px] text-brand-red">{error}</p>}
            <button disabled={loading} className="h-11 w-full rounded-sm bg-brand-primary text-[12px] font-medium uppercase text-white disabled:opacity-60">Регистрация</button>
            <Link href={`/login?next=${encodeURIComponent(next)}`}
                  className="flex h-11 w-full items-center justify-center rounded-sm bg-brand-black text-[12px] font-medium uppercase text-white">Авторизация</Link>
        </form>
    );
}

export default function RegisterPage() {
    return (
        <div className="mx-auto max-w-[1200px] px-4">
            <Breadcrumbs items={[{label: "Регистрация"}]}/>
            <Suspense><RegisterForm/></Suspense>
        </div>
    );
}
