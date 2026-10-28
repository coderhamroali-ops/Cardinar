"use client";

import Link from "next/link";
import {fileUrl} from "@/lib/api";
import {formatPrice, productImage} from "@/lib/format";
import {useCart} from "@/context/CartContext";
import {CloseIcon} from "@/components/Icons";
import {QuantityStepper} from "@/components/ui";

// Figma: o'ngdan chiqadigan "Корзина" paneli
export default function CartDrawer() {
    const {items, total, open, setOpen, update, remove, clear} = useCart();
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setOpen(false)}>
            <aside className="flex h-full w-full max-w-[470px] flex-col bg-white px-6 py-8 md:px-10" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-brand-black pb-4">
                    <h2 className="text-[20px] font-bold">Корзина</h2>
                    {items.length > 0 && <button onClick={clear} className="text-[14px] text-brand-primary">Отчистить корзину</button>}
                </div>

                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 && <p className="py-16 text-center text-muted">Корзина пуста</p>}
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b border-line py-5">
                            <img src={fileUrl(productImage(item.product))} alt="" className="h-24 w-24 shrink-0 bg-surface object-contain p-2"/>
                            <div className="flex-1">
                                <p className="text-[14px]">{item.product?.title}</p>
                                <p className="mt-1 text-[12px] text-muted">{item.articul?.carModel?.title}</p>
                                <p className="mt-3 text-[13px] text-[#A88B5F]">{formatPrice(item.product?.price)}</p>
                            </div>
                            <QuantityStepper value={item.quantity} onChange={(q) => update(item, q)}/>
                            <button onClick={() => remove(item)} aria-label="Удалить" className="self-start text-muted hover:text-brand-black"><CloseIcon size={16}/></button>
                        </div>
                    ))}
                </div>

                {items.length > 0 && (
                    <div className="pt-6">
                        <div className="mb-5 flex justify-between text-[14px]"><span>Итого</span><b>{formatPrice(total)}</b></div>
                        <div className="flex gap-4">
                            <button onClick={() => setOpen(false)} className="h-11 flex-1 rounded-sm border border-brand-black text-[13px]">Продолжить покупки</button>
                            <Link href="/checkout" onClick={() => setOpen(false)}
                                  className="flex h-11 flex-1 items-center justify-center rounded-sm bg-brand-primary text-[13px] text-white">Оформить заказ</Link>
                        </div>
                    </div>
                )}
            </aside>
        </div>
    );
}
