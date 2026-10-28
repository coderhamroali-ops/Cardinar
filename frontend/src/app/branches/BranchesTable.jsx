"use client";

import {useState} from "react";
import {Modal} from "@/components/ui";

// Manzil bosilganda xarita oynasi ochiladi (OpenStreetMap, API kalit talab qilmaydi)
function MapModal({branch, onClose}) {
    const d = 0.01;
    const bbox = [branch.longitude - d, branch.latitude - d, branch.longitude + d, branch.latitude + d].join(",");
    return (
        <Modal title={branch.title} onClose={onClose}>
            <p className="mb-4 text-[12px] text-muted">{branch.address}</p>
            <iframe title={branch.title} className="h-[300px] w-full rounded-2xl"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${branch.latitude},${branch.longitude}`}/>
            <a target="_blank" rel="noreferrer" className="mt-4 inline-block text-[13px] text-brand-blue"
               href={`https://www.openstreetmap.org/?mlat=${branch.latitude}&mlon=${branch.longitude}#map=16/${branch.latitude}/${branch.longitude}`}>
                Открыть карту
            </a>
        </Modal>
    );
}

export default function BranchesTable({title, branches}) {
    const [map, setMap] = useState(null);
    if (!branches.length) return null;

    return (
        <section className="mb-12">
            <h2 className="mb-6 text-[15px] font-bold">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-[12px]">
                    <thead>
                    <tr className="border-b border-line text-[13px]">
                        {["Магазин", "Адрес", "Район", "Регион", "Телефон для связи"].map((h) => (
                            <th key={h} className="pb-3 font-bold">{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {branches.map((branch) => (
                        <tr key={branch.id} className="border-b border-line">
                            <td className="py-4 pr-4 font-bold text-brand-red">{branch.title}</td>
                            <td className="py-4 pr-4">
                                <button onClick={() => setMap(branch)} className="max-w-[220px] text-left text-[#3D4BB8] hover:underline">
                                    {branch.address}
                                </button>
                            </td>
                            <td className="py-4 pr-4">{branch.district ?? "—"}</td>
                            <td className="py-4 pr-4">{branch.region}</td>
                            <td className="whitespace-nowrap py-4"><a href={`tel:${branch.phoneNumber.replace(/\D/g, "")}`}>{branch.phoneNumber}</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {map && <MapModal branch={map} onClose={() => setMap(null)}/>}
        </section>
    );
}
