"use client";

import {useMemo, useRef, useState} from "react";
import {fileUrl, request} from "@/lib/api";
import {CarIcon, ChevronDown} from "@/components/Icons";
import {Field, Modal} from "@/components/ui";

function Select({icon, placeholder, value, onChange, options}) {
    return (
        <label className="relative flex h-11 items-center gap-3 rounded-md bg-white px-3 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
            {icon}
            <select value={value ?? ""} onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
                    className="h-full flex-1 appearance-none bg-transparent text-[12px] font-medium outline-none">
                <option value="">{placeholder}</option>
                {options.map((o) => <option key={o.id} value={o.id}>{o.title}</option>)}
            </select>
            <span className="pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-brand-black text-white"><ChevronDown size={12}/></span>
        </label>
    );
}

function Swatches({colors, value, onChange}) {
    return (
        <div className="grid w-fit grid-cols-5 gap-x-4 gap-y-3">
            {colors.map((color) => (
                <button key={color.id} onClick={() => onChange(color.id)} title={color.title} aria-label={color.title}
                        className={`h-7 w-7 rounded-full border border-line ring-offset-2 ${value === color.id ? "ring-2 ring-brand-blue" : ""}`}
                        style={{background: color.color}}/>
            ))}
        </div>
    );
}

function Section({title, children}) {
    return (
        <div className="mb-7">
            <p className="mb-3 text-[12px] font-bold">{title}</p>
            {children}
        </div>
    );
}

function Toggle({label, checked, onChange}) {
    return (
        <label className="flex cursor-pointer items-center justify-between py-2 text-[12px] font-bold">
            {label}
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-brand-blue"/>
        </label>
    );
}

const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
});

