"use client";

import {useRef} from "react";
import {ChevronLeft, ChevronRight} from "@/components/Icons";

// Figma: "Популярные товары", "Премиум сегмент", "Похожие товары" — strelkali gorizontal lenta
export default function Carousel({title, children, itemClassName = "w-[220px] md:w-[calc((100%-60px)/4)]"}) {
    const track = useRef(null);
    const scroll = (direction) => track.current?.scrollBy({left: direction * track.current.clientWidth * 0.8, behavior: "smooth"});

    return (
        <section className="py-10">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[15px]">{title}</h2>
                <div className="flex gap-2">
                    <button onClick={() => scroll(-1)} aria-label="Назад"
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-muted hover:text-brand-black"><ChevronLeft size={14}/></button>
                    <button onClick={() => scroll(1)} aria-label="Вперёд"
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-line text-brand-black hover:bg-brand-black hover:text-white"><ChevronRight size={14}/></button>
                </div>
            </div>
            <div ref={track} className="no-scrollbar flex snap-x gap-5 overflow-x-auto">
                {[].concat(children).map((child, i) => (
                    <div key={i} className={`shrink-0 snap-start ${itemClassName}`}>{child}</div>
                ))}
            </div>
        </section>
    );
}
