"use client";

import Link from "next/link";
import {useEffect} from "react";
import {useAuth} from "@/context/AuthContext";
import {Breadcrumbs} from "@/components/ui";
import {LogoutIcon} from "@/components/Icons";

// Figma: "Выход" sahifasi. Savat serverda qoladi va keyingi kirishda tiklanadi.
export default function LogoutPage() {
    const {logout} = useAuth();
    useEffect(() => logout(), [logout]);

    return (
        <div className="mx-auto max-w-[1200px] px-4 pb-32">
            <Breadcrumbs items={[{label: "Личный кабинет", href: "/orders"}, {label: "Выход"}]}/>
            <div className="flex flex-col items-center pt-16 text-center">
                <LogoutIcon size={64}/>
                <p className="mt-12 text-[12px]">Вы вышли из Личного Кабинета.</p>
                <p className="text-[12px]">Ваша корзина покупок была сохранена. Она будет восстановлена при следующем входе в Ваш Личный Кабинет.</p>
                <Link href="/" className="mt-16 flex h-10 w-[180px] items-center justify-center rounded-sm border border-brand-black text-[12px] uppercase">
                    Продолжить
                </Link>
            </div>
        </div>
    );
}
