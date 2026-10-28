"use client";

import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {Suspense, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {AuthInput, Breadcrumbs} from "@/components/ui";

function LoginForm() {
    const {login} = useAuth();
    const router = useRouter();
    const next = useSearchParams().get("next") || "/orders";
    const [form, setForm] = useState({login: "", password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(form);
            router.push(next);
        } catch (err) {
            setError(err.message === "Login or password is incorrect" ? "Неверный логин или пароль" : err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submit} className="mx-auto max-w-[400px] space-y-6 pb-24 pt-10">
            <h1 className="text-[20px]">Вход / Авторизация</h1>
            <AuthInput label="E-mail или телефон" required value={form.login} onChange={(e) => setForm({...form, login: e.target.value})}/>
            <AuthInput label="Пароль" type="password" required value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
            {error && <p className="text-[12px] text-brand-red">{error}</p>}
            <button disabled={loading} className="h-11 w-full rounded-sm bg-brand-black text-[12px] font-medium uppercase text-white disabled:opacity-60">Войти</button>
            <Link href={`/register?next=${encodeURIComponent(next)}`}
                  className="flex h-11 w-full items-center justify-center rounded-sm bg-brand-primary text-[12px] font-medium uppercase text-white">Регистрация</Link>
        </form>
    );
}

export default function LoginPage() {
    return (
        <div className="mx-auto max-w-[1200px] px-4">
            <Breadcrumbs items={[{label: "Авторизация"}]}/>
            <Suspense><LoginForm/></Suspense>
        </div>
    );
}
