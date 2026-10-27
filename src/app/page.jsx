import Link from "next/link";
import {fileUrl, getJson} from "@/lib/api";
import {productImage} from "@/lib/format";
import Carousel from "@/components/Carousel";
import HelpForm from "@/components/HelpForm";
import ProductCard, {PremiumCard} from "@/components/ProductCard";
import {ArrowRight} from "@/components/Icons";

function PromoTile({href, image, badge, title, subtitle, className = "", imageClass = "object-cover"}) {
    return (
        <Link href={href} className={`group relative block overflow-hidden bg-brand-black ${className}`}>
            <img src={fileUrl(image)} alt={title} className={`h-full w-full transition duration-500 group-hover:scale-105 ${imageClass}`}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"/>
            <div className="absolute bottom-5 left-5 text-white">
                {badge && <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${badge === "SALE" ? "bg-brand-red text-white" : "bg-white text-brand-black"}`}>{badge}</span>}
                <p className="mt-3 text-[14px] font-medium">{title}</p>
                {subtitle && <p className="text-[10px] text-white/80">{subtitle}</p>}
                <span className="text-[10px] underline underline-offset-4">Shop Now</span>
            </div>
        </Link>
    );
}

export default async function HomePage() {
    const [site, popular, premium, fresh] = await Promise.all([
        getJson("/public/site", {}),
        getJson("/public/products?size=12&categoryId=1", {data: []}),
        getJson("/public/products?size=8&isPremium=true", {data: []}),
        getJson("/public/products?size=12&sort=price_asc", {data: []}),
    ]);
    const banners = site.banners ?? [];
    const banner = (index) => banners[index]?.image;
    const premiumImages = premium.data.map(productImage);

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-r from-[#F2F2F2] to-[#D9D9D9]">
                <div className="mx-auto grid max-w-[1200px] items-center gap-6 px-4 py-10 md:grid-cols-[1fr_auto] md:py-0">
                    <div>
                        <h1 className="text-[56px] font-bold leading-none text-brand-red md:text-[96px]">CARDINAR</h1>
                        <p className="mt-6 max-w-[360px] text-[15px] font-bold uppercase leading-snug">
                            CARDINAR — самая крупная компания в Узбекистане по производству авточехлов
                        </p>
                        <p className="mt-3 text-[15px] text-muted">Barcha GM mashinalari uchun</p>
                        <Link href="/shop"
                              className="mt-10 inline-flex h-12 items-center gap-8 rounded-full bg-brand-black pl-6 pr-2 text-[14px] text-white transition hover:bg-black">
                            в магазин
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white"><ArrowRight size={16}/></span>
                        </Link>
                    </div>
                    <img src={fileUrl(banner(0))} alt="Авточехол Cardinar"
                         className="mx-auto h-[300px] object-contain drop-shadow-2xl md:h-[460px]"/>
                </div>
            </section>

            <div className="mx-auto max-w-[1200px] px-4">
                {/* Promo bloklar */}
                <section className="mt-10 grid gap-5 md:grid-cols-2 md:grid-rows-[220px_220px]">
                    <PromoTile href="/shop?categoryId=1" image={banner(1)} badge="NEW" title="Чехлы Cardinar Skyline"
                               className="h-[300px] md:row-span-2 md:h-auto"/>
                    <PromoTile href="/shop?categoryId=2" image={banner(2)} badge="SALE" title="Полики Cardinardan Eva" className="h-[220px]"/>
                    <div className="grid h-[220px] grid-cols-2 gap-5">
                        {premiumImages.slice(0, 2).map((image, i) => (
                            <PromoTile key={i} href={`/product/${premium.data[i].id}`} image={image} badge="NEW"
                                       title="Чехлы Cardinar Skyline" imageClass="object-contain p-2"/>
                        ))}
                    </div>
                </section>

                <Carousel title="Популярные товары на сайте">
                    {popular.data.map((product) => <ProductCard key={product.id} product={product}/>)}
                </Carousel>

                <Carousel title="Премиум сегмент на сайте" itemClassName="w-[280px] md:w-[calc((100%-40px)/3)]">
                    {premium.data.map((product) => <PremiumCard key={product.id} product={product}/>)}
                </Carousel>

                <PromoTile href="/shop?categoryId=3" image={banner(3)} title="Накидка на торпеду" subtitle="Из ткани"
                           className="mt-4 h-[260px] md:h-[400px]"/>

                <Carousel title="Популярные товары на сайте">
                    {fresh.data.map((product) => <ProductCard key={product.id} product={product}/>)}
                </Carousel>

                <HelpForm/>
            </div>
        </>
    );
}
