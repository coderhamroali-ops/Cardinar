import Link from "next/link";
import {getJson} from "@/lib/api";
import {SOCIAL_ICONS} from "@/components/Icons";

export default async function Footer() {
    const site = await getJson("/public/site", {});

    return (
        <footer className="bg-brand-black text-white">
            <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-14">
                <img src="/logo.png" alt="Cardinar" className="h-6"/>

                <div className="mt-10 grid grid-cols-2 gap-8 text-[12px] md:grid-cols-[1fr_1fr_1fr_1.4fr_auto]">
                    <div>
                        <p className="mb-4 text-white/50">Информация</p>
                        <ul className="space-y-1.5">
                            <li><Link href="/shop" className="hover:text-brand-red">Каталог</Link></li>
                            <li><Link href="/konstruktor/cover" className="hover:text-brand-red">Конструктор</Link></li>
                            <li><Link href="/branches" className="hover:text-brand-red">Где купить?</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-4 text-white/50">Номер телефона</p>
                        <ul className="space-y-1.5">
                            {site.phoneNumbers?.map((phone) => (
                                <li key={phone.id}><a href={`tel:${phone.value.replace(/\D/g, "")}`}>{phone.value}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="mb-4 text-white/50">Почта</p>
                        <a href={`mailto:${site.info?.email}`}>{site.info?.email}</a>
                    </div>
                    <div>
                        <p className="mb-4 text-white/50">Адрес (офис)</p>
                        <p className="max-w-[200px]">{site.info?.address}</p>
                    </div>
                    <div className="flex items-start gap-3">
                        {site.socialLinks?.map((link) => {
                            const Icon = SOCIAL_ICONS[link.icon];
                            return (
                                <a key={link.id} href={link.link} target="_blank" rel="noreferrer" aria-label={link.title}
                                   className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition hover:border-white hover:bg-white hover:text-brand-black">
                                    {Icon && <Icon/>}
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 border-t border-white/15 pt-6 text-[12px] text-white/40">
                    © {new Date().getFullYear()} Cardinar. Все права защищены
                </div>
            </div>
        </footer>
    );
}
