import {notFound} from "next/navigation";
import {getJson} from "@/lib/api";
import {Breadcrumbs} from "@/components/ui";
import Carousel from "@/components/Carousel";
import HelpForm from "@/components/HelpForm";
import ProductCard from "@/components/ProductCard";
import ProductView from "@/app/product/[id]/ProductView";

export default async function ProductPage({params}) {
    const {id} = await params;
    const [product, similar] = await Promise.all([
        getJson(`/public/products/${id}`),
        getJson(`/public/products/${id}/similar`, []),
    ]);
    if (!product) notFound();

    return (
        <div className="mx-auto max-w-[1200px] px-4">
            <Breadcrumbs items={[{label: product.category?.title, href: `/shop?categoryId=${product.categoryId}`}, {label: product.title}]}/>
            <ProductView product={product}/>

            <section className="mt-16 max-w-[640px]">
                <h2 className="inline-block border-b border-brand-black pb-4 pr-12 text-[14px]">Описание</h2>
                <p className="mt-6 text-[12px] leading-relaxed text-muted">{product.description}</p>
            </section>

            {similar.length > 0 && (
                <Carousel title="Похожие товары на сайте">
                    {similar.map((item) => <ProductCard key={item.id} product={item}/>)}
                </Carousel>
            )}
            <HelpForm/>
        </div>
    );
}
