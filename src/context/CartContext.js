"use client";

import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {request} from "@/lib/api";
import {useAuth} from "@/context/AuthContext";

const CartContext = createContext(null);
const GUEST_KEY = "guestCart";

// Mehmon savati localStorage'da saqlanadi; tizimga kirgach serverga ko'chiriladi.
// Tizimga kirgan foydalanuvchi savati serverda (Figma: "корзина будет восстановлена при следующем входе").
export function CartProvider({children}) {
    const {user, loading} = useAuth();
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);

    const readGuest = () => JSON.parse(localStorage.getItem(GUEST_KEY) || "[]");
    const writeGuest = (list) => {
        localStorage.setItem(GUEST_KEY, JSON.stringify(list));
        setItems(list);
    };

    const reload = useCallback(async () => {
        if (!user) return setItems(readGuest());
        setItems(await request("/cart").catch(() => []));
    }, [user]);

    useEffect(() => {
        if (loading) return;
        (async () => {
            const guest = readGuest();
            if (user && guest.length) {
                for (const item of guest) {
                    await request("/cart", {
                        method: "POST",
                        body: {productId: item.productId, articulId: item.articulId, quantity: item.quantity},
                    }).catch(() => null);
                }
                localStorage.removeItem(GUEST_KEY);
            }
            await reload();
        })();
    }, [user, loading, reload]);

    const add = useCallback(async (product, articul, quantity = 1) => {
        if (user) {
            await request("/cart", {method: "POST", body: {productId: product.id, articulId: articul.id, quantity}});
            await reload();
        } else {
            const list = readGuest();
            const existing = list.find((item) => item.articulId === articul.id);
            if (existing) existing.quantity = Math.min(99, existing.quantity + quantity);
            else list.push({id: `guest-${articul.id}`, productId: product.id, articulId: articul.id, quantity, product, articul});
            writeGuest(list);
        }
        setOpen(true);
    }, [user, reload]);

    const update = useCallback(async (item, quantity) => {
        if (quantity < 1) return;
        if (user) {
            await request(`/cart/${item.id}`, {method: "PATCH", body: {quantity}});
            await reload();
        } else {
            writeGuest(readGuest().map((i) => (i.id === item.id ? {...i, quantity} : i)));
        }
    }, [user, reload]);

    const remove = useCallback(async (item) => {
        if (user) {
            await request(`/cart/${item.id}`, {method: "DELETE"});
            await reload();
        } else {
            writeGuest(readGuest().filter((i) => i.id !== item.id));
        }
    }, [user, reload]);

    const clear = useCallback(async () => {
        if (user) await request("/cart", {method: "DELETE"});
        else localStorage.removeItem(GUEST_KEY);
        setItems([]);
    }, [user]);

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + Number(item.product?.price ?? 0) * item.quantity, 0);

    return (
        <CartContext.Provider value={{items, count, total, open, setOpen, add, update, remove, clear, reload}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
