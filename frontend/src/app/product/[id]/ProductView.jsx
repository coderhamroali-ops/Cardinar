"use client";

import {useState} from "react";
import {fileUrl, request} from "@/lib/api";
import {formatPrice} from "@/lib/format";
import {useCart} from "@/context/CartContext";
import {ChevronRight} from "@/components/Icons";
import {Field, Modal, QuantityStepper} from "@/components/ui";

// Figma: "Купить в один клик" — ro'yxatdan o'tmasdan ariza qoldirish
function OneClickModal({product, articul, quantity, onClose}) {
    const [form, setForm] = useState({fullName: "", phoneNumber: ""});
    const [status, setStatus] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await request("/public/requests", {
                method: "POST",
                body: {
                    ...form,
                    comments: `Купить в один клик: ${product.title}, модель: ${articul?.carModel?.title ?? "-"}, кол-во: ${quantity}`,
                },
            });
            setStatus("ok");
        } catch (err) {
            setStatus(err.message);
        }
    };

    return (
        <Modal title="Купить в один клик" onClose={onClose}>
            {status === "ok" ? (
                <p className="py-6 text-[14px]">Заявка принята! Наш менеджер свяжется с вами в ближайшее время.</p>
            ) : (
                <form onSubmit={submit} className="space-y-4">
                    <p className="text-[12px] leading-relaxed text-muted">
                        *покупая товар в один клик (без регистрации), вы не имеете возможности отслеживать ход заказа и просматривать его историю
                    </p>
                    <Field label="" placeholder="Ваше имя" required minLength={2}
                           value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})}/>
                    <Field label="" placeholder="Номер телефона" type="tel" required
                           value={form.phoneNumber} onChange={(e) => setForm({...form, phoneNumber: e.target.value})}/>
                    {status && status !== "loading" && <p className="text-[12px] text-brand-red">{status}</p>}
                    <button disabled={status === "loading"} className="h-12 w-full rounded-full bg-brand-black text-[14px] text-white disabled:opacity-60">
                        Отправить
                    </button>
                </form>
            )}
        </Modal>
    );
}

export default function ProductView({product}) {
    const {add} = useCart();
    const [imageIndex, setImageIndex] = useState(0);
    const [articul, setArticul] = useState(product.articuls?.[0]);
    const [quantity, setQuantity] = useState(1);
    const [oneClick, setOneClick] = useState(false);
    const [error, setError] = useState("");

    const images = product.images ?? [];

    const addToCart = async () => {
        setError("");
        try {
            await add(product, articul, quantity);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <section className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div className="flex flex-col-reverse gap-4 md:flex-row">
                <div className="flex gap-3 md:flex-col">
                    {images.map((image, i) => (
                        <button key={image.id} onClick={() => setImageIndex(i)}
                                className={`h-20 w-20 shrink-0 bg-surface p-2 md:h-[90px] md:w-[80px] ${i === imageIndex ? "ring-1 ring-brand-black" : ""}`}>
                            <img src={fileUrl(image.image)} alt="" className="h-full w-full object-contain"/>
                        </button>
                    ))}
                </div>
                <div className="relative flex aspect-square flex-1 items-center justify-center bg-surface">
                    <img src={fileUrl(images[imageIndex]?.image)} alt={product.title} className="h-[80%] object-contain"/>
                    {images.length > 1 && (
                        <button onClick={() => setImageIndex((imageIndex + 1) % images.length)} aria-label="Следующее фото"
                                className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-line">
                            <ChevronRight size={16}/>
                        </button>
                    )}
                </div>
            </div>

            <div className="md:pl-10">
                <h1 className="text-[22px]">{product.title}</h1>
                <p className="mt-2 text-[12px] text-muted">Доставка за 1 день / Бесплатно</p>

                <p className="mt-10 text-[12px] text-muted">Выберите модель машины:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {product.articuls?.map((item) => (
                        <button key={item.id} onClick={() => setArticul(item)}
                                className={`rounded-sm border px-3 py-1.5 text-[12px] text-brand-blue ${articul?.id === item.id ? "border-brand-blue bg-[#DCE8FF]" : "border-brand-blue/60"}`}>
                            {item.carModel?.title}
                        </button>
                    ))}
                </div>

                <div className="mt-6"><QuantityStepper value={quantity} onChange={(q) => setQuantity(Math.min(99, Math.max(1, q)))}/></div>

                <p className="mt-6 text-[12px] text-muted">Цена:</p>
                <p className="text-[26px] text-[#A88B5F]">{formatPrice(Number(product.price) * quantity).replace("сум", "Сум")}</p>

                {error && <p className="mt-4 text-[12px] text-brand-red">{error}</p>}
                <div className="mt-10 grid grid-cols-2 gap-3">
                    <button onClick={addToCart} disabled={!articul} className="h-12 rounded-sm bg-brand-black text-[12px] text-white disabled:opacity-50">
                        Добавить в корзину
                    </button>
                    <button onClick={() => setOneClick(true)} className="h-12 rounded-sm border border-brand-black text-[12px]">
                        Купить в один клик
                    </button>
                </div>
            </div>

            {oneClick && <OneClickModal product={product} articul={articul} quantity={quantity} onClose={() => setOneClick(false)}/>}
        </section>
    );
}
