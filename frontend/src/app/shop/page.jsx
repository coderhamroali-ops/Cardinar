import {getJson} from "@/lib/api";
import {Breadcrumbs} from "@/components/ui";
import HelpForm from "@/components/HelpForm";
import ShopView from "@/app/shop/ShopView";

const FILTER_KEYS = ["categoryId", "colorIds", "carMakeId", "carModelId", "minPrice", "maxPrice", "search", "page", "isPremium", "status"];

export default async function ShopPage({searchParams}) {
    const params = await searchParams;
    const query = new URLSearchParams({size: "12"});
    for (const key of FILTER_KEYS) if (params[key]) query.set(key, params[key]);

    const [products, categories, colors, carMakes] = await Promise.all([
        getJson(`/public/products?${query}`, {data: [], totalPages: 1, currentPage: 1}),
        getJson("/public/categories", []),
        getJson("/public/colors", []),
        getJson("/public/car-makes", []),
    ]);

    return (
        <div className="mx-auto max-w-[1200px] px-4">
            <Breadcrumbs items={[{label: "Магазин"}]}/>
            <ShopView products={products} categories={categories} colors={colors} carMakes={carMakes} params={params}/>
            <HelpForm/>
        </div>
    );
}
