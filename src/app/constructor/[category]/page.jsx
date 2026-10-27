import {notFound} from "next/navigation";
import {getJson} from "@/lib/api";
import {Breadcrumbs} from "@/components/ui";
import HelpForm from "@/components/HelpForm";
import ConstructorView from "@/app/constructor/[category]/ConstructorView";

const TITLES = {cover: "Конструктор чехлов", carpet: "Конструктор поликов"};

export default async function ConstructorPage({params}) {
    const {category} = await params;
    if (!TITLES[category]) notFound();

    const [options, carMakes, colors] = await Promise.all([
        getJson(`/public/constructor?category=${category}`, {models: [], parts: [], materials: []}),
        getJson("/public/car-makes", []),
        getJson("/public/colors", []),
    ]);

    return (
        <div className="mx-auto max-w-[1200px] px-4">
            <Breadcrumbs items={[{label: TITLES[category]}]}/>
            <ConstructorView key={category} category={category} options={options} carMakes={carMakes} colors={colors}/>
            <HelpForm/>
        </div>
    );
}