// Konstruktor: tanlangan qatlamlar ustma-ust ko'rsatiladi va canvas orqali JPG'ga yig'iladi
export default function ConstructorView({category, options, carMakes, colors}) {
    const isCover = category === "cover";
    const palette = colors.slice(0, 10);
    const central = options.parts.filter((p) => p.part === "central");
    const side = options.parts.filter((p) => p.part === "side");

    const [state, setState] = useState({
        carMakeId: undefined,
        carModelId: undefined,
        modelId: options.models[0]?.id,
        centralMaterialId: options.materials[0]?.id,
        centralColorId: central[0]?.colorId,
        rareMaterialId: options.materials[0]?.id,
        rareColorId: palette[0]?.id,
        sideMaterialId: options.materials[0]?.id,
        sideColorId: isCover ? palette[0]?.id : side[0]?.colorId,
        stitchColorId: palette[0]?.id,
        withKant: true,
        kantColorId: palette[0]?.id,
        noHeel: false,
        noLogo: false,
    });
    const set = (key) => (value) => setState((s) => ({...s, [key]: value}));
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({fullName: "", phoneNumber: "", email: ""});
    const [status, setStatus] = useState(null);
    const previewRef = useRef(null);

    const make = carMakes.find((m) => m.id === state.carMakeId);
    const model = options.models.find((m) => m.id === state.modelId);

    // Ko'rinadigan qatlamlar: bazaviy rasm (markaziy qism rangi), polikda ustidan kant
    const layers = useMemo(() => {
        const base = central.find((p) => p.colorId === state.centralColorId)?.image ?? model?.image;
        const list = [base];
        if (!isCover && state.withKant) list.push(side.find((p) => p.colorId === state.sideColorId)?.image);
        return list.filter(Boolean);
    }, [central, side, state, model, isCover]);

    const centralColors = central.map((p) => p.color).filter(Boolean);
    const sideColors = side.map((p) => p.color).filter(Boolean);

    const render = async () => {
        const images = await Promise.all(layers.map((layer) => loadImage(fileUrl(layer))));
        const canvas = document.createElement("canvas");
        canvas.width = images[0].naturalWidth;
        canvas.height = images[0].naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#F5F5F5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (const img of images) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg", 0.92);
    };

    const saveJpg = async () => {
        const link = document.createElement("a");
        link.href = await render();
        link.download = `cardinar-${category}.jpg`;
        link.click();
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!state.carMakeId || !state.carModelId) return setStatus("Выберите марку и модель автомобиля");
        setStatus("loading");
        try {
            await request("/public/constructor", {
                method: "POST",
                body: {
                    ...form,
                    email: form.email || undefined,
                    carMakeId: state.carMakeId,
                    carModelId: state.carModelId,
                    category,
                    modelId: state.modelId,
                    withLogo: !state.noLogo,
                    image: await render(),
                },
            });
            setStatus("ok");
        } catch (err) {
            setStatus(err.message);
        }
    };

    const carSelects = (
        <Section title="Автомобиль">
            <div className="space-y-3">
                <Select icon={<CarIcon size={18}/>} placeholder="Выберите марку" value={state.carMakeId} options={carMakes}
                        onChange={(id) => setState((s) => ({...s, carMakeId: id, carModelId: undefined}))}/>
                <Select icon={<CarIcon size={18}/>} placeholder="Выберите модель" value={state.carModelId} options={make?.models ?? []}
                        onChange={set("carModelId")}/>
            </div>
        </Section>
    );

    return (
        <section className="grid gap-10 md:grid-cols-[220px_1fr_220px]">
            <div className="order-2 md:order-1">
                {carSelects}
                <Section title={isCover ? "Модель чехла" : "Модель полика"}>
                    <Select placeholder="Выберите модель" value={state.modelId} options={options.models} onChange={set("modelId")}/>
                </Section>
                {isCover ? (
                    <>
                        <Section title="Материал центральной вставки">
                            <Select placeholder="Материал" value={state.centralMaterialId} options={options.materials} onChange={set("centralMaterialId")}/>
                        </Section>
                        <Section title="Цвет центральной вставки">
                            <Swatches colors={centralColors} value={state.centralColorId} onChange={set("centralColorId")}/>
                        </Section>
                        <hr className="mb-7 border-line"/>
                        <Section title="Материал задней части">
                            <Select placeholder="Материал" value={state.rareMaterialId} options={options.materials} onChange={set("rareMaterialId")}/>
                        </Section>
                        <Section title="Цвет задней части">
                            <Swatches colors={palette} value={state.rareColorId} onChange={set("rareColorId")}/>
                        </Section>
                    </>
                ) : (
                    <Section title="Цвет полика">
                        <Swatches colors={centralColors} value={state.centralColorId} onChange={set("centralColorId")}/>
                    </Section>
                )}
            </div>

            <div className="order-1 md:order-2">
                <div ref={previewRef} className="relative mx-auto aspect-square w-full max-w-[420px] bg-surface">
                    {layers.map((layer, i) => (
                        <img key={layer + i} src={fileUrl(layer)} alt="" className="absolute inset-0 h-full w-full object-contain p-6"/>
                    ))}
                </div>
                <div className="mx-auto mt-10 max-w-[420px] border-l-4 border-brand-black pl-4 text-[11px] leading-relaxed text-muted">
                    <p>Конструктор {isCover ? "чехлов рассчитан на 4-ёх местный автомобиль" : "поликов рассчитан на комплект из 4-х ковриков"} — точную стоимость комплекта уточняйте у наших менеджеров</p>
                    <p className="mt-3">Срок пошива от 15-25 рабочих дней</p>
                </div>
                <div className="mx-auto mt-10 grid max-w-[480px] grid-cols-2 gap-3">
                    <button onClick={() => { setStatus(null); setModal(true); }} className="h-12 rounded-sm bg-brand-black text-[12px] text-white">Оставить заявку</button>
                    <button onClick={saveJpg} className="h-12 rounded-sm border border-brand-black text-[12px]">Сохранить в JPG</button>
                </div>
            </div>

            <div className="order-3">
                {isCover ? (
                    <>
                        <Section title="Материал боковой части">
                            <Select placeholder="Материал" value={state.sideMaterialId} options={options.materials} onChange={set("sideMaterialId")}/>
                        </Section>
                        <Section title="Цвет боковой части">
                            <Swatches colors={palette} value={state.sideColorId} onChange={set("sideColorId")}/>
                        </Section>
                        <hr className="mb-7 border-line"/>
                        <Section title="Цвет строчки">
                            <Swatches colors={palette} value={state.stitchColorId} onChange={set("stitchColorId")}/>
                        </Section>
                        <Section title="Кант">
                            <label className="flex items-center gap-2 text-[12px]">
                                <input type="radio" checked={state.withKant} onChange={() => set("withKant")(true)} className="accent-brand-blue"/> С кантом
                            </label>
                            <label className="mt-2 flex items-center gap-2 text-[12px]">
                                <input type="radio" checked={!state.withKant} onChange={() => set("withKant")(false)} className="accent-brand-blue"/> Без канта
                            </label>
                        </Section>
                        {state.withKant && (
                            <Section title="Цвет канта">
                                <Swatches colors={palette} value={state.kantColorId} onChange={set("kantColorId")}/>
                            </Section>
                        )}
                        <Toggle label="Убрать подпятник" checked={state.noHeel} onChange={set("noHeel")}/>
                    </>
                ) : (
                    <>
                        <Section title="Кант">
                            <label className="flex items-center gap-2 text-[12px]">
                                <input type="radio" checked={state.withKant} onChange={() => set("withKant")(true)} className="accent-brand-blue"/> С кантом
                            </label>
                            <label className="mt-2 flex items-center gap-2 text-[12px]">
                                <input type="radio" checked={!state.withKant} onChange={() => set("withKant")(false)} className="accent-brand-blue"/> Без канта
                            </label>
                        </Section>
                        {state.withKant && (
                            <Section title="Цвет канта">
                                <Swatches colors={sideColors} value={state.sideColorId} onChange={set("sideColorId")}/>
                            </Section>
                        )}
                    </>
                )}
                <Toggle label="Убрать логотип" checked={state.noLogo} onChange={set("noLogo")}/>
            </div>

            {modal && (
                <Modal title="Контактная информация" onClose={() => setModal(false)}>
                    {status === "ok" ? (
                        <p className="py-6 text-[14px]">Заявка отправлена! Наш менеджер свяжется с вами для уточнения стоимости.</p>
                    ) : (
                        <form onSubmit={submit} className="space-y-4">
                            <p className="text-[12px] leading-relaxed text-muted">
                                Конструктор поможет вам подобрать цвета и материалы. Оставьте контакты — менеджер уточнит стоимость и сроки.
                            </p>
                            {(!state.carMakeId || !state.carModelId) && <div className="space-y-3">{carSelects}</div>}
                            <Field label="" placeholder="Ваше имя" required minLength={2} value={form.fullName}
                                   onChange={(e) => setForm({...form, fullName: e.target.value})}/>
                            <Field label="" placeholder="Номер телефона" type="tel" required value={form.phoneNumber}
                                   onChange={(e) => setForm({...form, phoneNumber: e.target.value})}/>
                            <Field label="" placeholder="Email" type="email" value={form.email}
                                   onChange={(e) => setForm({...form, email: e.target.value})}/>
                            {status && status !== "loading" && <p className="text-[12px] text-brand-red">{status}</p>}
                            <button disabled={status === "loading"} className="h-12 w-full rounded-full bg-brand-black text-[14px] text-white disabled:opacity-60">
                                Оставить заявку
                            </button>
                        </form>
                    )}
                </Modal>
            )}
        </section>
    );
}
