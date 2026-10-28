"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {fileUrl, request} from "@/lib/api";
import {formatPrice, productImage} from "@/lib/format";
import {useAuth} from "@/context/AuthContext";
import {useCart} from "@/context/CartContext";
import {CloseIcon} from "@/components/Icons";
import {Breadcrumbs, Field, QuantityStepper} from "@/components/ui";

const PAYMENTS = [
    ["cash", "Наличными или картой при получении"],
    ["payme", "Payme"],
    ["click", "Click"],
    ["uzum", "Uzum bank"],
];

function Step({n, title, children}) {
    return (
        <div>
            <p className="mb-5 flex items-center gap-3 text-[14px]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-black text-[13px]">{n}</span>
                {title}
            </p>
            {children}
        </div>
    );
}

function Radio({checked, onChange, children}) {
    return (
        <label className="flex cursor-pointer items-center gap-2 py-1.5 text-[12px]">
            <input type="radio" checked={checked} onChange={onChange} className="accent-brand-primary"/> {children}
        </label>
    );
}

// Figma: "Оформить заказ" — 4 qadam: xaridor, do'kon, olish usuli, to'lov usuli
export default function CheckoutPage() {
    const {user, loading} = useAuth();
    const {items, total, update, remove, reload} = useCart();
    const router = useRouter();
    const [branches, setBranches] = useState([]);
    const [form, setForm] = useState({fullName: "", phoneNumber: "", email: "", branchId: "", delivery: false, paymentMethod: "cash"});
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (!loading && !user) router.replace("/login?next=/checkout");
    }, [user, loading, router]);

    useEffect(() => {
        request("/public/branches").then(setBranches).catch(() => setBranches([]));
    }, []);

    useEffect(() => {
        if (user) setForm((f) => ({...f, fullName: f.fullName || user.fullName, phoneNumber: f.phoneNumber || user.phoneNumber, email: f.email || user.email}));
    }, [user]);

    const set = (key) => (e) => setForm({...form, [key]: e.target.value});

    const submit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const order = await request("/orders", {
                method: "POST",
                body: {...form, branchId: Number(form.branchId), email: form.email || undefined},
            });
            await reload();
            setStatus({ok: order.id});
        } catch (err) {
            setStatus(err.message);
        }
    };

    if (status?.ok) {
        return (
            <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 py-32 text-center">
                <h1 className="text-[22px]">Спасибо! Заказ №{String(status.ok).padStart(6, "0")} оформлен</h1>
                <p className="mt-3 text-[13px] text-muted">Наш менеджер свяжется с вами для подтверждения.</p>
                <Link href="/orders" className="mt-8 rounded-sm bg-brand-black px-8 py-3 text-[12px] text-white">История заказов</Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-[1200px] px-4 pb-24">
            <Breadcrumbs items={[{label: "Оформить заказ"}]}/>
            <h1 className="text-[20px] font-bold">Оформить заказ</h1>

            <div className="mt-10 space-y-6">
                {items.length === 0 && <p className="text-muted">Корзина пуста. <Link href="/shop" className="text-brand-blue">Перейти в магазин</Link></p>}
                {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-6">
                        <img src={fileUrl(productImage(item.product))} alt="" className="h-28 w-28 bg-surface object-contain p-2"/>
                        <div>
                            <p className="text-[18px]">{item.product?.title}</p>
                            <p className="mt-1 text-[12px] text-muted">{item.articul?.carModel?.title}</p>
                            <div className="mt-3"><QuantityStepper value={item.quantity} onChange={(q) => update(item, q)}/></div>
                            <p className="mt-3 text-[13px] text-[#A88B5F]">{formatPrice(Number(item.product?.price) * item.quantity)}</p>
                        </div>
                        <button onClick={() => remove(item)} className="text-muted hover:text-brand-black" aria-label="Удалить"><CloseIcon size={16}/></button>
                    </div>
                ))}
                {items.length > 0 && <p className="text-[15px]">Итого: <b>{formatPrice(total)}</b></p>}
            </div>

            <form onSubmit={submit} className="mt-14 grid gap-10 md:grid-cols-3">
                <Step n={1} title="Данные покупателя">
                    <div className="space-y-4">
                        <Field label="Ваше имя" placeholder="Ваше имя" required minLength={2} value={form.fullName} onChange={set("fullName")}/>
                        <div>
                            <Field label="Ваш номер телефона" placeholder="Ваш номер телефона" type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")}/>
                            <p className="mt-1 text-[10px] text-muted">Убедитесь, что номер телефона введен верно</p>
                        </div>
                        <Field label="Ваш Email" placeholder="Ваш Email" type="email" value={form.email} onChange={set("email")}/>
                    </div>
                </Step>

                <div className="space-y-10">
                    <Step n={2} title="Выберите магазин">
                        <select required value={form.branchId} onChange={set("branchId")}
                                className="h-10 w-full rounded-sm border border-line px-3 text-[12px] outline-none">
                            <option value="">Адрес магазина</option>
                            {branches.map((b) => <option key={b.id} value={b.id}>{b.title} — {b.address}</option>)}
                        </select>
                    </Step>
                    <Step n={3} title="Выберите способ приёма">
                        <Radio checked={!form.delivery} onChange={() => setForm({...form, delivery: false})}>Самовывоз</Radio>
                        <Radio checked={form.delivery} onChange={() => setForm({...form, delivery: true})}>Доставка</Radio>
                    </Step>
                </div>

                <Step n={4} title="Способ оплаты">
                    {PAYMENTS.map(([value, label]) => (
                        <Radio key={value} checked={form.paymentMethod === value} onChange={() => setForm({...form, paymentMethod: value})}>{label}</Radio>
                    ))}
                    {status && status !== "loading" && <p className="mt-4 text-[12px] text-brand-red">{status}</p>}
                    <button disabled={status === "loading" || items.length === 0}
                            className="mt-8 h-11 w-full rounded-sm bg-brand-primary text-[13px] text-white disabled:opacity-50">
                        Оформить заказ
                    </button>
                </Step>
            </form>
        </div>
    );
}
