"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {useCart} from "@/context/CartContext";
import {CartIcon, CheckIcon, ChevronDown, CloseIcon, MenuIcon, SearchIcon, UserIcon, UserPlusIcon} from "@/components/Icons";

// Figma: "Каталог" va "Конструктор" ochiladigan menyular
export const CATALOG_LINKS = [
    {href: "/shop?categoryId=1", label: "Авточехлы"},
    {href: "/shop?categoryId=2", label: "Полики"},
    {href: "/shop?categoryId=3", label: "Накидки на торпеду"},
];

export const CONSTRUCTOR_LINKS = [
    {href: "/konstruktor/cover", label: "Конструктор чехлов"},
    {href: "/konstruktor/carpet", label: "Конструктор поликов"},
];

const NAV = [
    {label: "Каталог", href: "/shop", children: CATALOG_LINKS},
    {label: "Конструктор", href: "/konstruktor/cover", children: CONSTRUCTOR_LINKS},
    {label: "Где купить?", href: "/branches"},
    {label: "Контакты", href: "/contacts"},
];

function Dropdown({items, pathname}) {
    return (
        <div className="invisible absolute left-1/2 top-full z-40 w-56 -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
            <div className="overflow-hidden rounded-md bg-white py-1 text-[13px] text-brand-black shadow-lg">
                {items.map((item) => (
                    <Link key={item.href} href={item.href}
                          className="flex items-center gap-2 px-4 py-2.5 hover:bg-surface">
                        <span className="w-4">{pathname + "" === item.href.split("?")[0] && <CheckIcon size={14}/>}</span>
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const {user} = useAuth();
    const {count, setOpen} = useCart();
    const [search, setSearch] = useState("");
    const [menu, setMenu] = useState(false);

    const submitSearch = (e) => {
        e.preventDefault();
        router.push(`/shop?search=${encodeURIComponent(search.trim())}`);
        setMenu(false);
    };

    const isActive = (item) =>
        item.href === "/shop" ? pathname.startsWith("/shop") || pathname.startsWith("/product")
            : pathname.startsWith(item.href.split("/").slice(0, 2).join("/"));

    return (
        <header className="sticky top-0 z-30 bg-white">
            <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4">
                <Link href="/" className="shrink-0"><img src="/logo.png" alt="Cardinar" className="h-6 md:h-7"/></Link>

                <form onSubmit={submitSearch} className="hidden flex-1 items-center justify-center gap-2 md:flex">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Поиск"
                        className="h-9 w-full max-w-[340px] rounded-md bg-surface px-3 text-[13px] outline-none focus:ring-1 focus:ring-brand-black"
                    />
                    <button className="flex h-9 items-center gap-2 rounded-md bg-brand-black px-4 text-[13px] text-white">
                        Search <SearchIcon size={16}/>
                    </button>
                </form>

                <div className="flex items-center gap-5">
                    <button onClick={() => setOpen(true)} className="relative" aria-label="Корзина">
                        <CartIcon size={22}/>
                        {count > 0 && (
                            <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] text-white">
                                {count}
                            </span>
                        )}
                    </button>
                    <Link href={user ? "/orders" : "/login"} className="text-brand-red" aria-label="Профиль">
                        {user ? <UserIcon size={22}/> : <UserPlusIcon size={22}/>}
                    </Link>
                    <span className="hidden items-center gap-1.5 rounded-full px-2 py-1 text-[12px] shadow-sm md:flex">
                        <img src="/flag-ru.png" alt="" className="h-4 w-4 rounded-full object-cover"/> Russian <ChevronDown size={14}/>
                    </span>
                    <button className="md:hidden" onClick={() => setMenu(true)} aria-label="Меню"><MenuIcon size={24}/></button>
                </div>
            </div>

            <nav className="hidden bg-brand-black md:block">
                <ul className="mx-auto flex h-12 max-w-[1200px] items-center justify-center gap-14 text-[13px] text-white/80">
                    {NAV.map((item) => (
                        <li key={item.label} className="group relative flex h-full items-center">
                            <Link href={item.href}
                                  className={isActive(item) ? "flex h-full items-center border-b-2 border-white font-medium text-white" : "flex h-full items-center hover:text-white"}>
                                {item.label}
                            </Link>
                            {item.children && <Dropdown items={item.children} pathname={pathname}/>}
                        </li>
                    ))}
                </ul>
            </nav>

            {menu && (
                <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setMenu(false)}>
                    <div className="h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-6 flex items-center justify-between">
                            <img src="/logo.png" alt="Cardinar" className="h-6"/>
                            <button onClick={() => setMenu(false)} aria-label="Закрыть"><CloseIcon size={24}/></button>
                        </div>
                        <form onSubmit={submitSearch} className="mb-6 flex gap-2">
                            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск"
                                   className="h-10 flex-1 rounded-md bg-surface px-3 text-[14px] outline-none"/>
                            <button className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-black text-white"><SearchIcon size={18}/></button>
                        </form>
                        {NAV.map((item) => (
                            <div key={item.label} className="border-b border-line py-3">
                                <Link href={item.href} onClick={() => setMenu(false)} className="text-[16px] font-medium">{item.label}</Link>
                                {item.children && (
                                    <div className="mt-2 flex flex-col gap-2 pl-3 text-[14px] text-muted">
                                        {item.children.map((child) => (
                                            <Link key={child.href} href={child.href} onClick={() => setMenu(false)}>{child.label}</Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
