"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {request} from "@/lib/api";
import {formatDate, formatPrice, ORDER_STATUS, PAYMENT_LABELS} from "@/lib/format";
import {useAuth} from "@/context/AuthContext";
import {Breadcrumbs} from "@/components/ui";

// Figma: "История заказов"
export default function OrdersPage() {
    const {user, loading} = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        if (loading) return;
        if (!user) return router.replace("/login?next=/orders");
        request("/orders/my").then(setOrders).catch(() => setOrders([]));
    }, [user, loading, router]);

    return (
        <div className="mx-auto max-w-[1200px] px-4 pb-24">
            <Breadcrumbs items={[{label: "История заказов"}]}/>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[14px]">{user?.fullName} <span className="text-muted">· {user?.email}</span></p>
                <Link href="/logout" className="text-[13px] text-brand-red">Выйти</Link>
            </div>

            {orders === null ? (
                <p className="py-16 text-center text-muted">Загрузка…</p>
            ) : orders.length === 0 ? (
                <p className="py-16 text-center text-muted">У вас пока нет заказов. <Link href="/shop" className="text-brand-blue">Перейти в магазин</Link></p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-[13px]">
                        <thead>
                        <tr className="border-b border-line text-[15px]">
                            {["Товар", "Номер заказа", "Способ оплаты", "Дата заказа", "Сумма заказа", "Статус заказа"].map((h) => (
                                <th key={h} className="pb-3 font-bold">{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => {
                            const status = ORDER_STATUS[order.status];
                            const categories = [...new Set(order.items.map((item) => item.product?.category?.title))].join(", ");
                            return (
                                <tr key={order.id} className="border-b border-line">
                                    <td className="py-3 pr-4">{categories}</td>
                                    <td className="py-3 pr-4">{String(order.id).padStart(6, "0")}</td>
                                    <td className="py-3 pr-4">{PAYMENT_LABELS[order.paymentMethod]}</td>
                                    <td className="py-3 pr-4">{formatDate(order.createdAt)}</td>
                                    <td className="py-3 pr-4">{formatPrice(order.total)}</td>
                                    <td className="py-3">
                                        <span className={`inline-block min-w-[110px] rounded-full border px-3 py-1 text-center text-[11px] ${status.className}`}>{status.label}</span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
