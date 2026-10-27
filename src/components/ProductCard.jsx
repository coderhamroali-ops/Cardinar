"use client";

import Link from "next/link";
import {useState} from "react";
import {fileUrl} from "@/lib/api";
import {formatPrice, productImage} from "@/lib/format";
import {useCart} from "@/context/CartContext";
import {CartIcon, CustomizerIcon, PremiumIcon} from "@/components/Icons";
import {Modal} from "@/components/ui";

// "добавить": avval avtomobil modeli (artikul) tanlanadi, keyin savatga qo'shiladi
export function ModelPicker({product, onClose}) {
    const {add} = useCart();
    const [articul, setArticul] = useState(product.articuls?.[0]);
    const [error, setError] = useState("");

    const submit = async () => {
        try {
            await add(product, articul, 1);
            onClose();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <Modal title="Выберите модель машины" onClose={onClose}>
            <p className="mb-4 text-[13px] text-muted">{product.title}</p>
            <div className="flex flex-wrap gap-2">
                {product.articuls?.map((item) => (
                    <button key={item.id} onClick={() => setArticul(item)}
                            className={`rounded-sm border px-3 py-1.5 text-[12px] ${articul?.id === item.id ? "border-brand-blue bg-brand-blue/15 text-brand-blue" : "border-brand-blue/50 text-brand-blue"}`}>
                        {item.carModel?.title}
                    </button>
                ))}
            </div>
            {error && <p className="mt-3 text-[12px] text-brand-red">{error}</p>}
            <button onClick={submit} disabled={!articul}
                    className="mt-6 h-11 w-full rounded-md bg-brand-black text-[13px] text-white disabled:opacity-50">
                Добавить в корзину
            </button>
        </Modal>
    );
}

export default function ProductCard({product}) {
    const [picker, setPicker] = useState(false);

    return (
        <div className="flex flex-col">
            <Link href={`/product/${product.id}`} className="group relative block aspect-[185/193] overflow-hidden bg-surface">
                <img src={fileUrl(productImage(product))} alt={product.title}
                     className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"/>
                <span className="absolute right-3 top-3 flex items-center gap-1.5 text-[10px] text-brand-blue">
                    <CustomizerIcon size={14}/> costumeizer
                </span>
                {product.status && (
                    <span className={`absolute left-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold text-white ${product.status === "sale" ? "bg-brand-red" : "bg-brand-black"}`}>
                        {product.status.toUpperCase()}
                    </span>
                )}
            </Link>
            <div className="mt-3 flex items-start justify-between gap-3 text-[12px]">
                <Link href={`/product/${product.id}`} className="text-muted hover:text-brand-black">{product.title}</Link>
                <span className="shrink-0 font-medium">{formatPrice(product.price)}</span>
            </div>
            <button onClick={() => setPicker(true)}
                    className="mt-4 flex h-8 w-fit items-center gap-3 rounded-sm border border-line px-3 text-[12px] text-brand-blue transition hover:border-brand-blue">
                <CartIcon size={16}/> добавить
            </button>
            {picker && <ModelPicker product={product} onClose={() => setPicker(false)}/>}
        </div>
    );
}

// Figma: "Премиум сегмент на сайте" — qora fonli katta kartochka
export function PremiumCard({product}) {
    return (
        <Link href={`/product/${product.id}`}
              className="group relative block aspect-[4/3] min-w-[280px] overflow-hidden bg-gradient-to-b from-[#2a2a2a] to-black md:min-w-0">
            <img src={fileUrl(productImage(product))} alt={product.title}
                 className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"/>
            <span className="absolute right-4 top-4"><PremiumIcon/></span>
            <div className="absolute bottom-5 left-5 text-white">
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-brand-black">PREMIUM</span>
                <p className="mt-3 text-[13px]">{product.title}</p>
                <span className="text-[10px] underline underline-offset-4">Shop Now</span>
            </div>
        </Link>
    );
}
