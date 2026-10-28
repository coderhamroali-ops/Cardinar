"use client";

import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";
import ProductCard from "@/components/ProductCard";
import {CheckIcon, CloseIcon, MenuIcon} from "@/components/Icons";
import {Pagination} from "@/components/ui";

const PRICE_MAX = 1000000;

function Option({active, onClick, children}) {
    return (
        <button onClick={onClick}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[12px] ${active ? "bg-[#E8EEFF] font-medium" : "hover:bg-surface"}`}>
            {children} {active && <CheckIcon size={14}/>}
        </button>
    );
}

function Group({title, children}) {
    return (
        <div className="border-b border-line py-5 last:border-0">
            <p className="mb-2 px-3 text-[12px] text-muted">{title}</p>
            {children}
        </div>
    );
}

// Figma: chapdan ochiladigan "Фильтр" paneli. Har bir tanlov URL'ga yoziladi, server sahifani qayta yuklaydi.
export default function ShopView({products, categories, colors, carMakes, params}) {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState([Number(params.minPrice ?? 0), Number(params.maxPrice ?? PRICE_MAX)]);

    const colorIds = params.colorIds ? params.colorIds.split(",").map(Number) : [];
    const selectedMake = carMakes.find((make) => String(make.id) === params.carMakeId);

    const apply = (changes) => {
        const next = new URLSearchParams();
        for (const [key, value] of Object.entries({...params, page: undefined, ...changes})) {
            if (value !== undefined && value !== null && value !== "") next.set(key, value);
        }
        router.push(`${pathname}?${next}`, {scroll: false});
    };
    const toggle = (key, value) => apply({[key]: String(params[key]) === String(value) ? undefined : value});
    const toggleColor = (id) =>
        apply({colorIds: (colorIds.includes(id) ? colorIds.filter((c) => c !== id) : [...colorIds, id]).join(",") || undefined});

    const filters = (
        <div className="px-3">
            <img src="/logo.png" alt="Cardinar" className="mb-6 ml-3 h-6"/>
            <Group title="Категории">
                {categories.map((category) => (
                    <Option key={category.id} active={String(category.id) === params.categoryId} onClick={() => toggle("categoryId", category.id)}>
                        {category.title}
                    </Option>
                ))}
                <div className="mt-4 grid grid-cols-5 gap-3 px-3">
                    {colors.slice(0, 10).map((color) => (
                        <button key={color.id} onClick={() => toggleColor(color.id)} title={color.title} aria-label={color.title}
                                className={`h-7 w-7 rounded-full border border-line ring-offset-2 ${colorIds.includes(color.id) ? "ring-2 ring-brand-blue" : ""}`}
                                style={{background: color.color}}/>
                    ))}
                </div>
            </Group>
            <Group title="Модель машины">
                {carMakes.map((make) => (
                    <Option key={make.id} active={String(make.id) === params.carMakeId}
                            onClick={() => apply({carMakeId: String(make.id) === params.carMakeId ? undefined : make.id, carModelId: undefined})}>
                        {make.title}
                    </Option>
                ))}
            </Group>
            <Group title="Марка машины">
                {(selectedMake?.models ?? carMakes.flatMap((make) => make.models)).map((model) => (
                    <Option key={model.id} active={String(model.id) === params.carModelId} onClick={() => toggle("carModelId", model.id)}>
                        {model.title}
                    </Option>
                ))}
            </Group>
            <Group title="Цена, сум">
                <div className="space-y-3 px-3">
                    <input type="range" min={0} max={PRICE_MAX} step={10000} value={price[0]} className="w-full accent-brand-red"
                           onChange={(e) => setPrice([Math.min(Number(e.target.value), price[1]), price[1]])}
                           onMouseUp={() => apply({minPrice: price[0] || undefined})} onTouchEnd={() => apply({minPrice: price[0] || undefined})}/>
                    <input type="range" min={0} max={PRICE_MAX} step={10000} value={price[1]} className="w-full accent-brand-red"
                           onChange={(e) => setPrice([price[0], Math.max(Number(e.target.value), price[0])])}
                           onMouseUp={() => apply({maxPrice: price[1] < PRICE_MAX ? price[1] : undefined})}
                           onTouchEnd={() => apply({maxPrice: price[1] < PRICE_MAX ? price[1] : undefined})}/>
                    <p className="text-[12px] text-muted">{price[0].toLocaleString("ru")} — {price[1].toLocaleString("ru")}</p>
                </div>
            </Group>
            <button onClick={() => router.push(pathname)} className="mb-6 ml-3 text-[12px] text-brand-blue">Сбросить фильтры</button>
        </div>
    );

    return (
        <>
            <button onClick={() => setOpen(true)} className="mb-8 flex items-center gap-6 text-[16px] font-bold">
                <span className="flex h-12 w-12 items-center justify-center rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)]"><MenuIcon/></span>
                Фильтр
            </button>

            {params.search && <p className="mb-6 text-[14px] text-muted">Результаты поиска: «{params.search}»</p>}

            {products.data.length === 0 ? (
                <p className="py-20 text-center text-muted">Товары не найдены</p>
            ) : (
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
                    {products.data.map((product) => <ProductCard key={product.id} product={product}/>)}
                </div>
            )}

            <Pagination page={products.currentPage} totalPages={products.totalPages} onChange={(page) => apply({page})}/>

            {open && (
                <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setOpen(false)}>
                    <aside className="h-full w-[300px] overflow-y-auto bg-white pt-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setOpen(false)} className="absolute left-[260px] top-4" aria-label="Закрыть"><CloseIcon/></button>
                        {filters}
                    </aside>
                </div>
            )}
        </>
    );
}
