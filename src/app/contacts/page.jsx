import {getJson} from "@/lib/api";
import {Breadcrumbs} from "@/components/ui";
import {ClockIcon, MailIcon, PhoneIcon, PinIcon} from "@/components/Icons";
import ContactForm from "@/app/contacts/ContactForm";

export default async function ContactsPage() {
    const site = await getJson("/public/site", {});
    const info = site.info ?? {};

    const rows = [
        {icon: <PinIcon/>, title: "Адрес:", value: info.address},
        {icon: <PhoneIcon/>, title: "Телефон:", value: info.phoneNumber, href: `tel:${info.phoneNumber?.replace(/\D/g, "")}`},
        {icon: <ClockIcon/>, title: "Время работы:", value: info.workingHours},
        {icon: <MailIcon/>, title: "E-mail:", value: info.email, href: `mailto:${info.email}`, link: true},
    ];

    return (
        <div className="mx-auto max-w-[1200px] px-4 pb-24">
            <Breadcrumbs items={[{label: "Контакты"}]}/>
            <div className="grid gap-12 md:grid-cols-[1fr_260px]">
                <div>
                    <h1 className="text-[26px] font-medium">Контакты</h1>
                    <p className="mt-3 max-w-[360px] text-[12px] leading-relaxed text-muted">
                        Отправьте свои контакты и наш специалист свяжется с вами и проконсультирует по всем вопросам
                    </p>
                    <ContactForm/>
                </div>
                <ul className="space-y-5 md:pt-16">
                    {rows.map((row) => (
                        <li key={row.title} className="flex gap-3">
                            <span className="mt-0.5">{row.icon}</span>
                            <div>
                                <p className="text-[15px] font-medium">{row.title}</p>
                                {row.href ? (
                                    <a href={row.href} className={`text-[12px] ${row.link ? "text-brand-blue" : ""}`}>{row.value}</a>
                                ) : (
                                    <p className="text-[12px]">{row.value}</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
